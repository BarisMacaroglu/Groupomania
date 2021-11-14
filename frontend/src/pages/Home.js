import React from 'react'
import Login from './Login'
import logo from "../logos/icon-above-font.svg"

function Home() {
    return (
        <div className="container">
            <img className="logo-img" src={logo} alt="Groupomania Logo"></img>
            <h2>Welcome to the home page of Grupomania</h2>
            <Login></Login>
        </div>
    )
}

export default Home
