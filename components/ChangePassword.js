import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Alert,
} from "react-native";
import { auth } from "../firebase.js";
import { updatePassword } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#43B4F4",
    padding: 20,
  },
  header: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#FFFFFF",
  },
  label: {
    fontWeight: "bold",
    color: "#FFFFFF",
    alignSelf: "flex-start",
    marginLeft: 20,
    marginBottom: 5,
  },
  input: {
    width: 300,
    height: 50,
    padding: 10,
    borderWidth: 1,
    borderColor: "#CCCCCC",
    backgroundColor: "#FFFFFF",
    borderRadius: 30,
    marginBottom: 20,
  },
  button: {
    width: 250,
    backgroundColor: "#FFFFFF",
    borderRadius: 30,
    paddingVertical: 15,
    alignItems: "center",
  },
  buttonText: {
    color: "#000000",
    fontSize: 18,
    fontWeight: "bold",
  },
});
