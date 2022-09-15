import React, {useState, useEffect} from 'react'
import userServices from '../../utils/userServices'
import tokenService from '../../utils/tokenService';

const LandingPage = ({backendURL}) => {
    const [userPosts, setUserPosts] = useState([]);

    const userToken = tokenService.getToken()

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


    function handleLogout() {
        userServices.logout()
    }



    return (
        <div>
            <h1>Debugger App</h1>
            <h3>Created By: Josh Lawlor</h3>
            <button onClick={handleLogout}>LOGOUT</button>

            <h4>Your Posts:</h4>
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