import React, { useState, useEffect } from "react";
import { useFocusEffect } from '@react-navigation/native';
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  Alert,
} from "react-native";
import { collection, getDocs, query, deleteDoc, doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import animal_list_logo from "../assets/animal_list_logo.png";
import vets_partners_logo from "../assets/vets_partners_logo.png";
import profile_logo from "../assets/profile_logo.png";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { styles } from '../styles/PetProfileStyles.js'

const PetProfile = ({ navigation, route }) => {
  const [pet, setPet] = useState(null);
  const [medications, setMedications] = useState([]);
  const [loading, setLoading] = useState(true);
  const { petId } = route.params;

  useFocusEffect(
    React.useCallback(() => {
      const fetchPetData = async () => {
        try {
          const userId = await AsyncStorage.getItem("userId");
          if (userId) {
            const petDoc = await getDoc(doc(db, "users", userId, "pets", petId));
            if (petDoc.exists()) {
              setPet(petDoc.data());
              const medicationsCollectionRef = collection(
                db,
                "users",
                userId,
                "pets",
                petId,
                "medication"
              );
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
    }, [petId])
  );

  const handleAddMedication = () => {
    navigation.navigate("AddMedication", { petId: petId });
  };

  const renderItem = ({ item }) => {
    const formattedDate = item.timestamp && item.timestamp.toDate().toLocaleString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    });
    
    return (
      <View style={styles.listItem}>
        <Text style={styles.itemText}>Medication: {item.medName}</Text>
        <Text style={styles.itemText}>Dosage: {item.dosage}</Text>
        <Text style={styles.itemText}>Date: {formattedDate}</Text>
      </View>
    );
  };

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

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
      <Text style={styles.header}>{pet ? pet.petName : "Pet Profile"}</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={handleAddMedication}
        >
          <Text style={styles.addButtonText}>Add Medication</Text>
        </TouchableOpacity>
      </View>
      {pet ? (
        <View style={styles.detailsContainer}>
          <Text style={styles.sectionHeader}>Medications</Text>
          <FlatList
            data={medications}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => confirmDeleteMedication(item.id)}
              >
                {renderItem({ item })}
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContainer}
          />
        </View>
      ) : (
        <Text style={styles.errorText}>No pet details available</Text>
      )}
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
};

export default PetProfile;
