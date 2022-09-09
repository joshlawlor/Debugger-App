import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
    const [userCred, SetUserCred] = useState({email: "", password: ""});
    let navigate = useNavigate()

    function handleChange(event){
        SetUserCred({...userCred, [event.target.id]: event.target.value });
    };


    function handleSubmit(e){
        e.preventDefault();
        navigate("/posts", {replace: true})
        
      }

    return (
        <form class='form' onSubmit={handleSubmit}>
          <br/>
          <h3> User Login </h3>
            <div className='loginForm'>

            <label className='label' htmlFor="Email">Email</label>
            <input className="inputBox" onChange={handleChange} type="email" name="email" id="email" />
            </div>
            <div className='loginForm'>
            <label clasName='label' htmlFor="password">Password</label>
            <input className="inputBox" onChange={handleChange} type="password" name="password" id="password" />
            </div>
            <br/>
            <button className='loginButton' type="submit">Log In</button>
        </form>
      )
}

export default LoginForm