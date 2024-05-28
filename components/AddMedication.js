import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Platform } from "react-native";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePicker from '@react-native-community/datetimepicker';

const AddMedication = ({ navigation, route }) => {
  const { petId } = route.params;
  const [medName, setMedName] = useState("");
  const [dosage, setDosage] = useState("");
  const [timestamp, setTimestamp] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleAddMedication = async () => {
    try {
      const userId = await AsyncStorage.getItem("userId");
      if (!userId) {
        throw new Error("No user ID found");
      }
      const docRef = await addDoc(collection(db, "users", userId, "pets", petId, "medication"), {
        medName,
        dosage,
        timestamp,
      });
      navigation.goBack(); // Navigate back to the PetProfile screen
    } catch (error) {
      console.error("Error adding medication: ", error);
    }
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || timestamp;
    setShowDatePicker(Platform.OS === 'ios');
    setTimestamp(currentDate);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Add Medication</Text>
      <Text style={styles.label}>Medication Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Medication Name"
        value={medName}
        onChangeText={setMedName}
      />
      <Text style={styles.label}>Dosage</Text>
      <TextInput
        style={styles.input}
        placeholder="Dosage"
        value={dosage}
        onChangeText={setDosage}
        keyboardType="numeric"
      />
      <Text style={styles.label}>Timestamp</Text>
      <TouchableOpacity style={styles.datePickerButton} onPress={() => setShowDatePicker(true)}>
        <Text style={styles.datePickerText}>{timestamp.toLocaleDateString()}</Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={timestamp}
          mode="datetime"
          display="default"
          onChange={handleDateChange}
        />
      )}
      <TouchableOpacity style={styles.button} onPress={handleAddMedication}>
        <Text style={styles.buttonText}>Add Medication</Text>
      </TouchableOpacity>
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
    fontSize: 35,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    marginTop: -50,
    color: "#FFFFFF",
    padding: 20,
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
    marginTop: 30,
    alignItems: "center",
  },
  buttonText: {
    color: "#000000",
    fontSize: 18,
    fontWeight: "bold",
  },
  label: {
    fontWeight: "bold",
    color: "#FFFFFF",
    alignSelf: "flex-start",
    marginLeft: 20,
    marginBottom: 5,
  },
  datePickerButton: {
    backgroundColor: "#FFFFFF",
    padding: 10,
    borderRadius: 30,
    marginBottom: 20,
    width: 300,
    alignItems: "center",
  },
  datePickerText: {
    fontSize: 18,
  },
});

export default AddMedication;
