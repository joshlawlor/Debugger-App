import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const PostsPage = ({ backendURL }) => {

    let navigate = useNavigate()

    const initialState = {
        title: "",
        content: "",
    }

    const [formData, setFormData] = useState(initialState)

    const [posts, setPosts] = useState([]);

    function handleChange(event) {
        setFormData({ ...formData, [event.target.id]: event.target.value });
    };

    function handleSubmit(e) {
        e.preventDefault();

        fetch(`${backendURL}/posts/`, {
            method: "POST", body: JSON.stringify(formData),
            headers: new Headers({ 'content-type': 'application/json' })
        })
            .then(response => {
                setFormData(initialState)
                return response.json()
            })
            .then(response => {
                getAllPosts();
                navigate('/posts', { replace: true })
            })


    }

    async function getAllPosts() {
        await fetch(`${backendURL}/posts/`, {
            method: "GET",
            headers: new Headers({ 'content-type': 'application/json' })
        })
            .then(response => {
                if (response.ok)
                    return response.json();
            })
            .then(response => {
                setPosts([...response])
            })
    }

    useEffect(() => {
        getAllPosts();
    },
        [])

    return (
        <div>
            <form className='newPost' class='form' onSubmit={handleSubmit}>
                <h2>Make a New Post!</h2>

                <label htmlFor="title">Title</label>
                <input onChange={handleChange} type="text" name="title" id="title" />
                <label htmlFor="content">Content</label>
                <input onChange={handleChange} type="textarea" name="content" id="content" />
                {/* <label htmlFor="author">Author</label>
            <input onChange={handleChange} type="string" name="author" id="author" /> */}
                <button type="submit">Make Post</button>
                <br />
            </form>
            <h1>Debugging Posts</h1>
            <ul>
                {posts.map(post => {
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

export default PostsPage