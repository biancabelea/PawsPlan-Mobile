import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  Alert,
  Linking,
} from "react-native";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase"; // Ensure you have configured Firebase
import * as Clipboard from "expo-clipboard";

// Import images from the assets folder
import emailIcon from "../assets/mail.png";
import phoneIcon from "../assets/phone.png";
import addressIcon from "../assets/address.png";
import filledStar from "../assets/full_star.png";
import emptyStar from "../assets/empty_star.png";
import websiteIcon from "../assets/website.png";

const Vet_Profile = ({ route }) => {
  const { vet } = route.params;
  const [vetDetails, setVetDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVetDetails = async () => {
      try {
        console.log(`Fetching details for vet ID: ${vet.id}`);
        const vetDoc = await getDoc(doc(db, "vets", vet.id));
        if (vetDoc.exists()) {
          console.log("Vet details fetched successfully:", vetDoc.data());
          setVetDetails(vetDoc.data());
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching vet details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVetDetails();
  }, [vet.id]);

  const copyToClipboard = async (text) => {
    await Clipboard.setStringAsync(text);
    Alert.alert("Copied to Clipboard", text);
  };

  const openWebsite = (url) => {
    Linking.openURL(url);
  };

  const renderStars = (rating) => {
    let stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <Image
          key={i}
          source={i < rating ? filledStar : emptyStar}
          style={styles.star}
        />
      );
    }
    return stars;
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
      <Text style={styles.header}>Vet Profile</Text>
      {vetDetails ? (
        <View style={styles.detailsContainer}>
          <TouchableOpacity
            style={styles.infoRow}
            onPress={() => copyToClipboard(vetDetails.mail)}
          >
            <Image source={emailIcon} style={styles.icon} />
            <View style={styles.textContainer}>
              <Text style={styles.detailText}>{vetDetails.mail}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.infoRow}
            onPress={() => copyToClipboard(vetDetails.telefon)}
          >
            <Image source={phoneIcon} style={styles.icon} />
            <View style={styles.textContainer}>
              <Text style={styles.detailText}>{vetDetails.telefon}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.infoRow}
            onPress={() => copyToClipboard(vetDetails.adresa)}
          >
            <Image source={addressIcon} style={styles.icon} />
            <View style={styles.textContainer}>
              <Text style={styles.detailText}>{vetDetails.adresa}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.infoRow}
            onPress={() => openWebsite(vetDetails.website)}
          >
            <Image source={websiteIcon} style={styles.icon} />
            <View style={styles.textContainer}>
              <Text style={styles.detailText}>{vetDetails.website}</Text>
            </View>
          </TouchableOpacity>
          <View style={styles.starRating}>
            {renderStars(vetDetails.recenzie)}
          </View>
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
  starRating: {
    flexDirection: "row",
    marginTop: 20,
  },
  star: {
    width: 30,
    height: 30,
    marginRight: 5,
  },
  errorText: {
    fontSize: 18,
    color: "red",
  },
});

export default Vet_Profile;
