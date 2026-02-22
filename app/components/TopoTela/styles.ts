import { config } from "@/config";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({

  container: {
    width: "100%",
    marginBottom: 30,
    backgroundColor: config.cores.find(c => c.nomeCor === "branco")?.cor ?? "#000",
    height: 120,
    paddingTop: 60,
    paddingStart: 20,
    paddingEnd: 20,
    paddingBottom: 30,
    elevation: 5,
    alignItems: "center",
    justifyContent: "center"
  },
  logo: {
    width: "100%",
    height: 100
  }

});

export default styles;