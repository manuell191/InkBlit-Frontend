import React from 'react'
import { useNavigate } from 'react-router-dom'

const Room = ({room}) => {
    
    const history = useNavigate()

    let goToRoom = () => {
        history(`/room/${room.id}`)
    }

    return (
        <div>
            <div>
                <h3 className='hoverable' onClick={goToRoom}>{room.title}</h3>
            </div>
            <hr/>
        </div>
    )
}

export default Room