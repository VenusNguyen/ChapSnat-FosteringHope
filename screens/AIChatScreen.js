import React, { useState, useCallback, useEffect } from "react";
import { GiftedChat } from "react-native-gifted-chat";

export default function ChatScreen() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: "How can we help you with?\n A. Application\n B. Talk to some one in the office",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "Foster Youth Non-Profit",
          avatar: "https://firebasestorage.googleapis.com/v0/b/foster-youth.appspot.com/o/creative-arts.png?alt=media&token=1a19e117-392e-4b7a-8d00-ebd3de2842d5",
        },
      },
      {
        _id: 0,
        text: "Hello there!",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "Foster Youth Non-Profit",
          avatar: "https://firebasestorage.googleapis.com/v0/b/foster-youth.appspot.com/o/creative-arts.png?alt=media&token=1a19e117-392e-4b7a-8d00-ebd3de2842d5",
        },
      },
    ]);
  }, []);

  const botSend = useCallback(() => {
    let newmessage = {
      _id: messages.length + 1,
      text: "Great, thank you for reaching out to us! Here are some resources ...",
      createdAt: new Date(),
      user: {
        _id: 2,
        name: "Foster Youth Non-Profit",
        avatar: "https://firebasestorage.googleapis.com/v0/b/foster-youth.appspot.com/o/creative-arts.png?alt=media&token=1a19e117-392e-4b7a-8d00-ebd3de2842d5",
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
        _id: 1,
        name: "V",
        avatar: "https://firebasestorage.googleapis.com/v0/b/foster-youth.appspot.com/o/zzORbT68PlhkWXMUSrJ3jYS3zi32%2F696CF7F9-4FFC-4171-8FB3-0DC56575A993.jpg?alt=media&token=68c8174f-1a75-40bf-bbf1-b8724ba6c04f",
      }}
      showUserAvatar={true}
      renderUsernameOnMessage={true}
    />
  );
}