import { config } from "@/config";
import { Image, View } from "react-native";

type FotoProps = {

  fotoApresentar?: string;

}

// componente que representa uma foto
const Foto = ({ fotoApresentar }: FotoProps) => {

  return <View style={ {
    width: "90%",
    marginStart: "5%",
    marginEnd: "5%",
    marginTop: 20,
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center"
  } }>
    <View style={ {
      width: 220,
      height: 220,
      borderStyle: "solid",
      borderWidth: 1,
      borderColor: config.cores.find(c => c.nomeCor === "borda")?.cor ?? "#000",
      borderRadius: "100%",
      backgroundColor: config.cores.find(c => c.nomeCor === "branco")?.cor ?? "#fff",
      alignItems: "center",
      justifyContent: "center",
      elevation: 5
    } }>
      <View style={ {
        width: 210,
        height: 210,
        borderRadius: "100%"
      } }>
        <Image
          style={ {
            width: "100%",
            height: "100%",
            resizeMode: "cover",
            borderRadius: 100
          } }
          source={ fotoApresentar ? {
            uri: `data:image/jpeg;base64,${ fotoApresentar }`
          } : require("@/assets/images/imagem_vazia.png") } />
      </View>
    </View>
  </View>
}

export default Foto;