import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Post from '../components/Post'

const ProfilePage = () => {
    const params = useParams()
    const history = useNavigate()

    let userId = params.id
    let id = JSON.parse(localStorage.getItem('user')).id
    let token = JSON.parse(localStorage.getItem('authTokens')).token
    let [profile, setProfile] = useState([])
    let [posts, setPosts] = useState([])
    let [user, setUser] = useState([])
    let [followers, setFollowers] = useState([])
    let [followersList, setFollowersList] = useState([])
    let [following, setFollowing] = useState([])

    useEffect(() => {
        getUser()
    }, [])

    let getUser = async () => {
        let response_profile = await fetch(`/api/user/${userId}`)
        let data_profile = await response_profile.json()
        if (response_profile.status === 200) {
            setProfile(data_profile)
        } else {
            setProfile(404)
        }
        let response_posts = await fetch((`/api/post/user/${userId}`),{
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Token ${token}`
            }
        })
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
        let response_followers = await fetch(`/api/following/${userId}`)
        let data_followers = await response_followers.json()
        setFollowers(Object.keys(data_followers).length)
        setFollowersList(data_followers)
        let response_following = await fetch(`/api/follows/${userId}`)
        let data_following = await response_following.json()
        setFollowing(Object.keys(data_following).length)
    }

    let followUser = async () => {
        let response_newFollow = await fetch((`/api/follow`), {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({'account': id, 'following': userId})
        })
        let data_newFollow = await response_newFollow.json()
        window.location.reload()
    }

    let unfollowUser = async () => {
        let response_followToDelete = await fetch(`/api/following/${userId}/account/${id}`)
        let data_followToDelete = await response_followToDelete.json()
        let response_deleteFollow = await fetch((`/api/follow/${data_followToDelete.id}`), {
            method: 'DELETE',
            headers: {
                'Authorization': `Token ${token}`
            }
        })
        let data_deleteFollow = await response_deleteFollow.json()
        window.location.reload()
    }

    let deleteUser = async () => {
        let response = await fetch((`/api/user/${id}`), {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Token ${token}`
            }
        })
        let data = await response.json()
        history('/login')
    }
    
    let askDelete = () => {
        if (window.confirm('Are you sure you want to delete your account? (this is irreversable)')) {
            deleteUser()
        }
    }

    let goToFollowers = () => {
        history(`/user/${userId}/followers`)
    }

    let goToFollowing = () => {
        history(`/user/${userId}/following`)
    }

    let checkUsername = obj => obj.account === user.id;

    if (profile == 404) {
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
            <div className='flex-container-column'>
                <h1 className='flex-item'>
                    {profile.username}
                </h1>
                <div className='flex-item flex-container'>
                    {profile.bio} &nbsp;&nbsp;&nbsp;
                    {
                        profile.id == id ? (
                            <Link to={`/user/${user.id}/bio`} className='button'>Edit bio</Link>
                        ) : followersList.some(checkUsername) ? (
                            <button onClick={unfollowUser}>Unfollow</button>
                        ) : (
                            <button onClick={followUser}>Follow</button>
                        )
                    }
                    {profile.id == id ? (
                        <a onClick={askDelete} className='button'>Delete Account</a>
                    ) : (
                        <p></p>
                    )}
                </div>
                <p className='flex-item'>
                    <b className='followers hoverable' onClick={goToFollowers}>{followers} Followers</b>   <b className='following hoverable' onClick={goToFollowing}>{following} Following</b>
                </p>
            </div>

            <hr/>

            <div className='posts'>
                {posts.map((post, index) => (
                    <Post key={index} post={post} user={user} />
                ))}
            </div>
        </div>
    )
}

export default ProfilePage