import React from "react"
import {useAuth} from "../hooks/AuthContext"
import {RouteProps as RProps,Route as ReactDomRoute,Redirect} from "react-router-dom"

interface RouteProps extends RProps{
    isPrivate ?: boolean
    component:React.ComponentType
}

const Route:React.FC<RouteProps> = ({isPrivate = false,component:Component,...rest})=>{
    const {user} = useAuth()

    return(
        <ReactDomRoute 
        {...rest} 
        render={({location})=>{
            return isPrivate === !!user ? (
                <Component></Component>
            ):(
                <Redirect to={{
                    pathname:isPrivate ? "/" : "/dashboard",
                    state:{from:location
                }}}></Redirect>
            )
        }}>
            
        </ReactDomRoute>
    )
}
export default Route