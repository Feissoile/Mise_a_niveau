import React, { useState, useEffect } from "react";
import {Alert,
    StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  TextInput,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  
} from "react"

const BACKEND_ADDRESS = "http://localhost:3000";

function Connection() {
  const [signInUsermail, setSignInUsermail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");

  const handleConnection = () => {
    console.log({ email: signInUsermail, password: "********" }); // Cacher le mot de passe dans les logs
    fetch(`${BACKEND_ADDRESS}/users/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: signInUsermail, password: signInPassword }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.result) {
          //dispatch(login({ email: signInUsermail, token: data.token }));
          setSignInUsermail("");
          setSignInPassword("");
        } else {
          Alert.alert("Email et/ou mot de passe incorrect(s).");
        }
      });
  };

  return <div></div>;
}

export default Connection;
