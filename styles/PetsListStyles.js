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
    headerContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      width: "100%",
      padding: 20,
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