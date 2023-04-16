import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import User from '../components/User'

const Following = () => {
    const params = useParams()

    let userId = params.id
    let [users, setUsers] = useState([])

    useEffect(() => {
        getUsers()
    }, [])

    let getUsers = async () => {
        let response = await fetch(`/api/follows/${userId}/list`)
        let data = await response.json()
        if (response.status === 200) {
            setUsers(data)
        } else {
            setUsers(404)
        }
    }

    if (users == 404) {
        return (
            <div className='full-page'>
                <h3>
                    404 Page Not Found
                </h3>
            </div>
        )
    }

    return (
        <div className='page' id='main'>
            <div className='flex-container'>
                <h1 className='flex-item'>
                    Following
                </h1>
            </div>

            <hr/>

            <div>
                {users.map((user, index) => (
                    <User key={index} user={user} />
                ))}
            </div>
        </div>
  )
}

export default Following