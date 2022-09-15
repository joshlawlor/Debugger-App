import React, {useState} from 'react'
import userServices from '../../utils/userServices'


const LandingPage = () => {

    function handleLogout() {
        userServices.logout()
    }

    return (
        <div>
            <h1>Debugger App</h1>
            <h3>Created By: Josh Lawlor</h3>
            <button onClick={handleLogout}>LOGOUT</button>
        </div>
    )
}


export default LandingPage