import React from 'react'
import Login from './Login'
import logo from "../logos/icon-above-font.png"

function Home() {
    return (
        <div className="container home__page">
            <img className="logo-img" src={logo} alt="Groupomania Logo"></img>
            <Login></Login>
        </div>
    )
}

export default Home
