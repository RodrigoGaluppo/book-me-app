import React, {useCallback,useRef,useState} from "react"
import {Container,Info,Text,Search} from "./styles"
import {Link,useHistory} from "react-router-dom"
import {useAuth} from "../../hooks/AuthContext"
import {FormHandles} from "@unform/core"
import {Form} from "@unform/web"
import {useToast} from "../../hooks/ToastContext"
import {FiArrowLeft} from "react-icons/fi"
import {FaPen} from "react-icons/fa"
import Input from "../../components/Input"
import Button from "../../components/Button"
import Loading from "../../components/Loading"
import api from "../../services/apiClient"

interface IFilter{
    NewRoomName:string
}

const CreateRoom:React.FC = ()=>{
    const {addToast} = useToast()
    const history = useHistory()
    const {token,user,signOut} = useAuth()
    const formRef = useRef<FormHandles>(null)
    const [isLoading,setIsLoading] = useState<boolean>(false)

    const handleSubit = useCallback(async (data:IFilter)=>{
        console.log(user);
        
        setIsLoading(true)  
        api.post(`/rooms`,{ 
        headers: {"Authorization" : `Bearer ${token}`},
        name:data.NewRoomName,
        user_id:user.id})
        .then(()=>{
            addToast({type:"success",title:"success",description:"room was successfully added"})
            history.push("/dashboard")
            setIsLoading(false) 
        })
        .catch(e=>{
            setIsLoading(false) 
            if(!!e.request && e.request.status === 401)
                signOut()            
            addToast({type:"error",title:"something went wrong",description:"could not load the request"})
            
        })
    },[api,addToast])
    return(
        <Container>
            <Info>
                <span>
                    <Link to={`/dashboard`}>
                        <FiArrowLeft size={22} ></FiArrowLeft>
                    </Link>
                </span>
                <h1><strong>Create a new Room</strong></h1>
            </Info>
            <Text>
                <h1>Write Down the name</h1>
            </Text>
            <Search>
                <Form ref={formRef} onSubmit={handleSubit} >
                    <Input placeholder="type the room name" icon={FaPen} name="NewRoomName" ></Input>
                    <Button>Submit</Button>
                </Form>
            </Search>
            {isLoading && <Loading></Loading>}
        </Container>
    )
}
export default CreateRoom
