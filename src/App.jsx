import {
  getDatabase,
  push,
  ref,
  set,
  onChildAdded,
  update,
} from "firebase/database";

import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const provider = new GoogleAuthProvider();
  const auth = getAuth();

  const googleLogin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        setName(result.user.displayName);
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  const [name, setName] = useState("");
  const [chats, setChats] = useState([]);
  const [msg, setMsg] = useState("");

  const db = getDatabase();
  const chatListRef = ref(db, "chats");

  const updateHeight = () => {
    const el = document.getElementById("chat");
    if (el) {
      el.scrollTop = el.scrollHeight;
    }
  };

  useEffect(() => {
    onChildAdded(chatListRef, (data) => {
      setChats((chats) => [...chats, data.val()]);
      setTimeout(() => {
        updateHeight();
      }, 100);
    });
  }, []);

  const sendChat = () => {
    const chatRef = push(chatListRef);
    set(chatRef, {
      name,
      message: msg,
    });

    setMsg(" ");
  };
  return (
    <div>
      {name ? null : (
        <div className="sign_in_container">
          <div className="headings">
            <h1>Welcome to Chatroom</h1>
            <h1>Click to Sign In from Google </h1>
            <button
              className="sign_in"
              onClick={(e) => {
                googleLogin();
              }}
            >
              Google Sign In
            </button>
          </div>
        </div>
      )}
      {name ? (
        <div>
          <h1>User Name : {name}</h1>
          <div id="chat" className="chat-container">
            {chats.map((c) => (
              <div className={`container ${c.name === name ? "me" : ""}`}>
                <p className="chat-box">
                  <strong>{c.name} </strong>
                  <span>{c.message} </span>
                </p>
              </div>
            ))}
          </div>
          <div className="btm">
            <input
              type="text"
              onInput={(e) => setMsg(e.target.value)}
              value={msg}
              placeholder="Enter your message"
            />
            <button className="send_btn" onClick={sendChat}>
              Send
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default App;
