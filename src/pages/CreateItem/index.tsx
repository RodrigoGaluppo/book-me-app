import React, {useState,useCallback,useRef } from "react"
import {Container,Info,Text,Search} from "./styles"
import {Link,useHistory,useRouteMatch} from "react-router-dom"
import {useAuth} from "../../hooks/AuthContext"
import {FormHandles} from "@unform/core"
import {Form} from "@unform/web"
import {useToast} from "../../hooks/ToastContext"
import {FiArrowLeft} from "react-icons/fi"
import {FaEuroSign} from "react-icons/fa"
import {FaPen} from "react-icons/fa"
import Input from "../../components/Input"
import Button from "../../components/Button"
import Loading from "../../components/Loading"
import api from "../../services/apiClient"

interface IFilter{
    NewItemName:string
    NewItemValue:number
}
interface IParams{
    room_id: string | undefined
    day: string | undefined
    month: string | undefined
}

const CreateItem:React.FC = ()=>{
    const {addToast} = useToast()
    const history = useHistory()
    const {token,signOut} = useAuth()
    const formRef = useRef<FormHandles>(null)
    const { params } = useRouteMatch<IParams>()
    const [isLoading,setIsLoading] = useState<boolean>(false)

    const handleSubit = useCallback(async (data:IFilter)=>{ 

        setIsLoading(true) 
        api.post(`/items`,{ 

            headers: {"Authorization" : `Bearer ${token}`},
            name:data.NewItemName,
            value:data.NewItemValue,
            room_id:params.room_id,
            day:params.day,
            month:params.month

        })

        .then(()=>{

            addToast({type:"success",title:"success",description:"item was successfully added"})

            history.push(`/rooms/${params.room_id}/${params.day}/${params.month}`)

            setIsLoading(false)
        })
        .catch(e=>{

            setIsLoading(false)

            if(!!e.request && e.request.status === 401)
                signOut()
            console.log(e.request);
            
            addToast({type:"error",title:"something went wrong",description:"could not load the request"})
            
        })
    },[api,addToast])
    return(
        <Container>
            <Info>
                <span>
                    <Link to={`/rooms/${params.room_id}/${params.day}/${params.month}`}>
                        <FiArrowLeft size={22} ></FiArrowLeft>
                    </Link>
                </span>
                <h1><strong>Create a new Item</strong></h1>
            </Info>
            <Text>
                <h1>Write Down the info</h1>
            </Text>
            <Search>
                <Form ref={formRef} onSubmit={handleSubit} >
                    <Input placeholder="name" icon={FaPen} name="NewItemName" ></Input>
                    <Input placeholder="value" icon={FaEuroSign} name="NewItemValue" ></Input>
                    <Button>Submit</Button>
                </Form>
            </Search>
            {isLoading && <Loading></Loading>}
        </Container>
    )
}
export default CreateItem
