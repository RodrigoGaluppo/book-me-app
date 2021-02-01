import React,{createContext, useCallback,useState,useContext} from "react"
import api from "../services/apiClient"

interface Iuser{
    id:string
    username:string
    email:string
    goal:IGoal
    rooms:IRoom[]
}

interface IRoom{
    room_id:number
    name:string
    user_id:number
    numberOfitens?:number
    items?:IItem[]
}
interface IItem{
    room_id:number
    name:string
    item_id:number
    value:number
    date:string
}
interface IGoal{
    monthlyGoal:number
    RoomMonthlyGoal:number
    dailyGoal:number
}

interface IAuthContext{
    token:string
    user:Iuser
    signIn(credentials:Idata): Promise<void>
    signOut():void
    updateUser(Newuser:Iuser):void
}

interface Idata{
    email:string
    password:string
}

interface IAuthState{
    user:Iuser
    token:string
}


const AuthContext = createContext<IAuthContext>({} as IAuthContext)

export const AuthProvider:React.FC = ({children})=>{

    const [data,setData] = useState<IAuthState>(()=>{
        const token = localStorage.getItem("@Bookme:token")
        const user = localStorage.getItem("@Bookme:user")
        
        if (token && user){
            return { token , user:JSON.parse(user)}
        }else{
            return {} as IAuthState
        }
    })

    const CalculateDailyGoal = useCallback( (UserGoal:number):number=>{
        const date = new Date()
        const days = new Date(date.getFullYear(),date.getMonth() + 1 ,0).getDate()
        if(data.user.rooms.length > 0){
            return Math.round((UserGoal / data.user.rooms.length) / days)
        }else{
            return Math.round((UserGoal / 1) / days)
        }
    },[])

    const signIn = useCallback( async ({email,password}:Idata)=>{
        const res = await api.post("login",{
            email,password
        })
        const {token,user} = res.data
        const userWithGoal:Iuser = {
            id:user.id,
            username:user.username,
            email:user.email,
            goal:{
                monthlyGoal:user.goal,
                RoomMonthlyGoal: user.rooms.length > 0 ? (user.goal / user.rooms.length) : user.goal,
                dailyGoal:CalculateDailyGoal(user.goal)
            },
            rooms:user.rooms
        }
        
        localStorage.setItem("@Bookme:token",token)
        localStorage.setItem("@Bookme:user",JSON.stringify(userWithGoal))

        api.defaults.headers.authorization = `Bearer ${token}`
                                                                                                                                                     
        setData({token,user:userWithGoal})
    },[])

    const signOut = useCallback(()=>{
        localStorage.removeItem("@Bookme:token")
        localStorage.removeItem("@Bookme:user")

        setData({} as IAuthState)
    },[])

    const updateUser = useCallback((Newuser:Iuser)=>{
        localStorage.setItem("@Bookme:token",data.token)
        localStorage.setItem("@Bookme:user",JSON.stringify(data.user))

        console.log(Newuser);
        


        setData({user:Newuser,token:data.token})
    },[setData,localStorage])


    return(
        <AuthContext.Provider value={{user:data.user,token:data.token,signIn,signOut,updateUser}} >
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = ():IAuthContext=>{
    const context = useContext(AuthContext)
    if(!context){
        throw new Error("useAuth must be used within an auth provider")
    }else{
        return context
    }

}
