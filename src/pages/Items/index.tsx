import React, { useEffect, useState,useCallback } from "react"
import {Container,Info,Text,ListItems,AddItem} from "./styles"
import {Link,useRouteMatch} from "react-router-dom"
import {useAuth} from "../../hooks/AuthContext"
import {useToast} from "../../hooks/ToastContext"
import {FiArrowLeft,FiTrash2} from "react-icons/fi"
import api from "../../services/apiClient"
import Loading from "../../components/Loading"

interface IItem{
    room_id:number
    name:string
    item_id:number
    value:number
    date:string
}

interface IResponseDel{
    message:string
}

interface IRoom{
    room_id:number
    name:string
    user_id:number
    numberOfitens?:number
    items?:IItem[]
}

interface IParams{
    room_id:string | undefined
    day:string | undefined
    month:string | undefined
}

const Item:React.FC = ()=>{
    const {addToast} = useToast()
    const {token,signOut,user} = useAuth()
    const { params } = useRouteMatch<IParams>()
    const [room,setRoom] = useState<IRoom>({} as IRoom)
    const [items,setItems] = useState<IItem[]>([])
    const [balance,setBalance] = useState<number>(0)
    const [isToday,setIsToday] = useState(true)
    const [isLoading,setIsLoading] = useState(false)
    const [isOverTheGoal,setisOverTheGoal] = useState<boolean>(false)
    
    useEffect(()=>{
        setIsLoading(true)
        api.get<IRoom>(`rooms/${params.room_id}`,{ headers: {"Authorization" : `Bearer ${token}`}})
        .then(res=>{
            setRoom(res.data)
            setIsLoading(false)
        })
        .catch(e=>{
            setIsLoading(false)
            if(!!e.request && e.request.status === 401)
                signOut()
            addToast({type:"error",title:"something went wrong",description:"could not load the request"})
        })
    },[])

    useEffect(()=>{
        setIsLoading(true)
        api.get(`items?room_id=${params.room_id}&day=${params.day}&month=${params.month}`,{ headers: {"Authorization" : `Bearer ${token}`}})
        .then(res=>{                   
            setItems(res.data.items) 
            setIsLoading(false)
        })
        .catch(e=>{
            setIsLoading(false)
            if(!!e.request && e.request.status === 401)
                signOut()
            addToast({type:"error",title:"something went wrong",description:"could not load the request"})

        })
    },[])

    useEffect(()=>{
        let newBalance = 0

        items.forEach((item)=>{
            newBalance += item.value
        })
        setBalance(newBalance)
    },[items])

    useEffect(()=>{
        user.goal.dailyGoal < balance ? setisOverTheGoal(true) : setisOverTheGoal(false)
    },[balance])

    useEffect(()=>{
        const today = new Date()
        if( !(today.getDate() <= Number(params.day)) || !(today.getMonth() + 1 <= Number(params.month)) ){
            setIsToday(false)
        }
    },[])

    const handleRemove = useCallback(async(item:IItem)=>{
        setIsLoading(true)
        api.delete<IResponseDel>(`items/${item.item_id}`,{ headers: {"Authorization" : `Bearer ${token}`}})
        .then((res)=>{
            const newItems = items.filter(i=>{
                return i.item_id !== item.item_id
            })
            setItems(newItems)
            addToast({type:"success",title:res.data.message})
            setIsLoading(false)
        })
        .catch((e)=>{
            setIsLoading(false)
            if(!!e.request && e.request.status === 401)
                signOut()      
            addToast({type:"error",title:"something went wrong",description:e.message})
        })
    },[items,api])
    return(
        <Container>
            <Info>
                <span>
                    <Link to={`/rooms/${params.room_id}`}>
                        <FiArrowLeft size={22} ></FiArrowLeft>
                    </Link>
                </span>
                <h1><strong>{room.name}</strong></h1>
                <p>Balance <strong> {balance} €</strong></p>
                {!!isOverTheGoal ? <p className="over">{balance - user.goal.dailyGoal}€ over the goal!</p> :

                 <p className="below">{user.goal.dailyGoal - balance}€ bellow the goal!</p>}
            </Info>
            <Text>
                <h1>date {params.day}/{params.month}</h1>
            </Text>
            <ListItems>
                {items.map((item)=>(
                    <div key={item.item_id} >
                        <strong>{item.name}</strong>
                        <p> value <span>{item.value} $</span> </p>
                        <button><FiTrash2 size={25} onClick={(e)=>{handleRemove(item);
                        }}
                             /></button>
                    </div>
                ))}
            </ListItems>
            { isToday && <AddItem><Link to={`/${params.room_id}/${params.day}/${params.month}/create_new_item`} ><span>+</span></Link></AddItem>}
            {isLoading && <Loading></Loading>}
        </Container>
    )
}
export default Item
