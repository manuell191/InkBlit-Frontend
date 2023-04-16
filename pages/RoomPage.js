import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Post from '../components/Post'

const RoomPage = () => {
    const params = useParams()
    const history = useNavigate()

    let roomId = params.id
    let id = JSON.parse(localStorage.getItem('user')).id
    let token = JSON.parse(localStorage.getItem('authTokens')).token
    let [room, setRoom] = useState([])
    let [admin, setAdmin] = useState([])
    let [posts, setPosts] = useState([])
    let [user, setUser] = useState([])

    useEffect(() => {
        getRoom()
    }, [])

    let getRoom = async () => {
        let response_room = await fetch(`/api/room/${roomId}`)
        let data_room = await response_room.json()
        if (response_room.status === 200) {
            setRoom(data_room)
        } else {
            setRoom(404)
        }
        let response_admin = await fetch(`/api/user/${data_room.admin}`)
        let data_admin = await response_admin.json()
        setAdmin(data_admin)
        let response_posts = await fetch(`/api/room/${roomId}/posts`)
        let data_posts = await response_posts.json()
        setPosts(data_posts)
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

    let deleteRoom = async () => {
        let response_deleteRoom = await fetch((`/api/room/${roomId}`), {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Token ${token}`
            }
        })
        history('/room')
    }

    let leaveRoom = async () => {
        let response_rmrId = await fetch(`/api/room/member/${roomId}/user/${id}`)
        let data_rmrId = await response_rmrId.json()
        let response_leaveRoom = await fetch((`/api/room/member/${data_rmrId.id}`), {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Token ${token}`
            }
        })
        history('/room')
    }

    let askDelete = () => {
        if (window.confirm('Are you sure you want to delete this room?')) {
            deleteRoom()
        }
    }

    let askLeave = () => {
        if (window.confirm('Are you sure you want to leave this room?')) {
            leaveRoom()
        }
    }

    let goToProfile = () => {
        history(`/user/${admin.id}`)
    }

    if (room == 404) {
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
                    {room.title}
                </h1>
                <span> | </span>
                <p className='flex-item hoverable' onClick={goToProfile}>
                    {admin.username}
                </p>
                <span> | </span>
                <p className='flex-item'>
                    {room.code}
                </p>
                <span> | </span>
                <Link to={`/room/${room.id}/users`} className='flex-item hoverable'>
                    Users
                </Link>
                <span> | </span>
                <Link to={`/room/${room.id}/post`} className='flex-item button'>
                    New Room Post
                </Link>
                <span> | </span>
                {admin.id == id ? (
                    <p onClick={askDelete} className='flex-item button'>Delete room</p>
                ) : (
                    <p onClick={askLeave} className='flex-item hoverable'>Leave room</p>
                )}
            </div>

            <hr/>

            <div>
                {posts.map((post, index) => (
                    <Post key={index} post={post} user={user} />
                ))}
            </div>
        </div>
    )
}

export default RoomPage