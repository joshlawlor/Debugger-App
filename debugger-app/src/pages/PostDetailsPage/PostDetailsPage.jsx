import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import axios from "axios";

const PostDetailsPage = ({backendURL}) => {
    const navigate = useNavigate();

    const {postId} = useParams();
    console.log(postId)
    const initialState = {
        title: "",
        content: "",
        comments: []
    }

    const [post, setPost] = useState(initialState)


//     useEffect(() =>{
//         async function getPost() {
//             let response = await fetch(`${backendURL}/posts/${postId}`, {
//                 method: "GET",
//                 headers: new Headers({ 'content-type': 'application/json' })
//             }).then((response) => response.json())
//             .then((data) => console.log(data[0]))
//             let myPost = response.data
//             // console.log(data[0])
//             //     setPost(data)
// //********  Need to send correct req.params.id to the backend so the ID will align with backend route */

//             }
//             getPost();
//         }, [])

    useEffect(() => {
        async function getPost() {
            let response = await axios.get(`${backendURL}/posts/${postId}`, {method: "GET", headers: new Headers({'Content-Type': 'application/json'})})
            const data = response.data
            console.log(data[0])
            setPost(data[0])
        }
        getPost();
    }, [])



    return (
        <div>
            <h1>Details Page</h1>
            <h2>Title: {post.title}</h2>
            <h3>Content: {post.content}</h3>

            <br/>
            {post.comments.map((comment) => {return <div><h4>{comment.title}</h4> <p>{comment.content}</p> </div>})}

        </div>
    )
}


export default PostDetailsPage