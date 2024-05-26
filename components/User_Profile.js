import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase"; // Ensure you have configured Firebase
import * as Clipboard from "expo-clipboard";

// Import images from the assets folder
import emailIcon from "../assets/mail.png";
import ownerIcon from "../assets/profile_logo.png";

const User_Profile = ({ route }) => {
  const { user } = route.params;
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        console.log(`Fetching details for user ID: ${user.id}`);
        const userDoc = await getDoc(doc(db, "users", user.id));
        if (userDoc.exists()) {
          console.log("User details fetched successfully:", userDoc.data());
          setUserDetails(userDoc.data());
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [user.id]);

  const copyToClipboard = async (text) => {
    await Clipboard.setStringAsync(text);
    Alert.alert("Copied to Clipboard", text);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>User Profile</Text>
      {userDetails ? (
        <View style={styles.detailsContainer}>
          <TouchableOpacity
            style={styles.infoRow}
            onPress={() => copyToClipboard(userDetails.ownerName)}
          >
            <Image source={ownerIcon} style={styles.icon} />
            <View style={styles.textContainer}>
              <Text style={styles.detailText}>{userDetails.ownerName}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.infoRow}
            onPress={() => copyToClipboard(userDetails.email)}
          >
            <Image source={emailIcon} style={styles.icon} />
            <View style={styles.textContainer}>
              <Text style={styles.detailText}>{userDetails.email}</Text>
            </View>
          </TouchableOpacity>
        </View>
      ) : (
        <Text style={styles.errorText}>No details available</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#43B4F4",
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "left",
    alignSelf: "flex-start",
    marginLeft: 20,
    marginTop: 20,
    marginBottom: 10,
  },
  detailsContainer: {
    width: 350,
    backgroundColor: "#FFFFFF",
    padding: 5,
    borderRadius: 30,
    height: "70%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignItems: "center",
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    borderRadius: 30,
    backgroundColor: "#FFFFFF",
    padding: 20,
    width: "100%",
  },
  icon: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  textContainer: {
    backgroundColor: "#E0E0E0",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 30,
    flex: 1,
  },
  detailText: {
    fontSize: 18,
  },
  errorText: {
    fontSize: 18,
    color: "red",
  },
});

export default User_Profile;
