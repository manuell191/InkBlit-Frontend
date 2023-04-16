import React, { useEffect, useState } from 'react'
import Room from '../components/Room'
import { Link } from 'react-router-dom'

const RoomList = () => {
    let id = JSON.parse(localStorage.getItem('user')).id

    let [rooms, setRooms] = useState([])

    useEffect(() => {
        getRooms()
    }, [])

    let getRooms = async () => {
        let response = await fetch(`/api/room/included/${id}`)
        let data = await response.json()
        setRooms(data)
    }

    return (
        <div className='page' id='main'>
            <div className='flex-container'>
            <h1 className='flex-item'>
                Rooms
            </h1>

            <span> | </span>

            <Link to='/room/new' className='flex-item button' style={{padding: '3px', marginLeft: '25px', marginRight: '25px'}}>
                New Room
            </Link>

            <span> | </span>

            <Link to='/room/join' className='flex-item button' style={{padding: '3px', marginLeft: '25px', marginRight: '25px'}}>
                Join Room
            </Link>
            </div>

            <hr/>

            <div>
                {rooms.map((room, index) => (
                    <Room key={index} room={room} />
                ))}
            </div>
        </div>
  )
}

export default RoomList