import './App.css';
import React, { useState } from 'react'
import {Link, Route, Routes } from 'react-router-dom'
import LandingPage from './pages/LandingPage/LandingPage';
import PostsPage from './pages/PostsPage/PostsPage';
import FriendsPage from './pages/FriendsPage/FriendsPage';
import LoginForm from './components/LoginForm/LoginForm';
import SignUpForm from './components/SignUpForm/SignUpForm'

const backendURL = "http://localhost:9000"

function App() {
  return (
    <div className="App">
     
     <ul className='navbar'>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/posts'>Posts</Link></li>
        <li><Link to='/friends'>Friends</Link></li>
        <li><Link to='/login'>Login</Link></li>
        <li><Link to='/signup'>Sign Up</Link></li>
     </ul>

     <Routes>
      <Route path='/' element={<LandingPage/>}/>
      <Route path='/posts' element={<PostsPage backendURL={backendURL}/>}/>
      <Route path='/friends' element={<FriendsPage/>}/>
      <Route path='/login' element={<LoginForm backendURL = {backendURL}/>}/>
      <Route path='/signup' element={<SignUpForm backendURL = {backendURL}/>}/>
     </Routes>
    </div>
  );
}

export default App;
