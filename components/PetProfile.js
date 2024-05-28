import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Alert,
} from "react-native";
import { db } from "../firebase.js";
import { doc, getDoc, collection, getDocs, deleteDoc } from "firebase/firestore";
import { useNavigation, useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Clipboard from "expo-clipboard";
import animal_list_logo from "../assets/animal_list_logo.png";
import vets_partners_logo from "../assets/vets_partners_logo.png";
import profile_logo from "../assets/profile_logo.png";

export default function PetProfile() {
  const [pet, setPet] = useState(null);
  const [medications, setMedications] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const route = useRoute();
  const { petId } = route.params;

  useEffect(() => {
    const fetchPetData = async () => {
      try {
        const userId = await AsyncStorage.getItem("userId");
        if (userId) {
          const petDoc = await getDoc(doc(db, "users", userId, "pets", petId));
          if (petDoc.exists()) {
            setPet(petDoc.data());

            // Fetch the nested medications collection
            const medicationsCollectionRef = collection(db, "users", userId, "pets", petId, "medication");
            const medicationsSnapshot = await getDocs(medicationsCollectionRef);
            const medicationsData = medicationsSnapshot.docs.map((doc) => {
              return {
                id: doc.id,
                ...doc.data(),
              };
            });
            setMedications(medicationsData);
          } else {
            console.log("No such document!");
          }
        } else {
          console.log("No userId found in AsyncStorage");
        }
      } catch (error) {
        console.error("Error fetching pet data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPetData();
  }, [petId]);

  const confirmDeleteMedication = (medicationId) => {
    Alert.alert(
      "Confirm Deletion",
      "Are you sure you want to delete this medication?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => handleDeleteMedication(medicationId),
          style: "destructive",
        },
      ],
      { cancelable: false }
    );
  };

  const handleDeleteMedication = async (medicationId) => {
    try {
      const userId = await AsyncStorage.getItem("userId");
      if (userId) {
        await deleteDoc(doc(db, "users", userId, "pets", petId, "medication", medicationId));
        setMedications((prevMedications) => prevMedications.filter((med) => med.id !== medicationId));
        Alert.alert("Success", "Medication deleted successfully");
      } else {
        console.error("No userId found in AsyncStorage");
      }
    } catch (error) {
      console.error("Error deleting medication: ", error);
      Alert.alert("Error", "Failed to delete medication");
    }
  };

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
      <View style={styles.container}>
        <Text style={styles.header}>{pet ? pet.petName : "Pet Profile"}</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate("AddMedication")}
        >
          <Text style={styles.addButtonText}>Add Medication</Text>
        </TouchableOpacity>
        {pet ? (
          <View style={styles.detailsContainer}>
            <Text style={styles.sectionHeader}>Medications</Text>
            {medications.length > 0 ? (
              medications.map((medication) => (
                <TouchableOpacity
                  key={medication.id}
                  style={styles.infoRow}
                  onLongPress={() => confirmDeleteMedication(medication.id)}
                >
                  <View style={styles.textContainer}>
                    <Text style={styles.detailText}>Medication: {medication.medName}</Text>
                    <Text style={styles.detailText}>Dosage: {medication.dosage}</Text>
                    <Text style={styles.detailText}>Date: {medication.timestamp}</Text>
                  </View>
                </TouchableOpacity>
              ))
            ) : (
              <Text style={styles.noDataText}>No medications found.</Text>
            )}
          </View>
        ) : (
          <Text style={styles.errorText}>No details available</Text>
        )}
      </View>
      <View style={styles.footer}>
        <TouchableOpacity
          onPress={() => navigation.navigate("PetsList")}
          style={styles.footerButton}
        >
          <Image source={animal_list_logo} style={styles.footerIcon} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("VetPartners")}
          style={styles.footerButton}
        >
          <Image source={vets_partners_logo} style={styles.footerIcon} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("UserProfile")}
          style={styles.footerButton}
        >
          <Image source={profile_logo} style={styles.footerIcon} />
        </TouchableOpacity>
      </View>
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
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
  sectionHeader: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    marginVertical: 10,
  },
  noDataText: {
    fontSize: 16,
    color: "gray",
  },
  errorText: {
    fontSize: 18,
    color: "red",
  },
  footer: {
    width: 350,
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
    borderRadius: 30,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderColor: "#DDDDDD",
    marginTop: 20,
  },
  footerButton: {
    marginHorizontal: 20,
  },
  footerIcon: {
    width: 50,
    height: 50,
  },
});
