import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import tokenService from "../../utils/tokenService";

const LoginForm = ({backendURL}) => {
    const [userCred, SetUserCred] = useState({email: "", password: ""});
    const [errorCode, setErrorCode] = useState(0);
    let navigate = useNavigate()

    function handleChange(event){
        SetUserCred({...userCred, [event.target.id]: event.target.value });
    };

     function testUserCred(){
        console.log(userCred)
        fetch(`${backendURL}/users/login`, {method: "POST", body: JSON.stringify(userCred), 
        headers: new Headers({'content-type': 'application/json'})})
        .then((response) => {
            console.log(response)
            if(!response.ok){
                console.log(response.body);
            }else {
                setErrorCode(0);
                return response.json()
            }
        }).then(({token}) => {
            tokenService.setToken(token);
        }).catch(err =>{
            console.log(err)
        })
    }


    function handleSubmit(e){
        e.preventDefault();
        testUserCred();
        navigate("/", {replace: true})
        
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