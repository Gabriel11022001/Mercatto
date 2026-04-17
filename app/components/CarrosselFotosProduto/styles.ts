import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  
  carrosselContainer: {
    width: "100%",
    height: 400,
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center"
  },
  foto: {
    width: "100%",
    height: "100%",
    resizeMode: "cover"
  },
  containerProgressoFotos: {
    position: "absolute",
    top: 0,
    bottom: 0,
    start: 0,
    end: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  botaoControle: {
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    borderRadius: 20
  }

});

export default styles;