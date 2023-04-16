import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const Header = () => {
    let authToken = localStorage.getItem('authTokens')
    let user = JSON.parse(localStorage.getItem('user'))
    if (user === null) {
        user = {
            id: null
        }
    }
    let {logoutUser} = useContext(AuthContext)
    return (
        <div className='header flex-item'>
            <span> | </span>
            <Link to='/' className='headItem'>Home</Link>
            <span> | </span>
            <Link to='/global' className='headItem'>Global</Link>
            <span> | </span>
            <Link to='/room' className='headItem'>Rooms</Link>
            <span> | </span>
            <Link to='/users' className='headItem'>Users</Link>
            <span> | </span>
            <Link to={`/user/${user.id}`} className='headItem'>Profile</Link>
            <span> | </span>
            {
                authToken !== null ? (
                    <div>
                        <p onClick={logoutUser} className='headItem'>Logout</p>
                    </div>
                ) : (
                    <Link to='/login' className='headItem'>Login</Link>
                )
            }
            <span> | </span>
        </div>
    );
}

export default Header;