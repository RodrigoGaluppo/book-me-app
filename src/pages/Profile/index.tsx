import React, {useCallback,useRef } from "react"
import {Container,Info,Text,Search,User} from "./styles"
import {Link} from "react-router-dom"
import {useAuth} from "../../hooks/AuthContext"
import {FormHandles} from "@unform/core"
import {Form} from "@unform/web"
import {useToast} from "../../hooks/ToastContext"
import {FiArrowLeft} from "react-icons/fi"
import {FaIdCard,FaUser} from "react-icons/fa"
import {FiMail,FiLogOut} from "react-icons/fi"
import Input from "../../components/Input"


const CreateItem:React.FC = ()=>{
    const {addToast} = useToast()
    const {signOut,user} = useAuth()
    const formRef = useRef<FormHandles>(null)
    const handleSignOut = useCallback(()=>{
        addToast({type:"success",title:"You've successfully logged out"})
        signOut()
    },[])

    return(
        <Container>
            <User onClick={handleSignOut} ><FiLogOut></FiLogOut></User>
            <Info>
                <span>
                    <Link to={`/dashboard`}>
                        <FiArrowLeft size={22} ></FiArrowLeft>
                    </Link>
                </span>
                <h1><strong>Your Profile</strong></h1>
            </Info>
            <Text>
                <h1>View Your Profile</h1>
            </Text>
            <Search>
                <Form ref={formRef}  onSubmit={()=>{}}>
                    <Input placeholder="Username" value={user.username} icon={FaUser} name="NewUsername" ></Input>
                    <Input placeholder="Email" value={user.email} icon={FiMail} name="NewEmail" ></Input>
                    <Input readOnly placeholder="Id" value={user.id} icon={FaIdCard} name="id" ></Input>
                </Form>
            </Search>
        </Container>
    )
}
export default CreateItem
