import React, { useState } from "react";
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { auth } from "../firebase.js";
import { useNavigation } from "@react-navigation/native";
import { styles } from '../styles/RegisterStyles.js'

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registeredEmail, setRegisteredEmail] = useState("");
  const navigation = useNavigation();

  const handleRegister = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      const db = getFirestore();
      const userRef = doc(db, "users", user.uid);
      const userData = {
        ownerName: name,
        email: user.email,
      };
      await setDoc(userRef, userData);

      setRegisteredEmail(email);
      setName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Register</Text>
      <Text style={styles.label}>Name</Text>
      <TextInput
        style={styles.input}
        onChangeText={setName}
        value={name}
        placeholder="Enter your name"
        placeholderTextColor="#AAAAAA"
      />
      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        onChangeText={setEmail}
        value={email}
        placeholder="Enter your email"
        placeholderTextColor="#AAAAAA"
        keyboardType="email-address"
      />
      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        value={password}
        placeholder="Enter your password"
        placeholderTextColor="#AAAAAA"
        secureTextEntry={true}
      />
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={styles.buttonText}>Go to Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Register;
