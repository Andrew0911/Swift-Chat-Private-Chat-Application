import React from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase';

const Login = () => {

    const [error, setError] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault()
        const email = event.target[0].value;
        const password = event.target[1].value;

        // try to sign in
        try{
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/");
        }catch(error){
            setError(true);
        }
    };

    return (
        <div className='formContainer'>
            <div className='formWrapper'>
                <span className='logo'>Swift Chat</span>
                <span className='title'>Login</span>
                <form onSubmit={handleSubmit}>
                    <input type='email' placeholder='E-mail'></input>
                    <input type='password' placeholder='Password'></input>
                    {
                        error && 
                        <p style={{ color: 'red', textAlign: 'center' }}>Email or password is incorrect</p>
                    }
                    <button>Login</button>

                </form>
                <p>Don't have an account? <Link to="/register">Register</Link></p>
            </div>
        </div>
    )
}

export default Login