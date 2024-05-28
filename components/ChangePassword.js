import React, { useState } from "react";
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Alert,
} from "react-native";
import { auth } from "../firebase.js";
import { updatePassword } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { styles } from '../styles/ChangePasswordStyles.js'

export default function ChangePassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigation = useNavigation();

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match.");
      return;
    }

    const user = auth.currentUser;
    if (user) {
      try {
        await updatePassword(user, newPassword);
        Alert.alert("Success", "Password has been changed.");
        navigation.navigate("Login", { clearCredentials: true });
      } catch (error) {
        console.error("Error changing password:", error);
        Alert.alert("Error", "There was a problem changing the password.");
      }
    } else {
      Alert.alert("Error", "No user is currently logged in.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Change Password</Text>
      <Text style={styles.label}>New Password</Text>
      <TextInput
        style={styles.input}
        onChangeText={setNewPassword}
        value={newPassword}
        placeholder="Enter new password"
        placeholderTextColor="#AAAAAA"
        secureTextEntry={true}
      />
      <Text style={styles.label}>Confirm New Password</Text>
      <TextInput
        style={styles.input}
        onChangeText={setConfirmPassword}
        value={confirmPassword}
        placeholder="Confirm new password"
        placeholderTextColor="#AAAAAA"
        secureTextEntry={true}
      />
      <TouchableOpacity style={styles.button} onPress={handleChangePassword}>
        <Text style={styles.buttonText}>Change Password</Text>
      </TouchableOpacity>
    </View>
  );
}
