import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const Bio = () => {
    const params = useParams()
    const history = useNavigate()

    let authToken = JSON.parse(localStorage.getItem('authTokens')).token
    let id = JSON.parse(localStorage.getItem('user')).id
    let userId = params.id

    let [user, setUser] = useState([])

    useEffect(() => {
        getUser()
    }, [])

    let getUser = async () => {
        let response = await fetch(`/api/user/${userId}`)
        let data = await response.json()
        if (response.status === 200) {
            setUser(data)
        } else {
            setUser(404)
        }
    }

    let changeBio = async (e) => {
        e.preventDefault()
        let response = await fetch((`/api/user/${userId}`), {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Token ${authToken}`
            },
            body:JSON.stringify({'username':user.username, 'email':user.email, 'bio': e.target.bio.value})
        })
        let data = await response.json()
        history(`/user/${userId}`)
    }

    if (user == 404) {
        return (
            <div className='full-page'>
                <h3>
                    404 Page Not Found
                </h3>
            </div>
        )
    }

    if (id != userId) {
        return (
            <div className='full-page'>
                <h1>
                    You are not allowed to view this page
                </h1>
            </div>
        )
    }

    return (
        <div className='full-page'>
            <div className='flex-container'>
                <h1>Bio</h1>
            </div>

            <form onSubmit={changeBio}>
                <input type='text' name='bio' placeholder='Enter Bio' defaultValue={user.bio} autoComplete='off' maxLength='126' />
                <input type='submit' value='Submit' className='button' />
            </form>
            
        </div>
    )
}

export default Bio