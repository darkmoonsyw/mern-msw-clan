import React from 'react';
import Header from '../components/Header/Header'
import HeaderLinks from '../components/Header/HeaderLinks'
import { Link, useNavigate } from "react-router-dom";

const NavBar = ()=>{
    const navigate = useNavigate()
    return(
        //Header use warning/dark/danger
        <Header
        brand="黃色復仇圈"
        color="dark"
        rightLinks={<HeaderLinks />}
        onClick={()=>{
            navigate.push('/')
          }}
        >
        </Header>
    )
}

export default NavBar