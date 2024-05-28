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
      color: "#FFFFFF",
      textAlign: "left",
      alignSelf: "flex-start",
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
    detailsContainer: {
      width: 350,
      backgroundColor: "#FFFFFF",
      padding: 5,
      borderRadius: 30,
      height: "70%",
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
    listContainer: {
      flexGrow: 1,
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
      fontSize: 18,
    },
    sectionHeader: {
      fontSize: 20,
      fontWeight: "bold",
      color: "#000",
      marginVertical: 10,
    },
    errorText: {
      fontSize: 18,
      color: "red",
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
  