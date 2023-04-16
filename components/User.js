import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const User = ({user}) => {

    const history = useNavigate()

    let [followers, setFollowers] = useState([])

    useEffect(() => {
        getFollowers()
    }, [])

    let getFollowers = async () => {
        let response_following = await fetch(`/api/following/${user.id}`)
        let data = await response_following.json()
        setFollowers(Object.keys(data).length)
    }

    let goToProfile = () => {
        history(`/user/${user.id}`)
    }

    return (
        <div onClick={goToProfile} className='hoverable'>
            <div>
                <h3>{user.username}</h3>
            </div>
            <div>
                <p>{followers} Followers</p>
            </div>
            <hr/>
        </div>
    )
}

export default User