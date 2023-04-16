import React, { useContext } from 'react'
import AuthContext from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const SignupPage = () => {
    const history = useNavigate()

    let {signupUser} = useContext(AuthContext)
    
    let login = () => {
        history('/login')
    }

    return (
        <div className='full-page flex-center' id='main'>
            <div>
                <div className='flex-center'>
                    <h1>
                        Sign up for Inkblit
                    </h1>
                </div>
                
                <p>Write down your password, there is no password recovery</p>

                <div className='flex-center'>
                    <form onSubmit={signupUser}>
                        <input type='text' name='username' placeholder='Enter Username' style={{display: 'block'}} />
                        <input type='password' name='password' placeholder='Enter Password' style={{display: 'block'}} />
                        <input type='password' name='password2' placeholder='Enter Password Again' style={{display: 'block'}} />
                        <input type='submit' value='Submit' className='button' style={{margin: '0px'}} />
                    </form>
                </div>

                <div className='flex-center'>
                    <p onClick={login} className='button'>Or Login</p>
                </div>
            </div>
        </div>
    )
}

export default SignupPage