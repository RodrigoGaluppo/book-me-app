import React,{useEffect,useState} from "react"
import {FiCheckCircle,FiDelete} from "react-icons/fi"
import {Info} from "./styles"
import api from "../../services/apiClient"
import {useRouteMatch} from "react-router-dom"
import Loading from "../../components/Loading"
import {useToast} from "../../hooks/ToastContext"

interface IParams{
    token:string | undefined
}

interface IResponse{
    username:string
}

const Confirmation:React.FC = ()=>{
    const [isLoading,setIsLoading] = useState<boolean>(false)
    const [isConfirmed,setIsConfirmed] = useState<boolean>(false)
    const [username,setUsername] = useState<string>("")
    const { params } = useRouteMatch<IParams>()
    const {addToast} = useToast()
    
    useEffect(()=>{
        setIsLoading(true)
        api.post<IResponse>("/confirmation",{token:params.token})
        .then((res)=>{
            setIsLoading(false)
            setIsConfirmed(true)
            setUsername(res.data.username)
            addToast({type:"success",title:"Your e-mail has just been confirmed"})
            
        })
        .catch(e=>{
            const res = JSON.parse(e.request.response)
            if(res){          
                setIsLoading(false)
                addToast({type:"error",title:"error",description:res.message}) 
            } else{
                setIsLoading(false)
                addToast({type:"error",title:"error",description:"internal server error"})
            }    
        })
            
        
    },[])

    return(
        <>
            {isLoading && <Loading></Loading>}
            {isConfirmed && <Info>
                <h1>Thank you <strong>{username}</strong></h1>
                <p>your e-mail has been successfully confirmed <FiCheckCircle style={{color:"#04D361"}} size={70} ></FiCheckCircle></p>
                <p>you may login now</p>
            </Info>}
            {isLoading && !(isConfirmed) && <Info></Info>}
            {!isLoading && !(isConfirmed) && <Info>
                <h1 style={{color:"#c53030"}} >Sorry</h1>
                <p>an error has just ocurried <FiDelete style={{color:"#c53030"}} size={70} ></FiDelete></p>
            </Info>}
        </>
        
    )
}

export default Confirmation