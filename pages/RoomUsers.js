import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import User from '../components/User'

const RoomUsers = () => {
    const params = useParams()

    let roomId = params.id

    let [users, setUsers] = useState([])
    let [title, setTitle] = useState([])

    useEffect(() => {
        getUsers()
    }, [])

    let getUsers = async () => {
        let response = await fetch(`/api/room/${roomId}/users`)
        let data = await response.json()
        if (response.status == 200) {
            setUsers(data)
        } else {
            setUsers(404)
        }
        let response_title = await fetch(`/api/room/${roomId}`)
        let data_title = await response_title.json()
        setTitle(data_title.title)
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
                {title} Room Users
            </h1>
            </div>

            <div>
                {users.map((user, index) => (
                    <User key={index} user={user} />
                ))}
            </div>
        </div>
  )
}

export default RoomUsers