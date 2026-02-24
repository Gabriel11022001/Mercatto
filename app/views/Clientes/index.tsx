import ClienteItem from "@/app/components/ClienteItem";
import Loader from "@/app/components/Loader";
import Tela from "@/app/components/Tela";
import listarClientesFirebase from "@/app/firebase/listarClientes";
import { Cliente } from "@/app/type/cliente";
import { config } from "@/config";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { FlatList, View } from "react-native";

// tela de listagem de clientes
const Clientes = ({ navigation }: any) => {

  const [ carregando, setCarregando ] = useState<boolean>(false);
  const [ clientes, setClientes ] = useState<Array<Cliente>>([]);

  const listarClientes = async () => {
    console.log("Consultando os clientes no servidor...");
    setClientes([]);
    setCarregando(true);

    try {
      const clientesLista = await listarClientesFirebase();

      setClientes(clientesLista);

      console.log("Clientes listados com sucesso...");
    } catch (e) {
      console.log(e);

      // apresentar um alerta de erro para o usuário
    } finally {
      setCarregando(false);
    }

  }

  useFocusEffect(useCallback(() => {
    listarClientes();
  }, []));

  return (
    <Tela>
      <Loader carregando={ carregando } />
      { clientes.length === 0 ? <View>

      </View> : <FlatList
        style={ { backgroundColor: config.cores.find(cor => cor.nomeCor === "branco")?.cor ?? "#fff" } }
        data={ clientes }
        keyExtractor={ c => c.id.toString() ?? "" }
        renderItem={ ({ item }) => {

          return <ClienteItem cliente={ item } onApresentarOperacoesCliente={ () => {

          } } />
        } } />  }  
    </Tela>
  );
}

export default Clientes;