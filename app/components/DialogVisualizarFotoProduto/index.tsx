import { FotoProduto } from "@/app/views/CadastroProduto";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Image, Pressable, View } from "react-native";
import { styles } from "./styles";

interface Props {

  onFechar: () => void;
  foto: FotoProduto;

}

const DialogVisualizarFotoProduto = ({ foto, onFechar }: Props) => {

  return <View style={ styles.container }>
    <View style={ styles.containerFoto }>
      <Pressable onPress={ onFechar }>
        <AntDesign name="close" size={ 24 } color="black" />
      </Pressable>
      <Image style={ styles.foto } source={ { uri: `data:image/jpeg;base64,${ foto.foto }` } } />
    </View>
  </View>
}

export default DialogVisualizarFotoProduto;