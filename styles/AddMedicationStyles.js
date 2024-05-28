import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
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