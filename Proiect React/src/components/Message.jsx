import React, { useContext, useEffect, useRef } from 'react'
import { AuthContext } from '../context/AuthContext'
import { ChatContext } from '../context/ChatContext';

const Message = ({message}) => {

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const ref = useRef()

  // go to the bottom message
  useEffect(() => {
    ref.current?.scrollIntoView({behavior:"smooth"})
  }, [message]);

  return (
    <div ref = {ref} className = {message.senderId === currentUser.uid ? 'message owner' : 'message'}>
      <div className = "messageInfo">
        <img src = {message.senderId === currentUser.uid ? currentUser.photoURL : data.user.photoURL} alt = "" />
      </div>
    
      <div className = "messageContent">
        {message.img && <img src = {message.img} alt = "" />}
        {message.text && <p> {message.text} </p>}
      </div>
    </div>
  )
}

export default Message