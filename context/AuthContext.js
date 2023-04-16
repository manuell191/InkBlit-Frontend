import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({children}) => {

    let [authToken, setAuthToken] = useState(() => localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')).token : null)
    let [user, setUser] = useState(() => localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).user : null)
    let [id, setId] = useState(() => localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).id : null)

    const history = useNavigate()

    let loginUser = async (e) => {
        e.preventDefault()
        let response = await fetch(('/api/login'), {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body:JSON.stringify({'username': e.target.username.value, 'password': e.target.password.value})
        })
        let data = await response.json()

        if (response.status === 200) {
            localStorage.setItem('authTokens', JSON.stringify({"token": data.token}))
            localStorage.setItem('user', JSON.stringify({"user": data.user, "id": data.id}))
            setAuthToken(data.token)
            setUser(data.user)
            history('/')
        } else if (response.status === 401) {
            alert('Incorrect username or password.')
        } else {
            alert('Something went wrong.')
        }
    }

    let signupUser = async (e) => {
        e.preventDefault()
        if (e.target.password.value == e.target.password2.value) {
            let response = await fetch(('/api/user'), {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body:JSON.stringify({'username': e.target.username.value, 'password': e.target.password.value, 'email': e.target.email.value, 'bio': ''})
            })
            let data = await response.json()

            if (response.status === 200) {
                localStorage.setItem('authTokens', JSON.stringify({"token": data.token}))
                localStorage.setItem('user', JSON.stringify({"user": data.user, "id": data.id}))
                setAuthToken(data.token)
                setUser(data.user)
                history('/')
            } else if (response.status === 401) {
                alert('Incorrect username or password.')
            } else {
                alert('Something went wrong.')
            }
        } else {
            alert('Passwords do not match')
        }
    }

    let logoutUser = () => {
        localStorage.removeItem('authTokens')
        localStorage.removeItem('user')
        setAuthToken(null)
        setUser(null)
        setId(null)
        history('/login')
    }

    let contextData = {
        loginUser: loginUser,
        logoutUser: logoutUser,
        signupUser: signupUser,
        id: id
    }

    return (
        <AuthContext.Provider value={contextData} >
            {children}
        </AuthContext.Provider>
    )
}