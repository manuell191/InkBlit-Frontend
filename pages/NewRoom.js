import React from 'react'
import { useNavigate } from 'react-router-dom'

const NewRoom = () => {
    const history = useNavigate()

    let token = JSON.parse(localStorage.getItem('authTokens')).token

    let createPost = async (e) => {
        e.preventDefault()
        let response = await fetch((`/api/room`), {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Token ${token}`
            },
            body: JSON.stringify({title: e.target.title.value})
        })
        let data = await response.json()
        history('/room')
    }

    return (
        <div className='full-page' id='main'>
            <div className='flex-container'>
                <h1>
                    New Room
                </h1>
            </div>
            <form onSubmit={createPost}>
                <input type='text' name='title' placeholder='Room title...' autoComplete='off' maxLength='128' />
                <input type='submit' value='Post' className='button' />
            </form>
        </div>
    )
}

export default NewRoom