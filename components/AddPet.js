import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
      <TextInput
        style={styles.input}
        placeholder="Pet Name"
        value={petName}
        onChangeText={setPetName}
      />
      <TextInput
        style={styles.input}
        placeholder="Age"
        value={age}
        onChangeText={setAge}
      />
      <TextInput
        style={styles.input}
        placeholder="Breed"
        value={breed}
        onChangeText={setBreed}
      />
      <Button title="Add Pet" onPress={handleAddPet} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#43B4F4",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#FFFFFF",
  },
  input: {
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 10,
    backgroundColor: "#FFFFFF",
  },
});

export default AddPet;
