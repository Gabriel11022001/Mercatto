import { config } from '@/config';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CadastroCliente from '../views/CadastroCliente';
import CadastroUsuario from '../views/CadastroUsuario';
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
    }
  ];

  return <NavigationContainer>
    <Stack.Navigator initialRouteName="splash">
      { telas.map((tela) => {

        return (
          <Stack.Screen 
            name={ tela.nome } 
            component={ tela.componente }
            options={ {
              headerShown: tela.nome !== "splash" && tela.nome != "login" && tela.nome != "home",
              title: tela.titulo,
              headerStyle: {
                backgroundColor: config.cores.find(cor => cor.nomeCor === "secundaria")?.cor ?? "#000"
              },
              headerTintColor: config.cores.find(cor => cor.nomeCor === "branco")?.cor ?? "#fff"
            } } />
        );
      }) }
    </Stack.Navigator>
  </NavigationContainer>
}

export default Navigation;