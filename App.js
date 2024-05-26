import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { collection, getDocs } from "firebase/firestore";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import db from "./firebase";
import Login from "./components/Login";
import Register from "./components/Register";
import Vet_Partners from "./components/Vet_Partners";
import Vet_Profile from "./components/Vet_Profile";
import User_Profile from "./components/User_Profile";

// export default function App() {
//   const [items, setItems] = useState([]);

//   // useEffect(() => {
//   //   const fetchData = async () => {
//   //     const querySnapshot = await getDocs(collection(db, 'users'));
//   //     const fetchedItems = [];
//   //     querySnapshot.forEach((doc) => {
//   //       fetchedItems.push(doc.data());
//   //     });
//   //     setItems(fetchedItems);
//   //   };

//   //   fetchData();
//   // }, []);

//   return (
//     <View style={styles.container}>
//       {/* {items.map((item, index) => (
//         <Text key={index}>{JSON.stringify(item)}</Text>
//       ))}
//       <StatusBar style="auto" /> */}
//       {/* <Login/> */}
//       <VetPartners />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Vet_Profile"
          component={Vet_Profile}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="User_Profile"
          component={User_Profile}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
