import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import firebase from "@firebase/app";
import Colors from "../constants/Colors";
import React, { useState, useEffect } from "react";
import db from "../firebase";

export default function SignupScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const onPressCreate = async () => {
    await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(onSuccess, onFailure);
  };

  const onSuccess = (userCredential) => {
    console.log("SUCCESS");
    var curr_user = userCredential.user;

    // Update user info in "Users" collection
    db.collection("Users")
      .doc(curr_user.uid)
      .set(
        {
          email: email,
          displayName: name,
        },
        { merge: true }
      )
      .then(() => {
        console.log("User info successfully updated!");
      })
      .catch((error) => {
        console.error("Error updating user info: ", error);
      });
  };

  const onFailure = () => {
    alert("Sign up failure. Please try again.");
  };

  return (
    <View style={styles.container}>

      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Welcome to Snapchat</Text>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputs}
          placeholder="Name"
          keyboardType="email-address"
          onChangeText={setName}
        />
      </View>
      
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputs}
          placeholder="Email"
          keyboardType="email-address"
          onChangeText={setEmail}
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputs}
          placeholder="Password (6+ characters)"
          secureTextEntry={true}
          onChangeText={setPassword}
        />
      </View>

      <TouchableOpacity
        style={[styles.buttonContainer, styles.signupButton]}
        onPress={onPressCreate}
      >
        <Text style={styles.signupText}>Sign up</Text>
      </TouchableOpacity>
    </View>
  );
}

const resizeMode = "center";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 180,
    backgroundColor: Colors.snapyellow,
  },
  imageContainer: {
    width: 300,
    height: 45,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  snapLogo: {
    height: 150,
    marginBottom: 15,
    width: 150,
  },
  inputContainer: {
    borderBottomColor: "#F5FCFF",
    backgroundColor: "#FFFFFF",
    borderRadius: 30,
    borderBottomWidth: 1,
    borderBottomWidth: 1,
    width: 300,
    height: 45,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  inputs: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: "#FFFFFF",
    flex: 1,
  },
  buttonContainer: {
    height: 45,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    width: 300,
    borderRadius: 30,
    backgroundColor: "transparent",
  },
  signupButton: {
    backgroundColor: Colors.snapblue,
  },
  signupText: {
    color: "white",
    fontWeight: "bold",
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 28,
  },
  headerContainer: {
    width: 300,
    height: 45,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});
