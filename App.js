import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import db from './firebase';
import Login from './components/Login';

export default function App() {
  const [items, setItems] = useState([]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const querySnapshot = await getDocs(collection(db, 'users'));
  //     const fetchedItems = [];
  //     querySnapshot.forEach((doc) => {
  //       fetchedItems.push(doc.data());
  //     });
  //     setItems(fetchedItems);
  //   };

  //   fetchData();
  // }, []);

  return (
    <View style={styles.container}>
      {items.map((item, index) => (
        <Text key={index}>{JSON.stringify(item)}</Text>
      ))}
      <StatusBar style="auto" />
      <Login/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
