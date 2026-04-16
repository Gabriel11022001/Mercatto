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
import DetalhesVenda from '../views/DetalhesVenda';
import AdicionarProdutoCarrinho from '../views/FluxoVenda/AdicionarProdutoCarrinho';
import Carrinho from '../views/FluxoVenda/Carrinho';
import FormaPagamento from '../views/FluxoVenda/FormaPagamento';
import InicioFluxoVenda from '../views/FluxoVenda/InicioFluxoVenda';
import SelecionarCliente from '../views/FluxoVenda/SelecionarCliente';
import Home from '../views/Home';
import Login from '../views/Login';
import Perfil from '../views/Perfil';
import Produtos from '../views/Produtos';
import RecuperarSenha from '../views/RecuperarSenha';
import SplashScreen from '../views/SplashScreen';
import Vendas from '../views/Vendas';

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
    },
    {
      nome: "produtos",
      componente: Produtos,
      titulo: "Produtos"
    },
    {
      nome: "inicio_fluxo_venda",
      componente: InicioFluxoVenda,
      titulo: "Venda"
    },
    {
      nome: "selecionar_cliente",
      componente: SelecionarCliente,
      titulo: "Venda"
    },
    {
      nome: "carrinho",
      componente: Carrinho,
      titulo: "Carrinho de Compra"
    },
    {
      nome: "adicionar_produto_carrinho",
      componente: AdicionarProdutoCarrinho,
      titulo: "Adicionar Produto"
    },
    {
      nome: "forma_pagamento",
      componente: FormaPagamento,
      titulo: "Forma de Pagamento"
    },
    {
      nome: "vendas",
      componente: Vendas,
      titulo: "Vendas"
    },
    {
      nome: "detalhes_venda",
      componente: DetalhesVenda,
      titulo: "Detalhes da Venda"
    },
    {
      nome: "perfil",
      componente: Perfil,
      titulo: "Perfil"
    },
    {
      nome: "recuperar_senha",
      componente: RecuperarSenha,
      titulo: "Recuperar Senha"
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

                  if (tela.nome === "clientes" || tela.nome === "categorias"
                    || tela.nome === "vendas" || tela.nome === "produtos"
                  ) {
                    let telaRedirecionar: string = "";

                    if (tela.nome === "clientes") {
                      telaRedirecionar = "cadastro_cliente";
                    } else if (tela.nome === "categorias") {
                      telaRedirecionar = "cadastro_categoria";
                    } else if (tela.nome === "produtos") {
                      telaRedirecionar = "cadastro_produto";
                    } else if (tela.nome === "vendas") {
                      telaRedirecionar = "inicio_fluxo_venda";
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