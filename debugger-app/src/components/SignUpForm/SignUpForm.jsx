import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const SignUpForm = () => {
    const [userCred, SetUserCred] = useState({email: "", password: "", confirmPassword: ""})
    const [errorCode, setErrorCode] = useState(0);
    let navigate = useNavigate()

    function handleChange(event){
        SetUserCred({ ...userCred, [event.target.id]: event.target.value });
    };

    function handleSubmit(e){
        e.preventDefault();
        if(userCred.password === userCred.confirmPassword){
          navigate('/movies', {replace:true})
        }
        else{
          setErrorCode(1);
        }
      }


    return (
        <form class='form' onSubmit={handleSubmit}>
      <br/>
      <h3>User Sign Up</h3>
        {(errorCode===1)?<p className='error'>passwords don't match</p>:null}
        {(errorCode===2)?<p className='error'>this email is already associated with an account</p>:null}
        <label htmlFor="Email">Email</label>
        <input onChange={handleChange} type="email" name="email" id="email" />
        <label htmlFor="password">password</label>
        <input onChange={handleChange} type="password" name="password" id="password"/>
        <label htmlFor="password">confirm password</label>
        <input onChange={handleChange} type="confirmPassword" name="confirmPassword" id="confirmPassword" />
        <button type="submit">Sign Up</button>
        <br/>
    </form>
    )
}
export default SignUpForm