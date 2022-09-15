import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import CommentForm from "../../components/CommentForm/CommentForm";

const PostDetailsPage = ({backendURL}) => {
    const url = backendURL
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
            let response = await axios.get(`${url}/posts/${postId}`, {method: "GET", headers: new Headers({'Content-Type': 'application/json'})})
            const data = response.data
            console.log(data[0])
            setPost(data[0])
        }
        getPost();
    }, [])

    function handleDelete(){
        async function deletePost(){
            let response = await axios.delete(`${url}/posts/${postId}`, {method: "DELETE"})
            navigate('/posts')
        }
        deletePost()
    }



    return (
        <div>
            
            <h1>Title: {post.title}</h1>
            <h2>Author: {post.author}</h2>
            <p>Content: {post.content}</p>
            {/* Need to make delete button only visible to author of post */}
            <button onClick={handleDelete}>DELETE POST</button>
            <CommentForm backendURL={url} post={post}/>
            <br/>
            {post.comments.map((comment) => {return <div><h4>{comment.title}</h4> <p>{comment.content}</p> </div>})}

        </div>
    )
}


export default PostDetailsPage