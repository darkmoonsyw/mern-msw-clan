import React from 'react';
import Header from '../components/Header/Header'
import HeaderLinks from '../components/Header/HeaderLinks'
import { Link, useHistory } from "react-router-dom";

const NavBar = ()=>{
    const history = useHistory()
    return(
        //Header use warning/dark/danger
        <Header
        brand="黃色復仇圈"
        color="dark"
        rightLinks={<HeaderLinks />}
        onClick={()=>{
            history.push('/')
          }}
        >
        </Header>
    )
}

export default NavBar