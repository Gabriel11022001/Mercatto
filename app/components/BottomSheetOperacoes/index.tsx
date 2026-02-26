import { config } from "@/config";
import AntDesign from '@expo/vector-icons/AntDesign';
import { Text, TouchableOpacity, View } from "react-native";

export enum OperacaoPermitida {

  deletar,
  editar,
  compartilhar,
  visualizar,
  alterarStatus

}

interface Props {

  operacoes: Array<OperacaoPermitida>;
  onEditar?: () => void;
  onDeletar?: () => void;
  onCompartilhar?: () => void;
  onVisualizar?: () => void;
  onAlterarStatus?: () => void;
  apresentar: boolean;
  titulo: string;
  onFechar: () => void;

}

// componente que representa um bottom sheet com operações(editar, visualizar, alterar status, deletar, compartilhar, etc...)
const BottomSheetOperacoes = ({
  operacoes,
  onEditar,
  onDeletar,
  onCompartilhar,
  onVisualizar,
  onAlterarStatus,
  apresentar,
  titulo,
  onFechar
}: Props) => {

  if (!apresentar) {
    
    return null;
  }
 
  console.log(operacoes);

  return (
    <View style={ {
      position: "absolute",
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 999999999,
      flexDirection: "row",
      alignItems: "flex-end",
      justifyContent: "center",
      backgroundColor: "rgba(0, 0, 0, 0.6)"
    } }>
      <View style={ {
        width: "100%",
        height: "auto",
        backgroundColor: config.cores.find(c => c.nomeCor === "branco")?.cor ?? "#fff",
        elevation: 5,
        borderTopStartRadius: 30,
        borderTopEndRadius: 30,
        padding: 30,
        alignItems: "center"
      } }>
        <TouchableOpacity style={ {
          position: "absolute",
          end: 30,
          top: 30
        } } onPress={ onFechar }>
          <AntDesign name="close" size={ 24 } color={ config.cores.find(c => c.nomeCor === "primaria")?.cor ?? "#000" } />
        </TouchableOpacity>
        <Text style={ { color: config.cores.find(c => c.nomeCor === "primaria")?.cor ?? "#000", fontSize: 20,
          marginTop: 30,
          fontWeight: "bold",
          marginBottom: 30
         } }>{ titulo }</Text>
        { operacoes.includes(OperacaoPermitida.visualizar) && <TouchableOpacity
          style={ {
            width: "90%",
            marginStart: "5%",
            marginEnd: "5%",
            marginTop: 10,
            marginBottom: 10,
            padding: 10,
            height: 50,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 12,
            elevation: 3,
            backgroundColor: config.cores.find(c => c.nomeCor === "primaria")?.cor ?? "#000"
          } }
          onPress={ () => {

            if (onVisualizar) {
              onVisualizar();
            }

          } }>
          <Text style={ { color: "#fff", fontSize: 16 } }>Visualizar</Text>
        </TouchableOpacity> }
        { operacoes.includes(OperacaoPermitida.editar) && <TouchableOpacity
          style={ {
            width: "90%",
            marginStart: "5%",
            marginEnd: "5%",
            marginTop: 10,
            marginBottom: 10,
            padding: 10,
            height: 50,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 12,
            elevation: 3,
            backgroundColor: config.cores.find(c => c.nomeCor === "primaria")?.cor ?? "#000"
          } }
          onPress={ () => {

            if (onEditar) {
              onEditar();
            }

          } }>
          <Text style={ { color: "#fff", fontSize: 16 } }>Editar</Text>
        </TouchableOpacity> }
        { operacoes.includes(OperacaoPermitida.editar) && <TouchableOpacity
          style={ {
            width: "90%",
            marginStart: "5%",
            marginEnd: "5%",
            marginTop: 10,
            marginBottom: 10,
            padding: 10,
            height: 50,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 12,
            elevation: 3,
            backgroundColor: "red"
          } }
          onPress={ () => {

            if (onDeletar) {
              onDeletar();
            }

          } }>
          <Text style={ { color: "#fff", fontSize: 16 } }>Deletar</Text>
        </TouchableOpacity> }
        <View style={ { height: 70, backgroundColor: "#fff" } } />
      </View>
    </View>
  );
}

export default BottomSheetOperacoes;