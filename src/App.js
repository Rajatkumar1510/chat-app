import "./App.css";
import firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";

import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";

firebase.initializeApp({
  apiKey: "AIzaSyBRno3zsArQQMvjIlfioNmFPOlUYSH5t_k",
  authDomain: "react-chat-56724.firebaseapp.com",
  projectId: "react-chat-56724",
  storageBucket: "react-chat-56724.appspot.com",
  messagingSenderId: "814027330130",
  appId: "1:814027330130:web:e76c1ebcf5a5b2952c858b",
  measurementId: "G-N5M94LB83L",
});

const auth = firebase.auth();
const firestore = firebase.firestore();
const App = () => {
  const [user] = useAuthState(auth);
  console.log(firebase);

  return (
    <div className="App">
      <header></header>
      <section>{user ? <ChatRoom /> : <SignIn />}</section>
    </div>
  );
};
// signin component
const SignIn = () => {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };
  return (
    <div>
      <button onClick={signInWithGoogle}>Sign in with Google</button>
    </div>
  );
};

// chatroom component
const ChatRoom = () => {
  const messagesRef = firestore.collection("messages");
  const query = messagesRef.orderBy("createdAt").limit(25);
  const [messages] = useCollectionData(query, { idField: "id" });
  return (
    <div>
      {messages &&
        messages.map((message) => {
          return <ChatMessage key={message.id} message={message} />;
        })}
    </div>
  );
};

const ChatMessage = () => {};
const SignOut = () => {
  return (
    auth.currentUser && <button onClick={() => auth.signOut()}>SignOut</button>
  );
};
export default App;

// import React, { useRef, useState } from "react";
// import "./App.css";

// import firebase from "firebase/app";
// import "firebase/firestore";
// import "firebase/auth";
// import "firebase/analytics";

// import { useAuthState } from "react-firebase-hooks/auth";
// import { useCollectionData } from "react-firebase-hooks/firestore";

// firebase.initializeApp({
//   apiKey: "AIzaSyBRno3zsArQQMvjIlfioNmFPOlUYSH5t_k",
//   authDomain: "react-chat-56724.firebaseapp.com",
//   projectId: "react-chat-56724",
//   storageBucket: "react-chat-56724.appspot.com",
//   messagingSenderId: "814027330130",
//   appId: "1:814027330130:web:e76c1ebcf5a5b2952c858b",
//   measurementId: "G-N5M94LB83L",
// });
// const auth = firebase.auth();
// const firestore = firebase.firestore();
// const analytics = firebase.analytics();

// function App() {
//   const [user] = useAuthState(auth);

//   return (
//     <div className="App">
//       <header>
//         <h1>⚛️🔥💬</h1>
//         <SignOut />
//       </header>

//       <section>{user ? <ChatRoom /> : <SignIn />}</section>
//     </div>
//   );
// }

// function SignIn() {
//   const signInWithGoogle = () => {
//     const provider = new firebase.auth.GoogleAuthProvider();
//     auth.signInWithPopup(provider);
//   };

//   return (
//     <>
//       <button className="sign-in" onClick={signInWithGoogle}>
//         Sign in with Google
//       </button>
//     </>
//   );
// }

// function SignOut() {
//   return (
//     auth.currentUser && (
//       <button className="sign-out" onClick={() => auth.signOut()}>
//         Sign Out
//       </button>
//     )
//   );
// }

// function ChatRoom() {
//   const dummy = useRef();
//   const messagesRef = firestore.collection("messages");
//   const query = messagesRef.orderBy("createdAt").limit(25);

//   const [messages] = useCollectionData(query, { idField: "id" });

//   const [formValue, setFormValue] = useState("");

//   const sendMessage = async (e) => {
//     e.preventDefault();

//     const { uid, photoURL } = auth.currentUser;

//     await messagesRef.add({
//       text: formValue,
//       createdAt: firebase.firestore.FieldValue.serverTimestamp(),
//       uid,
//       photoURL,
//     });

//     setFormValue("");
//     dummy.current.scrollIntoView({ behavior: "smooth" });
//   };

//   return (
//     <>
//       <main>
//         {messages &&
//           messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}

//         <span ref={dummy}></span>
//       </main>

//       <form onSubmit={sendMessage}>
//         <input
//           value={formValue}
//           onChange={(e) => setFormValue(e.target.value)}
//           placeholder="say something nice"
//         />

//         <button type="submit" disabled={!formValue}>
//           🕊️
//         </button>
//       </form>
//     </>
//   );
// }

// function ChatMessage(props) {
//   const { text, uid, photoURL } = props.message;

//   const messageClass = uid === auth.currentUser.uid ? "sent" : "received";

//   return (
//     <>
//       <div className={`message ${messageClass}`}>
//         <img
//           src={
//             photoURL || "https://api.adorable.io/avatars/23/abott@adorable.png"
//           }
//           alt=""
//         />
//         <p>{text}</p>
//       </div>
//     </>
//   );
// }

// export default App;
