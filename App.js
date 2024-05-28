import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { collection, getDocs } from "firebase/firestore";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import db from "./firebase";
import Login from "./components/Login";
import Register from "./components/Register";
import VetPartners from "./components/VetPartners";
import VetProfile from "./components/VetProfile";
import UserProfile from "./components/UserProfile";
import PetsList from "./components/PetsList";
import ChangePassword from "./components/ChangePassword";
import AddPet from "./components/AddPet";
import PetProfile from "./components/PetProfile";
import AddMedication from "./components/AddMedication";

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
          name="PetsList"
          component={PetsList}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="VetProfile"
          component={VetProfile}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="UserProfile"
          component={UserProfile}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="VetPartners"
          component={VetPartners}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ChangePassword"
          component={ChangePassword}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AddPet"
          component={AddPet}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PetProfile"
          component={PetProfile}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AddMedication"
          component={AddMedication}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
