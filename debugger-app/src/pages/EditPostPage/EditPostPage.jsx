import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import CommentForm from "../../components/CommentForm/CommentForm";
import userServices from "../../utils/userServices";
import tokenService from "../../utils/tokenService";

const EditPostPage = ({backendURL, loggedIn}) => {
    const url = backendURL
    const navigate = useNavigate();

    const {postId} = useParams();
    const initialState = {
        title: "",
        content: "",
        comments: []
    }

    const [post, setPost] = useState(initialState)

    const user = userServices.getUser()
    const userToken = tokenService.getToken()


    useEffect(() => {
        async function getPost() {
            let response = await axios.get(`${url}/posts/${postId}/edit`, {method: "GET", headers: new Headers({'Content-Type': 'application/json'})})
            const data = response.data
            console.log(data[0])
            setPost(data[0])
        }
        getPost();
    }, [])

    function handleDelete(){
        console.log('POST ID', postId)
            async function deletePost(){
                let response = await axios.delete(`${backendURL}/posts/${postId}`, {headers: {Authorization: `${userToken}`}})
                navigate('/posts')
            }
            deletePost()
        }
    



        return (
            <div>
                
                <h1>Title: {post.title}</h1>
                <h2>By: {post.author}</h2>
                <p>Content: {post.content}</p>
                <button onClick={handleDelete} postId={post._id}>DELETE POST</button>
                {/* Need to make delete button only visible to author of post */}
                <CommentForm backendURL={url} post={post}/>
                <br/>
                {post.comments.map((comment) => {return <div><h4>{comment.title}</h4> <p>{comment.content}</p> </div>})}
    
            </div>
        )
   
}
export default EditPostPage