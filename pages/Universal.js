import React, { useEffect, useState } from 'react'
import Post from '../components/Post'
import { Link } from 'react-router-dom'

const Universal = () => {
    let id = JSON.parse(localStorage.getItem('user')).id
    let token = JSON.parse(localStorage.getItem('authTokens')).token

    let [posts, setPosts] = useState([])
    let [user, setUser] = useState([])

    useEffect(() => {
        getPosts()
    }, [])

    let getPosts = async () => {
        let response = await fetch(`/api/post`)
        let data = await response.json()
        setPosts(data)
        let response_user = await fetch((`/api/user/${id}/protected`), {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Token ${token}`
            }
        })
        let data_user = await response_user.json()
        setUser(data_user)
    }

    return (
        <div className='page' id='main'>
            <div className='flex-container'>
            <h1 className='flex-item'>
                Global
            </h1>

            <span> | </span>

            <Link to='/global/post' className='flex-item button' style={{padding: '3px', marginLeft: '25px'}}>
                New Global Post
            </Link>
            </div>

            <div>
                {posts.map((post, index) => (
                    <Post key={index} post={post} user={user} />
                ))}
            </div>
        </div>
  )
}

export default Universal