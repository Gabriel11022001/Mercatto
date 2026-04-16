import { FotoProduto } from "@/app/views/CadastroProduto";
import { config } from "@/config";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Image, Pressable, Text, View } from "react-native";
import { styles } from "./styles";

interface Props {
  
  fotos: Array<FotoProduto>;
  onRemoverFoto: (fotoRemover: FotoProduto) => void;
  onVisualizarFoto: (fotoVisualizar: FotoProduto) => void;
  onTirarFoto: () => void;

}

// componente que represeta a lista de fotos do produto no cadastro do produto
const FotosProdutoLista = ({ fotos, onRemoverFoto, onTirarFoto, onVisualizarFoto }: Props) => {

  return <View>
    <Pressable
      style={ styles.botaoTirarFoto }
      onPress={ onTirarFoto }>
      <Text style={ styles.txtBotaoTirarFoto }>Tirar Foto</Text>
      <FontAwesome name="photo" size={ 40 } color={ config.cores.find(c => c.nomeCor === "primaria")?.cor ?? "#000" } />
    </Pressable>
    { fotos.map((foto: FotoProduto) => {

      return <View key={ foto.foto ?? "" } style={ styles.foto }>
        <Image style={  styles.fotoImagem } source={ { uri: `data:image/jpeg;base64,${ foto.foto }` } } />
        <View style={ styles.containerOperacoes }>
          { /** botão para remover a foto */ }
          <Pressable onPress={ () => { onRemoverFoto(foto); } }>
            <AntDesign name="delete" size={ 30 } color={
              config.cores.find(c => c.nomeCor === "primaria")?.cor ?? "#000"
            } />
          </Pressable>
          { /** botão para visualizar a foto */ }
          <Pressable onPress={ () => { onVisualizarFoto(foto); } }>
            <AntDesign name="eye" size={ 30 } color={
              config.cores.find(c => c.nomeCor === "primaria")?.cor ?? "#000"
            } />
          </Pressable>
        </View>
      </View>
    }) }
  </View>
}

export default FotosProdutoLista;