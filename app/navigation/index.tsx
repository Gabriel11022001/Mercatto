import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
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
              headerShown: tela.nome !== "splash" && tela.nome != "login",
              title: tela.titulo
            } } />
        );
      }) }
    </Stack.Navigator>
  </NavigationContainer>
}

export default Navigation;