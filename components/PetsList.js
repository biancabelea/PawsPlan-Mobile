import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from "react-native";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../firebase";
import animal_list_logo from "../assets/animal_list_logo.png";
import vets_partners_logo from "../assets/vets_partners_logo.png";
import profile_logo from "../assets/profile_logo.png";
import AsyncStorage from "@react-native-async-storage/async-storage";
//import { useFocusEffect } from "@react-navigation/native";

const PetsList = ({ navigation }) => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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

    fetchPets();
  }, []);

  // useFocusEffect(
  //   useCallback(() => {
  //     fetchPets();
  //   }, [])
  // );

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate("PetProfile", { pet: item })}
    >
      <View style={styles.listItem}>
        <Text style={styles.itemText}>{item.petName}</Text>
        <Text style={styles.itemSubText}>Age: {item.age}</Text>
        <Text style={styles.itemSubText}>Breed: {item.breed}</Text>
      </View>
    </TouchableOpacity>
  );

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#43B4F4",
    padding: 20,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  addButton: {
    backgroundColor: "#841584",
    padding: 10,
    borderRadius: 20,
  },
  addButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  listWrapper: {
    width: 350,
    height: "70%",
    backgroundColor: "#FFFFFF",
    borderRadius: 30,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  listContainer: {
    paddingHorizontal: 10,
  },
  listItem: {
    backgroundColor: "#E0E0E0",
    padding: 15,
    marginBottom: 20,
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  itemText: {
    fontSize: 16,
    marginBottom: 5,
  },
  itemSubText: {
    fontSize: 14,
    color: "#555",
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default PetsList;
