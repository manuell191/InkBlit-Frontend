import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const RoomPost = () => {
    const params = useParams()
    const history = useNavigate()

    let roomId = params.id
    let token = JSON.parse(localStorage.getItem('authTokens')).token

    let createPost = async (e) => {
        e.preventDefault()
        let response = await fetch((`/api/post/room/${roomId}`), {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Token ${token}`
            },
            body: JSON.stringify({content: e.target.content.value})
        })
        let data = await response.json()
        history(`/room/${roomId}`)
    }

    return (
        <div className='full-page' id='main'>
            <div className='flex-container'>
                <h1>
                    New Room Post
                </h1>
            </div>
            <form onSubmit={createPost}>
                <input type='text' name='content' placeholder='Type your post...' autoComplete='off' maxLength='252' />
                <input type='submit' value='Post' className='button' />
            </form>
        </div>
    )
}

export default RoomPost