import React, { useContext } from 'react'
import Messages from './Messages'
import Input from './Input'
import { ChatContext } from '../context/ChatContext'
import { AuthContext } from '../context/AuthContext'

const Chat = () => {

  // our Chat component has 2 parts :
  // - Messages, where the conversation will be displayed
  // - Input, where we will write a message to send

  const {data} = useContext(ChatContext);
  const {currentUser} = useContext(AuthContext)

  return (
    <div className = 'chat'>
      <div className = "chatInfo">
        <span>{data.user?.displayName != currentUser.displayName ? data.user?.displayName : null}</span>
      </div>
      <Messages></Messages>
      <Input></Input>
    </div>
  )
}

export default Chat