import React from 'react'
import Login from './Login'
import Header from './Header'

function Home() {
    return (
        <div>
            <Header></Header>
            <h2>Welcome to the home page of Grupomania</h2>
            <p>---Logo, images et infos génériques à propos de Groupomania---</p>
            <Login></Login>
        </div>
    )
}

export default Home
