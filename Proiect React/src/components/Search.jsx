import React, { useContext, useState } from 'react'
import { collection, query, where, getDocs, updateDoc, serverTimestamp, getDoc, setDoc, doc } from "firebase/firestore";
import { db } from '../firebase'
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';

const Search = () => {

  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [error, setError] = useState(false);
  const {currentUser} = useContext(AuthContext);
  const {dispatch} = useContext(ChatContext);


  const handleSearch = async () =>{
    const q = query(collection(db, "users"), where("displayName", "==", username), where("displayName", "!=", currentUser.displayName));

    try{
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data())
      });
    }catch(error){
      setError(true);
    }
  }

  const handleKey = e =>{
    e.code === "Enter" && handleSearch();
  }

  const handleSelect = async () =>{
    //check whether the group exists or not, if not create one
    const combinedId = currentUser.uid > user.uid ? currentUser.uid + user.uid : user.uid + currentUser.uid;
    try{

      const response = await getDoc(doc(db, "chats", combinedId));
      
      if(!response.exists()){
        // create a chat
        await setDoc(doc(db, "chats", combinedId), {messages: []});

        dispatch({type:"CHANGE_USER", payload : user});

        // create user chats for currentUser
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"] : {
            uid : user.uid,
            displayName : user.displayName,
            photoURL : user.photoURL
          },
          [combinedId + ".date"] : serverTimestamp()

        });

        // create user chat for the other user
        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"] : {
            uid : currentUser.uid,
            displayName : currentUser.displayName,
            photoURL : currentUser.photoURL
          },
          [combinedId + ".date"] : serverTimestamp(),
        });
      }
    }catch (error){
      setError(true);
    }
    setUser(null);
    setUsername("");
    //create user chats
  }

  return (
    <div className='search'>
      <div className="searchForm">
        <input type="text" placeholder='Search for Users...' onKeyDown={handleKey} onChange={e=>setUsername(e.target.value)} value={username}/>
      </div>
      {error && <span>No user found</span>}
      {user && <div className="userChat" onClick={handleSelect}>
        <img src={user.photoURL} alt="" />
        <div className="userChatInfo">
          <span>{user.displayName}</span>
        </div>
      </div>}
    </div>
  )
}

export default Search