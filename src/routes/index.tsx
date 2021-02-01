import React from "react"
import { Switch} from "react-router-dom"
import Route from "./Routes"
import Dashboard from "../pages/Dashboard"
import Items from "../pages/Items"
import Room from "../pages/Room"
import CreateRoom from "../pages/CreateRoom"
import CreateItem from "../pages/CreateItem"
import Profile from "../pages/Profile"
import EmailConfirmation from "../pages/EmailConfirmation"
import {SignIn} from "../pages/SignIn"
import {SignUp} from "../pages/SignUp"

const Routes:React.FC = ()=>(
    <Switch>
        <Route path="/" exact component={SignIn} ></Route>
        <Route path="/signup"  component={SignUp} ></Route>
        <Route path="/confirmation/:token"  component={EmailConfirmation} ></Route>
        <Route path="/dashboard" isPrivate component={Dashboard} ></Route>
        <Route path="/rooms/:room_id/:day/:month" isPrivate component={Items} ></Route>
        <Route path="/rooms/:room_id" isPrivate component={Room} ></Route>
        <Route path="/create_new_room" isPrivate component={CreateRoom} ></Route>
        <Route path="/:room_id/:day/:month/create_new_item" isPrivate component={CreateItem} ></Route>
        <Route path="/profile" isPrivate component={Profile} ></Route>
    </Switch>
)

export default Routes