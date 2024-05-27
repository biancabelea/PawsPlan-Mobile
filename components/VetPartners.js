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
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase"; // Ensure you have configured Firebase

// Import images from the assets folder
import animal_list_logo from "../assets/animal_list_logo.png";
import vets_partners_logo from "../assets/vets_partners_logo.png";
import profile_logo from "../assets/profile_logo.png";

const VetPartners = ({ navigation }) => {
  const [vets, setVets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVets = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "vets"));
        const vetsList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setVets(vetsList);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching vets: ", error);
        setLoading(false);
      }
    };

    fetchVets();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate("VetProfile", { vet: item })}
    >
      <View style={styles.listItem}>
        <Text style={styles.itemText}>{item.cabinet}</Text>
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
      <Text style={styles.header}>Vet Partners</Text>
      <View style={styles.listWrapper}>
        <FlatList
          data={vets}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
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
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "left",
    alignSelf: "flex-start",
    color: "#FFFFFF",
    marginLeft: 20,
    marginTop: 20,
    marginBottom: 10,
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
  input: {
    width: 380,
    height: 40,
    padding: 10,
    borderWidth: 1,
    borderColor: "black",
    marginBottom: 10,
  },
  label: {
    fontWeight: "bold",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default VetPartners;
