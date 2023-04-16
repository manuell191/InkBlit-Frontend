import React from 'react'
import { useNavigate } from 'react-router-dom'

const JoinRoom = () => {
    const history = useNavigate()

    let token = JSON.parse(localStorage.getItem('authTokens')).token

    let createPost = async (e) => {
        e.preventDefault()
        let response = await fetch((`/api/room/code/${e.target.code.value}`), {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Token ${token}`
            },
            body: JSON.stringify({'code': e.target.code.value})
        })
        let data = await response.json()
        history('/room')
    }

    return (
        <div className='full-page' id='main'>
            <div className='flex-container'>
                <h1>
                    Join Room
                </h1>
            </div>
            
            <form onSubmit={createPost}>
                <input type='number' name='code' min='111111' max='999999' step='1' placeholder='Room code...' autoComplete='off' maxLength='6' />
                <input type='submit' value='Post' className='button' />
            </form>
        </div>
    )
}

export default JoinRoom