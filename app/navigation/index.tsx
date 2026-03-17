import { config } from '@/config';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Pressable } from 'react-native';
import CadastroCategoria from '../views/CadastroCategoria';
import CadastroCliente from '../views/CadastroCliente';
import CadastroProduto from '../views/CadastroProduto';
import CadastroUsuario from '../views/CadastroUsuario';
import Categorias from '../views/Categorias';
import Clientes from '../views/Clientes';
import Home from '../views/Home';
import Login from '../views/Login';
import SplashScreen from '../views/SplashScreen';

const Navigation = () => {

  const Stack = createNativeStackNavigator();
  
  const telas: Array<{
    nome: string,
    componente: any,
    titulo: string
  }> = [
    {
      nome: "splash",
      componente: SplashScreen,
      titulo: ""
    },
    {
      nome: "login",
      componente: Login,
      titulo: "Login"
    },
    {
      nome: "cadastro_usuario",
      componente: CadastroUsuario,
      titulo: "Registrar-se"
    },
    {
      nome: "home",
      componente: Home,
      titulo: "Home"
    },
    {
      nome: "cadastro_cliente",
      componente: CadastroCliente,
      titulo: "Cadastrar Cliente"
    },
    {
      nome: "clientes",
      componente: Clientes,
      titulo: "Clientes"
    },
    {
      nome: "cadastro_categoria",
      componente: CadastroCategoria,
      titulo: "Cadastrar Categoria"
    },
    {
      nome: "categorias",
      componente: Categorias,
      titulo: "Categorias"
    },
    {
      nome: "cadastro_produto",
      componente: CadastroProduto,
      titulo: "Cadastrar Produto"
    }
  ];

  return <NavigationContainer>
    <Stack.Navigator initialRouteName="splash">
      { telas.map((tela) => {

        return (
          <Stack.Screen 
            name={ tela.nome } 
            component={ tela.componente }
            options={ ({ navigation }) => {
              
              return {
                headerShown: tela.nome !== "splash" && tela.nome != "login" && tela.nome != "home",
                title: tela.titulo,
                headerStyle: {
                  backgroundColor: config.cores.find(cor => cor.nomeCor === "secundaria")?.cor ?? "#000"
                },
                headerTintColor: config.cores.find(cor => cor.nomeCor === "branco")?.cor ?? "#fff",
                headerRight: () => {

                  if (tela.nome === "clientes" || tela.nome === "categorias") {
                    let telaRedirecionar: string = "";

                    if (tela.nome === "clientes") {
                      telaRedirecionar = "cadastro_cliente";
                    } else if (tela.nome === "categorias") {
                      telaRedirecionar = "cadastro_categoria";
                    } else if (tela.nome === "produtos") {
                      telaRedirecionar = "cadastro_produto";
                    } else if (tela.nome === "vendas") {
                      telaRedirecionar = "nova_venda";
                    }

                    return <Pressable
                      onPress={ () => navigation.navigate(telaRedirecionar) }>
                      <FontAwesome6 name="add" size={ 30 } color="#fff" />
                    </Pressable>
                  }

                  return null;
                }
              }
            } } />
        );
      }) }
    </Stack.Navigator>
  </NavigationContainer>
}

export default Navigation;