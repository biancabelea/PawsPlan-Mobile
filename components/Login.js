import React, { useState, useEffect } from "react";
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";
import { auth } from "../firebase.js";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigation, useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { styles } from '../styles/LoginStyles.js'

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();
  const route = useRoute();

  useEffect(() => {
    if (route.params?.clearCredentials) {
      setEmail("");
      setPassword("");
    }
  }, [route.params]);

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      await storeUserId(user.uid);
      navigation.navigate("PetsList");
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  const storeUserId = async (userId) => {
    try {
      await AsyncStorage.setItem("userId", userId);
    } catch (error) {
      console.error("Failed to save user ID:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Login</Text>
      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        onChangeText={setEmail}
        value={email}
        placeholder="Enter your email"
        placeholderTextColor="#AAAAAA"
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
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Register")}
      >
        <Text style={styles.buttonText}>Go to Register</Text>
      </TouchableOpacity>
    </View>
  );
}
