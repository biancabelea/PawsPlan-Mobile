import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Platform } from "react-native";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePicker from '@react-native-community/datetimepicker';
import { styles } from '../styles/AddMedicationStyles.js'

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
      navigation.goBack();
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

export default AddMedication;
