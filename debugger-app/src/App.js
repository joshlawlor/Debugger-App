import './App.css';
import React, { useEffect, useState } from 'react'
import {Link, Route, Routes } from 'react-router-dom'
import LandingPage from './pages/LandingPage/LandingPage';
import PostsPage from './pages/PostsPage/PostsPage';
import FriendsPage from './pages/FriendsPage/FriendsPage';
import LoginForm from './components/LoginForm/LoginForm';
import SignUpForm from './components/SignUpForm/SignUpForm'
import PostDetailsPage from './pages/PostDetailsPage/PostDetailsPage';
import userServices from './utils/userServices';
import tokenService from './utils/tokenService';
import { useNavigate} from 'react-router-dom';

const backendURL = "http://localhost:9000"
const loggedIn = "true"
const loggedOut = false

function App() {
  const [user, setUser] = useState(userServices.getUser())
  const navigate = useNavigate()

  // const [loggedIn, setLoggedIn] = useState(0)
  // console.log(loggedIn)
  

  // IF LOGGED IN
  if(tokenService.loginCheck() == true){
    console.log(`${{user}}Logged In`, loggedIn)
    
    function handleLogout() {
      userServices.logout()
      navigate('/posts')
  }

    return (
      <div className="App">
       
       <ul className='navbar'>
        
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/posts'>Posts</Link></li>
          <li><Link to='/friends'>Friends</Link></li>
          <li><button onClick={handleLogout}>Logout</button></li>
       </ul>
  
       <Routes>
        <Route path='/' element={<LandingPage backendURL={backendURL}/>}/>
        <Route path='/posts' element={<PostsPage backendURL={backendURL} loggedIn={loggedIn}/>}/>
        <Route path='/posts/:postId' element={<PostDetailsPage backendURL={backendURL} loggedIn={loggedIn}/>}/>
        <Route path='/friends' element={<FriendsPage/>}/>
        <Route path='/login' element={<LoginForm backendURL = {backendURL}/>}/>
        <Route path='/signup' element={<SignUpForm backendURL = {backendURL}/>}/>
       </Routes>
      </div>
    );
  }
  else //NOT LOGGED IN
  {
    const loggedIn = false
    console.log('User is not Logged In', loggedIn)
    return (
      <div className="App">
       
       <ul className='navbar'>
        
          <li><Link to='/posts'>Posts</Link></li>
          <li><Link to='/login'>Login</Link></li>
          <li><Link to='/signup'>Sign Up</Link></li>
       </ul>
  
       <Routes>
        <Route path='/' element={<LandingPage backendURL={backendURL}/>}/>
        <Route path='/posts' element={<PostsPage backendURL={backendURL} loggedIn={loggedIn}/>}/>
        <Route path='/posts/:postId' element={<PostDetailsPage backendURL={backendURL} loggedIn={loggedIn}/>}/>
        <Route path='/friends' element={<FriendsPage/>}/>
        <Route path='/login' element={<LoginForm backendURL = {backendURL}/>}/>
        <Route path='/signup' element={<SignUpForm backendURL = {backendURL}/>}/>
       </Routes>
      </div>
    )
  }

  
}

export default App;
