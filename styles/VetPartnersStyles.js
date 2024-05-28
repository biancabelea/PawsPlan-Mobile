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