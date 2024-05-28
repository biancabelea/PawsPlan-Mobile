import React, { useState, useCallback } from "react";
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
import { collection, getDocs, query, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import animal_list_logo from "../assets/animal_list_logo.png";
import vets_partners_logo from "../assets/vets_partners_logo.png";
import profile_logo from "../assets/profile_logo.png";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { styles } from '../styles/PetsListStyles.js'

const PetsList = ({ navigation }) => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPets = async () => {
    try {
      const userId = await AsyncStorage.getItem("userId");
      if (!userId) {
        throw new Error("No user ID found");
      }
      const petsQuery = query(collection(db, "users", userId, "pets"));
      const petsSnapshot = await getDocs(petsQuery);
      const petsData = petsSnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          petId: doc.id,
          petName: data.petName,
          age: data.age,
          breed: data.breed,
        };
      });
      setPets(petsData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching pets: ", error);
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchPets();
    }, [])
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate("PetProfile", { petId: item.petId })}
      onLongPress={() => confirmDeletePet(item.petId)}
    >
      <View style={styles.listItem}>
        <Text style={styles.itemText}>{item.petName}</Text>
        <Text style={styles.itemSubText}>Age: {item.age}</Text>
        <Text style={styles.itemSubText}>Breed: {item.breed}</Text>
      </View>
    </TouchableOpacity>
  );

  const confirmDeletePet = (petId) => {
    Alert.alert(
      "Confirm Deletion",
      "Are you sure you want to delete this pet?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => handleDeletePet(petId),
          style: "destructive",
        },
      ],
      { cancelable: false }
    );
  };

  const handleDeletePet = async (petId) => {
    try {
      const userId = await AsyncStorage.getItem("userId");
      if (userId) {
        await deleteDoc(doc(db, "users", userId, "pets", petId));
        setPets((prevPets) => prevPets.filter((pet) => pet.petId !== petId));
        Alert.alert("Success", "Pet deleted successfully");
      } else {
        console.error("No userId found in AsyncStorage");
      }
    } catch (error) {
      console.error("Error deleting pet: ", error);
      Alert.alert("Error", "Failed to delete pet");
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
        <Text style={styles.header}>My Pets</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate("AddPet")}
        >
          <Text style={styles.addButtonText}>Add Pet</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.listWrapper}>
        <FlatList
          data={pets}
          renderItem={renderItem}
          keyExtractor={(item) => item.petId}
          contentContainerStyle={styles.listContainer}
        />
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
};

export default PetsList;