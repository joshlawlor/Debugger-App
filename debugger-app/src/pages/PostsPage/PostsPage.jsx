import React, { useEffect, useState} from "react";

const PostsPage = ({backendURL}) => {
    const [posts, setPosts] = useState([]);

    useEffect(() =>{
        async function getAllPosts(){
            await fetch(`${backendURL}/posts/`, {method: "GET", 
            headers: new Headers({'content-type': 'application/json'})})
            .then(response => {
                if(response.ok)
                    return response.json();
            })
            .then(response => {
                setPosts([...response])
            })
        }
        getAllPosts();
    },
        [])

    return (
        <div>
            <h1>Debugging Posts</h1>
            <ul>
                {posts.map(post => {
                    return(
                    <li>{post.title}</li>
                    )
                })}
            </ul>
        </div>
    )


}

export default PostsPage