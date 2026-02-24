import Tela from "@/app/components/Tela";
import TopoTela from "@/app/components/TopoTela";
import { config } from "@/config";
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Fontisto from '@expo/vector-icons/Fontisto';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import styles from "./styles";

// tela home do app
const Home = ({ navigation }: any) => {

  const [ carregando, setCarregando ] = useState<boolean>(false);
  const [ usuarioLogado, setUsuarioLogado ] = useState<string>("");

  // efetuar o logout do usuário
  const logout = async () => {
    console.log("Efetuando logout...");

    try {
      setCarregando(true);
    } catch (e) {

    } finally {
      setCarregando(false);
    }

  }

  const obterNomeUsuarioLogado = async () => {

  }

  useFocusEffect(useCallback(() => {
    obterNomeUsuarioLogado();
  }, []));

  return (
    <Tela>
      <ScrollView showsVerticalScrollIndicator={ false }>
        <TopoTela />
        <View style={ styles.containerBemVindo }>
          <Text style={ styles.txtSejaBemVindo }>Olá { usuarioLogado }</Text>
          <Image style={ styles.iconeSejaBemVindo } source={ require("@/assets/images/icone_ola.png") } />
        </View>
        <Text style={ styles.txtFazerHoje }>O que deseja fazer hoje?</Text>
        <View style={ styles.containerOpcaoMenu }>
          { /** cadastrar cliente */ }
          <Pressable onPress={ () => { navigation.navigate("cadastro_cliente") } } style={ ({ pressed }) => {

            if (pressed) {

              return styles.opcaoMenuPressionado;
            }

            return styles.opcaoMenu;
          } }>
            <Ionicons name="person-add" size={ 40 } color={
              config.cores.find(c => c.nomeCor === "icone_opcao_menu")?.cor ?? "#000"
            } />
            <Text style={ styles.txtOpcao }>Cadastrar Cliente</Text>
          </Pressable>
          { /** listar clientes */ }
          <Pressable onPress={ () => { navigation.navigate("clientes") } } style={ ({ pressed }) => {

            if (pressed) {

              return styles.opcaoMenuPressionado;
            }

            return styles.opcaoMenu;
          } }>
            <Fontisto name="persons" size={ 40 } color={
              config.cores.find(c => c.nomeCor === "icone_opcao_menu")?.cor ?? "#000"
            } />
            <Text style={ styles.txtOpcao }>Listar Clientes</Text>
          </Pressable>
        </View>
        <View style={ styles.containerOpcaoMenu }>
          { /** cadastrar produto */ }
          <Pressable onPress={ () => {} } style={ ({ pressed }) => {

            if (pressed) {

              return styles.opcaoMenuPressionado;
            }

            return styles.opcaoMenu;
          } }>
            <AntDesign name="product" size={ 40 } color={
              config.cores.find(c => c.nomeCor === "icone_opcao_menu")?.cor ?? "#000"
            } />
            <Text style={ styles.txtOpcao }>Cadastrar Produto</Text>
          </Pressable>
          { /** listar produtos */ }
          <Pressable onPress={ () => {} } style={ ({ pressed }) => {

            if (pressed) {

              return styles.opcaoMenuPressionado;
            }

            return styles.opcaoMenu;
          } }>
            <MaterialCommunityIcons name="clipboard-list-outline" size={ 40 } color={
              config.cores.find(c => c.nomeCor === "icone_opcao_menu")?.cor ?? "#000"
            } />
            <Text style={ styles.txtOpcao }>Listar Produtos</Text>
          </Pressable>
        </View>
        <View style={ styles.containerOpcaoMenu }>
          { /** cadastrar categoria de produto */ }
          <Pressable onPress={ () => {} } style={ ({ pressed }) => {

            if (pressed) {

              return styles.opcaoMenuPressionado;
            }

            return styles.opcaoMenu;
          } }>
            <MaterialIcons name="category" size={ 40 } color={
              config.cores.find(c => c.nomeCor === "icone_opcao_menu")?.cor ?? "#000"
            } />
            <Text style={ styles.txtOpcao }>Cadastrar Categoria</Text>
          </Pressable>
          { /** listar categorias */ }
          <Pressable onPress={ () => {} } style={ ({ pressed }) => {

            if (pressed) {

              return styles.opcaoMenuPressionado;
            }

            return styles.opcaoMenu;
          } }>
            <MaterialCommunityIcons name="clipboard-list-outline" size={ 40 } color={
              config.cores.find(c => c.nomeCor === "icone_opcao_menu")?.cor ?? "#000"
            } />
            <Text style={ styles.txtOpcao }>Listar Categorias</Text>
          </Pressable>
        </View>
        <View style={ styles.containerOpcaoMenu }>
          { /** realizar venda */ }
          <Pressable onPress={ () => {} } style={ ({ pressed }) => {

            if (pressed) {

              return styles.opcaoMenuPressionado;
            }

            return styles.opcaoMenu;
          } }>
            <Feather name="shopping-cart" size={ 40 } color={
              config.cores.find(c => c.nomeCor === "icone_opcao_menu")?.cor ?? "#000"
            } />
            <Text style={ styles.txtOpcao }>Realizar Venda</Text>
          </Pressable>
          { /** listar vendas */ }
          <Pressable onPress={ () => {} } style={ ({ pressed }) => {

            if (pressed) {

              return styles.opcaoMenuPressionado;
            }

            return styles.opcaoMenu;
          } }>
            <Feather name="shopping-cart" size={ 40 } color={
              config.cores.find(c => c.nomeCor === "icone_opcao_menu")?.cor ?? "#000"
            } />
            <Text style={ styles.txtOpcao }>Listar Vendas</Text>
          </Pressable>
        </View>
        <View style={ [
          styles.containerOpcaoMenu,
          { marginBottom: 100 }
        ] }>
          { /** perfil do usuário */ }
          <Pressable onPress={ () => {} } style={ ({ pressed }) => {

            if (pressed) {

              return styles.opcaoMenuPressionado;
            }

            return styles.opcaoMenu;
          } }>
            <FontAwesome6 name="person-walking" size={ 40 } color={
              config.cores.find(c => c.nomeCor === "icone_opcao_menu")?.cor ?? "#000"
            } />
            <Text style={ styles.txtOpcao }>Perfil</Text>
          </Pressable>
          { /** logout */ }
          <Pressable onPress={ logout } style={ ({ pressed }) => {

            if (pressed) {

              return styles.opcaoMenuPressionado;
            }

            return styles.opcaoMenu;
          } }>
            <SimpleLineIcons name="logout" size={ 40 } color="red" />
            <Text style={ styles.txtOpcao }>Logout</Text>
          </Pressable>
        </View>
      </ScrollView>
    </Tela>
  );
}

export default Home;