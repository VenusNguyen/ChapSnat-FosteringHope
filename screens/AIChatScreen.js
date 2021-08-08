import React, { useState, useCallback, useEffect } from "react";
import { GiftedChat } from "react-native-gifted-chat";

export default function AIChatScreen({}) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: "Hello there. How are you doing?",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "Kids In The Spotlight",
          avatar: "https://placeimg.com/140/140/any",
        },
      },
      {
        _id: 2,
        text: "Hello Kids In The Spotlight...",
        createdAt: new Date(),
        user: {
          _id: 1,
          name: "React Native",
          avatar: "https://placeimg.com/140/140/any",
        },
      },
    ]);
  }, []);

  const botSend = useCallback(() => {
    let newmessage = {
      _id: messages.length + 1,
      text: "Our resources are provided in the Maps screen.\nWhere you can find food banks, shelter, and arts program! ",
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
    setTimeout(() => botSend(), Math.round(Math.random() * 1000));
  }, []);

  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => onSend(messages)}
      user={{
        _id: 1,
        name: "Kids In The Spotlight",
        avatar: "https://placeimg.com/140/140/any",
      }}
      showUserAvatar={true}
      renderUsernameOnMessage={true}
    />
  );
}
