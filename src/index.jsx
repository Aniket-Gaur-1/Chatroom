import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCBd3AAgz9_A6j1W2saV4RFwerONlBlu5A",
  authDomain: "chatroom-a14a6.firebaseapp.com",
  databaseURL: "https://chatroom-a14a6-default-rtdb.firebaseio.com",
  projectId: "chatroom-a14a6",
  storageBucket: "chatroom-a14a6.appspot.com",
  messagingSenderId: "196549874984",
  appId: "1:196549874984:web:733da1e4b5ad1cc785ac1d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

reportWebVitals();
