import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { styles } from '../styles/AddPetStyles.js'

const AddPet = ({ navigation }) => {
  const [petName, setPetName] = useState("");
  const [age, setAge] = useState("");
  const [breed, setBreed] = useState("");

  const handleAddPet = async () => {
    try {
      const userId = await AsyncStorage.getItem("userId");
      if (!userId) {
        throw new Error("No user ID found");
      }
      const docRef = await addDoc(collection(db, "users", userId, "pets"), {
        petName,
        age,
        breed,
      });
      navigation.navigate("PetsList");
    } catch (error) {
      console.error("Error adding pet: ", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Add a New Pet</Text>
      <Text style={styles.label}>Pet Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Pet Name"
        value={petName}
        onChangeText={setPetName}
      />
      <Text style={styles.label}>Age</Text>
      <TextInput
        style={styles.input}
        placeholder="Age"
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
      />
      <Text style={styles.label}>Breed</Text>
      <TextInput
        style={styles.input}
        placeholder="Breed"
        value={breed}
        onChangeText={setBreed}
      />
      <TouchableOpacity style={styles.button} onPress={handleAddPet}>
        <Text style={styles.buttonText}>Add pet</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddPet;
