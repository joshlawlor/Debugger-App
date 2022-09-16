import React, {useState, useEffect} from 'react'
import userServices from '../../utils/userServices'
import tokenService from '../../utils/tokenService';
import { useNavigate } from 'react-router-dom';

const LandingPage = ({backendURL}) => {
    const [userPosts, setUserPosts] = useState([]);

    const userToken = tokenService.getToken()

    const navigate = useNavigate()

    const user = tokenService.getUserFromToken()

    async function getUsersPosts() {
        await fetch(`${backendURL}/users/posts/`, {
            method: "GET",
            headers: new Headers({ 'content-type': 'application/json', 'Authorization': `${userToken}` })
        })
            .then(response => {
                console.log(response)
                if (response.ok)
                    return response.json();
            })
            .then(response => {
                setUserPosts([...response])
                
            })
    }

    useEffect(() => {
        getUsersPosts();
        
    },
        [])


    


    return (
        <div>
            <h1>Welcome {user.username}!</h1>

            <h2>Your Posts:</h2>
            <ul>
                {userPosts.map(post => {
                    return (
                        <ul>
                            <li>{post.title}</li>
                            <br/>
                            <a href={`/posts/${post._id}`}><button>View</button></a>
                            <br/>
                        </ul>
                    )
                })}
            </ul>
        </div>
    )
}


export default LandingPage