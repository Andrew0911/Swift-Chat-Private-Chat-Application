import { signOut } from 'firebase/auth'
import { auth } from '../firebase'
import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

const Navbar = () => {

  // the top part of the Sidebar that shows currentUser information and Logout button
  const {currentUser} = useContext(AuthContext);

  const handleLogout = async () => {
    try{
      await signOut(auth);      
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className = 'navbar'>
      <span className = 'logo'> Swift Chat </span>
      <div className = 'user'>
        <img src = {currentUser.photoURL} alt = "" />
        <span>{currentUser.displayName} </span>
        <button onClick = {handleLogout}> Logout </button>
      </div>
    </div>
  )
}

export default Navbar