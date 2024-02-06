import React from 'react'
import Navbar from './Navbar'
import Search from './Search'
import Chats from './Chats'


const Sidebar = () => {

  // Sidebar manages all the users search and conversations display
  return (
    <div className = 'sidebar'>
      <Navbar></Navbar>
      <Search></Search>
      <Chats></Chats>
    </div>
  )
}

export default Sidebar