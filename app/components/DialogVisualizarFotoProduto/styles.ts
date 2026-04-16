import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({

  container: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    zIndex: 9999999,
    alignItems: "center",
    justifyContent: "center"
  },
  containerFoto: {
    width: "90%",
    marginStart: "5%",
    marginEnd: "5%",
    padding: 10,
    backgroundColor: "#fff",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-end"
  },
  foto: {
    width: "100%",
    height: 500,
    resizeMode: "cover",
    marginTop: 30
  }

});