import React, { useState, useCallback, useEffect } from "react";
import { Image, Platform, View, Button } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { GiftedChat, Actions } from "react-native-gifted-chat";
import db from "../firebase";
import firebase from "@firebase/app";
import * as ImagePicker from "expo-image-picker";

export default function ChatScreen({ route }) {
  const [imageURI, setImageURI] = useState(null);
  const [messages, setMessages] = useState([]);

  const { chatName, currUser } = route.params;

  useEffect(() => {
    let unsubscribeFromNewSnapshots = db
      .collection("Chats")
      .doc(chatName)
      .onSnapshot((snapshot) => {
        console.log("New Snapshot!");
        let newMessages = snapshot.data().messages.map((singleMessage) => {
          singleMessage.createdAt = singleMessage.createdAt.seconds * 1000;
          return singleMessage;
        });
        setMessages(newMessages);
      });

    return function cleanupBeforeUnmounting() {
      unsubscribeFromNewSnapshots();
    };
  }, []);

  const onSend = useCallback(
    async (messages = []) => {
      if (messages.length < 1) return;

      if (imageURI !== null) {
        let downloadURL = await uploadImage();
        if (downloadURL) {
          messages[0].image = downloadURL;
        }
      }

      db.collection("Chats")
        .doc(chatName)
        .update({
          // arrayUnion appends the message to the existing array
          messages: firebase.firestore.FieldValue.arrayUnion(messages[0]),
          lastUpdated: Date.now(),
        });
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, messages)
      );
    },
    [imageURI]
  );

  const uploadImage = async () => {
    const filepath = imageURI;
    setImageURI(null);
    const filename = filepath.substring(filepath.lastIndexOf("/") + 1);
    const response = await fetch(filepath);
    const blob = await response.blob();

    const uploadTask = firebase
      .storage()
      .ref(currUser.uid + "/" + filename)
      .put(blob);
    // set progress state
    uploadTask.on("state_changed", (snapshot) => {
      // setTransferred(
      //   Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 10000
      // );
    });

    let downloadURL = null;

    try {
      await uploadTask;
      downloadURL = await uploadTask.snapshot.ref.getDownloadURL();
    } catch (e) {
      console.error(e);
    }

    return downloadURL;
  };

  // Replace if using SNAP MINI...
  const renderAccessory = null;
  // const renderAccessory = (props) => (
  //   <View>
  //     <Button
  //       onPress={() => {
  //         alert("Launching Snap Mini...");
  //       }}
  //       title={"Launch Snap Mini"}
  //     />
  //   </View>
  // );

  const renderActions = (props) => {
    return (
      <Actions
        {...props}
        options={{
          ["Camera"]: handleCamera,
          ["Image Library"]: handleLibrary,
          Cancel: () => {
            console.log("Cancel");
          },
        }}
        icon={() =>
          imageURI ? (
            <Image
              style={{ width: 32, height: 32 }}
              source={{ uri: imageURI }}
            />
          ) : (
            <Ionicons name={"camera"} size={28} />
          )
        }
      />
    );
  };

  const handleCamera = async () => {
    if (Platform.OS !== "web") {
      let permissions = await ImagePicker.getCameraPermissionsAsync();
      if (!permissions.granted) {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera permissions to make this work!");
        }
      }
    }

    let result = await ImagePicker.launchCameraAsync();
    if (!result.cancelled) {
      setImageURI(result.uri);
    }
  };

  const handleLibrary = async () => {
    if (Platform.OS !== "web") {
      let permissions = await ImagePicker.getMediaLibraryPermissionsAsync();
      if (!permissions.granted) {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera permissions to make this work!");
        }
      }
    }

    let result = await ImagePicker.launchImageLibraryAsync();
    if (!result.cancelled) {
      setImageURI(result.uri);
    }
  };

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
      renderActions={renderActions}
      renderAccessory={renderAccessory}
    />
  );
}
