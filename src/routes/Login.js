import { React, useState, useContext } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {AuthContext} from '../App'

function Login({setToken, setIsSignedIn, isSignedIn, handleSignin}) {
    let [loginEmail, setLoginEmail] = useState('')
    let [loginPassword, setLoginPassword] = useState('')
    let navigate = useNavigate();
    let location = useLocation();

    const token = useContext(AuthContext)

    const handleLogin = async (e,email,password) => {
        e.preventDefault()
        if(!email) {
            alert('Email is empty')
            return
        }
        if(!password) {
            alert('Password is empty')
            return
        }
        const response = await fetch("http://localhost:4000/login", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({email: email, password: password }),
        });
        const loginResponse = await response.json()
        
        
        if(loginResponse) {
            localStorage.setItem('token', loginResponse.accessToken)
            setToken(localStorage.getItem('token'))
            setIsSignedIn(true)
            
            navigate("/todos");
        } else {
            alert('Wrong email or password.')
        }
        
    }

    return (
        <div className='login-component'>
            <h1>Login</h1>
            
            <p>Don't have an account? <Link className="login-text" to="/signup">Signup</Link></p>

            
            
            <div>
                <form  className='login-container'>
                    <input
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        placeholder='Email address'
                        type='email'
                        name='email'
                        required
                    />
                    <input
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        placeholder='Password'
                        type='password'
                        name='password'
                        required
                    />
                    <button onClick={(e) => handleLogin(e,loginEmail,loginPassword)} type='submit'>Login</button>
                </form>
            </div>
        </div>
    )
}

export default Login
