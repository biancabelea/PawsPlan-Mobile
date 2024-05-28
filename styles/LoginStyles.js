import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#43B4F4",
      padding: 20,
    },
    header: {
      fontSize: 50,
      fontWeight: "bold",
      textAlign: "center",
      marginBottom: 20,
      marginTop: -50,
      color: "#FFFFFF",
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
    label: {
      fontWeight: "bold",
      color: "#FFFFFF",
      alignSelf: "flex-start",
      marginLeft: 20,
      marginBottom: 5,
    },
    button: {
      width: 250, // Set a fixed width for the buttons
      backgroundColor: "#FFFFFF",
      borderRadius: 30,
      paddingVertical: 15,
      marginTop: 30,
      alignItems: "center", // Center the text horizontally
    },
    buttonText: {
      color: "#000000",
      fontSize: 18,
      fontWeight: "bold",
    },
  });