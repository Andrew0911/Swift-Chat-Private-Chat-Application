import React from 'react'
import Add from '../img/photo.png'
import { updateProfile, createUserWithEmailAndPassword } from "firebase/auth";
import { auth, storage, db } from "../firebase";
import { useState } from 'react';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore"; 
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault()
        const displayName = event.target[0].value;
        const email = event.target[1].value;
        const password = event.target[2].value;
        const file = event.target[3].files[0];

        try{
            const response = await createUserWithEmailAndPassword(auth, email, password);
            
            // create image reference in the storage
            const storageRef = ref(storage, displayName);

            // uploading the image
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on(
            (error) => {
                setError(true);
            }, 
            async () => {
                await getDownloadURL(uploadTask.snapshot.ref).then( async(downloadURL) => {
                    // updating the user
                    await updateProfile(response.user, {
                    displayName,
                    photoURL:downloadURL
                });
                // adding the user in the users collection
                await setDoc(doc(db, "users", response.user.uid), {
                    uid: response.user.uid,
                    displayName,
                    email,
                    photoURL: downloadURL
                });
                // adding the user in the userChats collection
                await setDoc(doc(db, "userChats", response.user.uid), {});
                
                // go to Home page
                navigate("/");

                });
                }
            );

        }catch(error)
        {
            setError(true);
        }
    };
    
    
    return (
        <div className='formContainer'>
            <div className='formWrapper'>
                <p className='leftStar'> ⭐ </p>
                <span className='logo'>Swift Chat 🛫</span>
                <span className='title'>Register</span>
                <form onSubmit={handleSubmit}>
                    <input type='text' placeholder='Display Name'></input>
                    <input type='email' placeholder='E-mail'></input>
                    <input type='password' placeholder='Password'></input>
                    <input style={{display:'none'}} type='file' id='file'></input>
                    <label htmlFor='file'>
                        <img src ={Add} alt=''></img>
                        <span> Add a profile image</span>
                    </label>
                    <button> Register </button>
                    {error &&<span>Something went wrong</span>}

                </form>
                <p>Already have an account? <Link to='/login'>Login</Link></p>
                <p className='rightStar'> ⭐ </p>
            </div>
        </div>
    )
}

export default Register