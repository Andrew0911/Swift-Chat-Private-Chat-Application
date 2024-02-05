import React, { useContext } from 'react'
import Messages from './Messages'
import Input from './Input'
import { ChatContext } from '../context/ChatContext'
import { AuthContext } from '../context/AuthContext'

const Chat = () => {

  const {data} = useContext(ChatContext);
  const {currentUser} = useContext(AuthContext)

  return (
    <div className='chat'>
      <div className="chatInfo">
        <span>{data.user?.displayName != currentUser.displayName ? data.user?.displayName : null}</span>
      </div>
      <Messages></Messages>
      <Input></Input>
    </div>
  )
}

export default Chat