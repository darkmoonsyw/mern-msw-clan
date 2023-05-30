import React, {useEffect,createContext,useReducer,useContext} from 'react'
import {Router,Route,Routes ,useNavigate , BrowserRouter} from 'react-router-dom'
import './assets/scss/material-kit-react.scss'
import './App.css';

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

export const UserContext = createContext()

const Routing = ()=>{
  const navigate = useNavigate()
  const {state,dispatch} = useContext(UserContext)
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user"))
    if (user){
      dispatch({type:"USER",payload:user})
      navigate.push('/')
    } else {
      navigate.push('/')
    }
  },[])
  return(
    <Routes >
      <Route exact path="/" element={<Home/>} />
      <Route path="/signin" element={<Signin/>}/>
      <Route path="/clan-member" element={<ClanMember/>}/>
      <Route path="/clan-war" element={<ClanWar/>}/>
      <Route path="/clan-war-ranking" element={<ClanWarRanking/>}/>
      <Route path="/createUser" element={<CreateUser/>}/>
      <Route path="/createPlayerAccByAdmin" element={<CreatePlayerAccByAdmin/>}/>
      <Route path="/createClanWarRecord" element={<CreateClanWarRecord/>}/>
      <Route path="/editProfile" element={<EditProfile/>}/>
      <Route path="/clan-event" element={<ClanEvent/>}/>
    </Routes >
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
