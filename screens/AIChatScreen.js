import React, { useState, useCallback, useEffect } from "react";
import { GiftedChat } from "react-native-gifted-chat";
// import db from "../firebase";
// import firebase from "@firebase/app";

export default function ChatScreen({ route }) {
  const [messages, setMessages] = useState([]);
  //   const { currUser } = route.params;
  const [currUser, setCurrUser] = useState(null);

//   useEffect(() => {
//     // Download curr user info
//     // (and listen for future updates)
//     // (in case curr user decides to update their profile info)
    
//     db
//     .collection("Users")
//     .doc(firebase.auth().currentUser.uid)
//     .onSnapshot((userSnapshot) => {
//         setCurrUser({ uid: userSnapshot.id });
//     });
//   }, []);

  useEffect(() => {
    setMessages([
      {
        _id: 5,
        text: "What services can we provide?\n A: Shelter.\n B: Food Bank.\n C: Creative Art Program.",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "Foster Youth Non-Profit",
          avatar: "https://placeimg.com/140/140/any",
        },
      },
      {
        _id: 6,
        text: "Hello there!",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "Foster Youth Non-Profit",
          avatar: "https://placeimg.com/140/140/any",
        },
      },
    ]);
  }, []);

  const botSend = useCallback(() => {
    let newmessage = {
      _id: messages.length + 1,
      text: "Great, we're happy to help! Here are some resources...",
      createdAt: new Date(),
      user: {
        _id: 2,
        name: "React Native",
        avatar: "https://placeimg.com/140/140/any",
      },
    };
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, [newmessage])
    );
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
    setTimeout(() => botSend(), Math.round(Math.random() * 3000));
  }, []);

  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => onSend(messages)}
      user={{
        // current "blue bubble" user
        _id: currUser.uid,
        name: currUser.displayName,
        avatar: currUser.photoURL ? currUser.photoURL : null,
      }}
      inverted={false}
      showUserAvatar={true}
      renderUsernameOnMessage={true}
    />
  );
}
