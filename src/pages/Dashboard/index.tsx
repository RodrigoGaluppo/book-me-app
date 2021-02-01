import React, { useEffect, useState,useRef,useCallback } from "react"
import "./Dash.css"
import {Container,Info,Search,ListRooms,AddRoom,User} from "./styles"
import {Link} from "react-router-dom"
import {useAuth} from "../../hooks/AuthContext"
import {FormHandles} from "@unform/core"
import {Form} from "@unform/web"
import {useToast} from "../../hooks/ToastContext"
import {FiTrash2,FiUser} from "react-icons/fi"
import api from "../../services/apiClient"
import SearchInput from "../../components/SearchInput"
import Loading from "../../components/Loading"

interface IItem{
    room_id:number
    name:string
    item_id:number
    value:number
    date:string
}

interface IRoom{
    room_id:number
    name:string
    user_id:number
    numberOfitems?:number
    items?:IItem[]
}

interface IResponse{
    rooms:IRoom[]  
}

interface IResponseDel{
    message:string
}

interface IFilter{
    Roomname:string
}

const Dashboard:React.FC = ()=>{
    const formRef = useRef<FormHandles>(null)
    //const history = useHistory()
    const {token,user,signOut,updateUser} = useAuth()
    const {addToast} = useToast()
    const [rooms,setRooms] = useState<IRoom[]>([])
    const [balance,setBalance] = useState<number>(0)
    const [isLoading,setIsLoading] = useState<boolean>(false)
    const [isOverTheGoal,setisOverTheGoal] = useState<boolean>(false) 

    useEffect(()=>{
        setIsLoading(true)
        
        api.get<IResponse>(`rooms?user_id=${user.id}`,{ headers: {"Authorization" : `Bearer ${token}`}})
        .then(res=>{
            setIsLoading(false)
            const newRooms = res.data.rooms.map((room)=>(
                room = {
                    room_id:room.room_id,
                    name:room.name,
                    user_id:room.user_id,
                    numberOfitems:room.items?.length,
                    items:room.items
                }
            ))
            setRooms(newRooms)
        })
        .catch((e)=>{
            setIsLoading(false)
            if(!!e.request && e.request.status === 401)
                signOut() 
            addToast({type:"error",title:"something went wrong",description:"could not load the request"})
        })
        
    },[])

    useEffect(()=>{
        let newBalance:number = 0
        rooms.forEach(room=>{
            room.items?.forEach((item)=>{
                newBalance += item.value
            })
        })
        setBalance(newBalance)
        updateUser({
            id:user.id,
            username:user.username,
            email:user.email,
            goal:{
                monthlyGoal:user.goal.monthlyGoal,
                RoomMonthlyGoal: rooms.length > 0 ? (user.goal.monthlyGoal / rooms.length) : user.goal.monthlyGoal,
                dailyGoal: user.goal.dailyGoal
            },
            rooms:rooms
        })
    },[rooms])

    useEffect(()=>{
        user.goal.monthlyGoal < balance ? setisOverTheGoal(true) : setisOverTheGoal(false)
    },[balance])

    const handleSubit = useCallback(async (data:IFilter)=>{
        setIsLoading(true)

        api.get<IResponse>(`rooms?user_id=${user.id}&name=${data.Roomname}`,{ headers: {"Authorization" : `Bearer ${token}`}})
        .then(res=>{
            setRooms(res.data.rooms)
            setIsLoading(false)
        })
        .catch((e)=>{
            setIsLoading(false)
            if(!!e.request && e.request.status === 401)
                signOut() 
            addToast({type:"error",title:"something went wrong",description:"could not load the request"})
        })

    },[api,addToast])

    const handleRemove = useCallback(async(room:IRoom)=>{
        setIsLoading(true)
        api.delete<IResponseDel>(`rooms/${room.room_id}`,{ headers: {"Authorization" : `Bearer ${token}`}})
        .then((res)=>{
            const newRooms = rooms.filter(r=>{
                return r.room_id !== room.room_id
            })
            setRooms(newRooms)
            setIsLoading(false)
            addToast({type:"success",title:res.data.message})
        })
        .catch((e)=>{ 
            setIsLoading(false)  
            if(!!e.request && e.request.status === 401)
                signOut() 
            addToast({type:"error",title:"something went wrong",description:"could not load the request"})
        })
    },[rooms,api])

    return(
        <Container>
            <User><Link to={"/profile"} ><FiUser size={20} ></FiUser></Link></User>
            <Info>
                <h1>Hello <strong>{user.username}</strong> </h1>
                <p>Total Balance <strong>{balance} €</strong></p>
                {!!isOverTheGoal ? <p className="over">{balance - user.goal.monthlyGoal}€ over the goal!</p> :

                 <p className="below">{user.goal.monthlyGoal - balance}€ bellow the goal!</p>}
            </Info>
            <Search>
                <Form ref={formRef} onSubmit={handleSubit} >
                    <SearchInput  placeholder="Search any room"  name="Roomname" >

                    </SearchInput>
                </Form>
            </Search>
            <ListRooms>
                {rooms.map((room)=>{
                    return(
                        <div key={room.room_id}>
                            <Link  to={`/rooms/${room.room_id}`}>
                                <div>
                                    <strong>{room.name}</strong>
                                    <p>items {room.numberOfitems}</p>
                                </div>
                            </Link>
                            <button><FiTrash2 size={25} onClick={(e)=>{handleRemove(room)}}
                             /></button>
                        </div>
                    )
                })} 
            </ListRooms>
            {isLoading && <Loading></Loading>}
            <AddRoom><Link to={"/create_new_room"} ><span>+</span></Link></AddRoom>
        </Container>
    )
}
export default Dashboard