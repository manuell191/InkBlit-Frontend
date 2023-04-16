import React, { useEffect, useState } from 'react'
import User from '../components/User'

const UserList = () => {
    let id = JSON.parse(localStorage.getItem('user')).id

    let [users, setUsers] = useState([])

    useEffect(() => {
        getUsers()
    }, [])

    let getUsers = async () => {
        let response = await fetch(`/api/user`)
        let data = await response.json()
        setUsers(data)
    }

    return (
        <div className='page'>
            <div className='flex-container'>
            <h1 className='flex-item'>
                Users
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

export default UserList