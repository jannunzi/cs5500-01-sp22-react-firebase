import React, {useEffect, useRef, useState} from 'react';
import * as service from "../services/super-chat-service";
import {useAuth} from "../contexts/auth-context";
import {onSnapshot} from "firebase/firestore"

const SuperChat = () => {
  const [messages, setMessages] = useState([])
  const {currentUser} = useAuth()
  const messageRef = useRef()
  const handleSend = async () => {
    await service.postMessage({
      message: messageRef.current.value,
      author: currentUser.email
    })
    messageRef.current.value = ''
  }
  const getAllMessages = async () => {
    const messages = await service
      .getAllMessages()
    setMessages(messages)
  }
  useEffect(() => {
    getAllMessages()
  }, [])
  const handleDelete = async (message) => {
    await service.deleteMessage(message.id)
  }

  onSnapshot(
    service.messagesQuery, (snapshot) => {
      const ms = snapshot.docs.map(doc => {
        return ({...doc.data(), id: doc.id})
      })
      setMessages(ms)
    })

  return (
    <div className="super-chat">
      <h1>Super Chat</h1>
      <textarea
        ref={messageRef}
        className="form-control"></textarea>
      <button
        onClick={handleSend}
        className="btn btn-primary">
        Send
      </button>
      <ul className="list-group">
        {
          messages && messages.map((message) =>
            <li className="list-group-item">
              <span
                onClick={() => handleDelete(message)}
                className="float-end">&times;</span>
              {message.message}
            </li>)
        }
      </ul>
    </div>
  )
}

export default SuperChat;