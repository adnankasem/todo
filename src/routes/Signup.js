import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Signup() {
    let [signupEmail, setSignupEmail] = useState('')
    let [signupPassword, setSignupPassword] = useState('')
    let [signupFirstName, setSignupFirstName] = useState('')
    let [signupLastName, setSignupLastName] = useState('')

    let navigate = useNavigate();

    const handleSignup = async (e,signupEmail,signupPassword,signupFirstName,signupLastName) => {
        e.preventDefault();
        if(!signupEmail) {
            alert('Email is empty')
            return
        }
        if(!signupPassword) {
            alert('Password is empty')
            return
        }
        if(!signupFirstName) {
            alert('First name is empty')
            return
        }
        if(!signupLastName) {
            alert('Last name is empty')
            return
        }
        const response = await fetch("http://localhost:4000/signup", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({email: signupEmail, password: signupPassword, firstName: signupFirstName, lastName: signupLastName }),
        });

        const loginResponse = await response.json()
        if(loginResponse === true) {
            navigate("/");
        } else {
            alert('Something went wrong')
        }
    }

    return (
        <div className='signup-component'>
            <h1>Signup</h1>
            <p>Have an account? <Link className="signup-text" to="/">Login</Link></p>

            
            
                <form>
                <div className='signup-container'>
                    <div className='firstname-container'>
                        <label htmlFor='first-name'>First Name</label>
                        <input 
                            id='first-name'
                            value={signupFirstName}
                            onChange={(e) => setSignupFirstName(e.target.value)}
                            placeholder='First Name'
                            type='text'
                            name='firstName'
                            required
                        />
                    </div>
                    <div className='lastname-container'>
                        <label htmlFor='last-name'>Last Name</label>
                        <input 
                            id='last-name'
                            value={signupLastName}
                            onChange={(e) => setSignupLastName(e.target.value)}
                            placeholder='Last Name'
                            type='text'
                            name='lastName'
                            required
                        />
                    </div>
                    <div className='email-container'>
                        <label htmlFor='email'>Email address</label>
                        <input
                            id='email'
                            value={signupEmail}
                            onChange={(e) => setSignupEmail(e.target.value)}
                            placeholder='Email address'
                            type='email'
                            name='email'
                            required
                        />
                    </div>
                    <div className='password-container'>
                        <label htmlFor='password'>Password</label>
                        <input
                            id='password'
                            value={signupPassword}
                            onChange={(e) => setSignupPassword(e.target.value)}
                            placeholder='Password'
                            type='password'
                            name='password'
                            required
                        />
                    </div>
                    
                    </div>
                    <div className='signup-btn'>
                    <button onClick={(e) => handleSignup(e,signupEmail,signupPassword,signupFirstName,signupLastName)} type='submit'>Login</button>
                    </div>
                </form>
            
        </div>
    )
}

export default Signup
