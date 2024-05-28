import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { auth, db } from "../firebase.js";
import { signOut } from "firebase/auth";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Clipboard from "expo-clipboard";
import emailIcon from "../assets/mail.png";
import phoneIcon from "../assets/phone.png";
import pawIcon from "../assets/paw.png";
import { styles } from '../styles/UserProfileStyles.js'

export default function Profile() {
  const [user, setUser] = useState(null);
  const [petsCount, setPetsCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = await AsyncStorage.getItem("userId");
        if (userId) {
          const userDoc = await getDoc(doc(db, "users", userId));
          if (userDoc.exists()) {
            setUser(userDoc.data());
            const petsCollectionRef = collection(db, "users", userId, "pets");
            const petsSnapshot = await getDocs(petsCollectionRef);
            setPetsCount(petsSnapshot.size);
          } else {
            console.log("No such document!");
          }
        } else {
          console.log("No userId found in AsyncStorage");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const copyToClipboard = async (text) => {
    await Clipboard.setStringAsync(text);
    Alert.alert("Copied to Clipboard", text);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      await AsyncStorage.removeItem("userId");
      navigation.navigate("Login", { clearCredentials: true });
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>My Profile</Text>
      {user ? (
        <View style={styles.detailsContainer}>
          <TouchableOpacity
            style={styles.infoRow}
            onPress={() => copyToClipboard(user.ownerName)}
          >
            <Image source={phoneIcon} style={styles.icon} />
            <View style={styles.textContainer}>
              <Text style={styles.detailText}>{user.ownerName}</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.infoRow}
            onPress={() => copyToClipboard(user.email)}
          >
            <Image source={emailIcon} style={styles.icon} />
            <View style={styles.textContainer}>
              <Text style={styles.detailText}>{user.email}</Text>
            </View>
          </TouchableOpacity>

          <View style={styles.infoRow}>
            <Image source={pawIcon} style={styles.icon} />
            <View style={styles.textContainer}>
              <Text style={styles.detailText}>Pets: {petsCount}</Text>
            </View>
          </View>
        </View>
      ) : (
        <Text style={styles.errorText}>No details available</Text>
      )}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("ChangePassword")}
        >
          <Text style={styles.buttonText}>Change Password</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleLogout}>
          <Text style={styles.buttonText}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}