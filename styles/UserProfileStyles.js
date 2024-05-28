import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#43B4F4",
      padding: 20,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    header: {
      fontSize: 24,
      fontWeight: "bold",
      color: "#FFFFFF",
      textAlign: "left",
      alignSelf: "flex-start",
      marginLeft: 20,
      marginTop: 20,
      marginBottom: 10,
    },
    detailsContainer: {
      width: 350,
      backgroundColor: "#FFFFFF",
      padding: 5,
      borderRadius: 30,
      height: "50%",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
      alignItems: "center",
    },
    infoRow: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 15,
      borderRadius: 30,
      backgroundColor: "#FFFFFF",
      padding: 20,
      width: "100%",
    },
    icon: {
      width: 40,
      height: 40,
      marginRight: 10,
    },
    textContainer: {
      backgroundColor: "#E0E0E0",
      paddingVertical: 10,
      paddingHorizontal: 10,
      borderRadius: 30,
      flex: 1,
    },
    detailText: {
      fontSize: 18,
    },
    buttonsContainer: {
      marginTop: 20,
      width: "100%",
      alignItems: "center",
    },
    button: {
      width: 250,
      backgroundColor: "#FFFFFF",
      borderRadius: 30,
      paddingVertical: 15,
      marginVertical: 10,
      alignItems: "center",
    },
    buttonText: {
      color: "#000000",
      fontSize: 18,
      fontWeight: "bold",
    },
    errorText: {
      fontSize: 18,
      color: "red",
    },
  });
  