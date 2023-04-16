import React, { useContext } from 'react'
import AuthContext from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const LoginPage = () => {
    const history = useNavigate()

    let {loginUser} = useContext(AuthContext)
    
    let signUp = () => {
        history('/signup')
    }

    return (
        <div className='full-page flex-center' id='main'>
            <div>
                <div className='flex-center'>
                    <h1>
                        Login for Inkblit
                    </h1>
                </div>
                
                <div className='flex-center'>
                    <form onSubmit={loginUser}>
                        <input type='text' name='username' placeholder='Enter Username' />
                        <input type='password' name='password' placeholder='Enter Password' />
                        <input type='submit' value='Submit' className='button' />
                    </form>
                </div>

                <div className='flex-center'>
                    <p onClick={signUp} className='button'>Or Sign Up</p>
                </div>
            </div>
        </div>
    )
}

export default LoginPage