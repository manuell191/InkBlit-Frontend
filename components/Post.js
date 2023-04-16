import React from 'react'
import { useNavigate } from 'react-router-dom'

const Post = ({post, user}) => {

    const history = useNavigate()

    let token = JSON.parse(localStorage.getItem('authTokens')).token

    if (user === null) {
        user = {
            username: null
        }
    }

    let deletePost = async () => {
        let response = await fetch((`/api/post/${post.id}`), {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Token ${token}`
            }
        })
        let data = await response.json()
        window.location.reload()
    }

    let askDelete = () => {
        if (window.confirm('Are you sure you want to delete this post?')) {
            deletePost()
        }
    }

    let goToProfile = () => {
        history(`/user/${post.account}`)
    }

    return (
        <div>
            <div className='flex-container'>
                <h3 className='flex-item-post hoverable' onClick={goToProfile} style={{margin: '0px'}}>{post.username}</h3>
                &nbsp;&nbsp;&nbsp;
                {post.room == 'global' ? (
                    <p style={{margin: '0px'}}>Global Post</p>
                ) : (
                    <p style={{margin: '0px'}}>Room Post</p>
                )}
            </div>
            <p>{post.content}</p>
            {
                user.id === post.account ? (
                    <div className='flex-container'>
                        <p className='button' onClick={askDelete} style={{margin: '0px'}}>delete</p>
                    </div>
                ) : (
                    <div></div>
                )
            }
            <hr/>
        </div>
    )
}

export default Post