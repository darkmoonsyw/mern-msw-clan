import React, {useEffect,createContext,useReducer,useContext} from 'react'
import { createBrowserHistory } from "history";
import {Router,Route,Switch,useHistory, BrowserRouter} from 'react-router-dom'
import './assets/scss/material-kit-react.scss'
//import "./assets/scss/material-kit-react.scss?v=1.9.0"
import "./App.css"

import NavBar from './mswView/NavBar'
import ClanEvent from './mswView/ClanEvent'
import Home from './mswView/Home'
import ClanMember from './mswView/ClanMember'
import ClanWar from './mswView/ClanWar'
import ClanWarRanking from './mswView/ClanWarRanking'

import CreateUser from './mswView/CreateUser'
import CreatePlayerAccByAdmin from './mswView/CreatePlayerAccByAdmin'
import CreateClanWarRecord from './mswView/CreateClanWarRecord'
import Signin from './mswView/Signin'

import EditProfile from './mswView/EditProfile'

import {reducer,initialState} from "./reducers/userReducer.js"

//var hist = createBrowserHistory();
export const UserContext = createContext()

const Routing = ()=>{
  const history = useHistory()
  const {state,dispatch} = useContext(UserContext)
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user"))
    if (user){
      dispatch({type:"USER",payload:user})
      history.push('/')
    } else {
      history.push('/')
    }
  },[])
  return(
    <Switch>
      <Route exact path="/">
        <Home/>
      </Route>
      <Route path="/signin">
        <Signin/>
      </Route>
      <Route path="/clan-member">
        <ClanMember/>
      </Route>
      <Route path="/clan-war">
        <ClanWar/>
      </Route>
      <Route path="/clan-war-ranking">
        <ClanWarRanking/>
      </Route>
      <Route path="/createUser">
        <CreateUser/>
      </Route>
      <Route path="/createPlayerAccByAdmin">
        <CreatePlayerAccByAdmin/>
      </Route>
      <Route path="/createClanWarRecord">
        <CreateClanWarRecord/>
      </Route>
      <Route path="/editProfile">
        <EditProfile/>
      </Route>
      <Route path="/clan-event">
        <ClanEvent/>
      </Route>
    </Switch>
  )
}

function App() {
  const [state,dispatch] = useReducer(reducer,initialState)
  return(
    <UserContext.Provider value={{state,dispatch}}>
      <BrowserRouter>
        <NavBar/>
        <Routing/>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;