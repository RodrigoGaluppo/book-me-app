import React, { useEffect, useState,useCallback } from "react"
import {Container,Info,CalendarWrapper,Text} from "./styles"
import {Link,useRouteMatch,useHistory} from "react-router-dom"
import {useAuth} from "../../hooks/AuthContext"
import DayPicker, { DayModifiers } from 'react-day-picker';
import "react-day-picker/lib/style.css"
import {useToast} from "../../hooks/ToastContext"
import {FiArrowLeft} from "react-icons/fi"
import api from "../../services/apiClient"
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
    numberOfitens?:number
    items?:IItem[]
}

interface IParams{
    room_id:string | undefined
}

const Room:React.FC = ()=>{
    const {addToast} = useToast()
    const history = useHistory()
    const {token,signOut,user} = useAuth()
    const { params } = useRouteMatch<IParams>()
    const [room,setRoom] = useState<IRoom>({} as IRoom)
    const [selectedDate, setSelectedDate] = useState(new Date())
    const [balance,setBalance] = useState<number>(0)
    const [isLoading,setIsLoading] = useState<boolean>(false)
    const [isOverTheGoal,setisOverTheGoal] = useState<boolean>(false)

    const handleDateChange = useCallback((day: Date, modifiers: DayModifiers) => {
        if (modifiers.available) {
          const DayForm = day.toString().split(" ")[2]
          const MonthForm = new Date().getMonth() + 1  
          setSelectedDate(day)  
          history.push(`/rooms/${params.room_id}/${DayForm}/${MonthForm}`)
        }
    }, [])
    
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
        let newBalance = 0

        room.items?.forEach((item)=>{
            newBalance += item.value
        })
        setBalance(newBalance)
        
    },[room])
    
    return(
        <Container>
            <Info>
                <span>
                    <Link to={"/"}>
                        <FiArrowLeft size={22} ></FiArrowLeft>
                    </Link>
                </span>
                <h1><strong>{room.name}</strong></h1>
                <p>Balance <strong> {balance} €</strong></p>
                {!!isOverTheGoal ? <p className="over">{balance - user.goal.RoomMonthlyGoal}€ over the goal!</p> :

                 <p className="below">{user.goal.RoomMonthlyGoal - balance}€ bellow the goal !</p>}
            </Info>
            <Text>
                <h1>choose a date in the calendar</h1>
            </Text>
            <CalendarWrapper className="wrapper" >
            
            <DayPicker
                weekdaysShort={['D', 'S', 'T', 'Q', 'Q', 'S', 'S']}
                fromMonth={new Date()}
                toMonth={new Date()}
                modifiers={{
                available: { daysOfWeek: [0,1, 2, 3, 4, 5,6,] },
                }}
                selectedDays={selectedDate}
                onDayClick={handleDateChange}
                months={[
                'Janeiro',
                'Fevereiro',
                'Março',
                'Abril',
                'Maio',
                'Junho',
                'Julho',
                'Agosto',
                'Setembro',
                'Outubro',
                'Novembro',
                'Dezembro',
            ]}
            />
            {isLoading && <Loading></Loading>}
            </CalendarWrapper>
        </Container>
    )
}
export default Room
