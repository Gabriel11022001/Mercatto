import { Cliente } from "@/app/type/cliente";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";

type Props = {

  clienteApresentar: Cliente;
  onRedirecionar: () => void;

}

// componente para apresentar os dados do cliente que acabou de ser cadastrado/editado
const TelaDadosClienteSalvar = ({ clienteApresentar, onRedirecionar }: Props) => {

  return <View style={ styles.container }>
    <View style={ styles.centro }>
      <Image style={ styles.iconeSucesso } source={ require("@/assets/images/icone_sucesso.png") } />
      <Text style={ styles.txtMsg }>Cliente salvo com sucesso!</Text>
      { /** nome do cliente */ }
      <View style={ styles.containerDadoCliente }>
        <Text style={ styles.txtTituloDado }>Cliente</Text>
        <Text style={ styles.txtDado }>{ clienteApresentar.nome }</Text>
      </View>
      { /** cpf do cliente */ }
      <View style={ styles.containerDadoCliente }>
        <Text style={ styles.txtTituloDado }>CPF</Text>
        <Text style={ styles.txtDado }>{ clienteApresentar.cpf }</Text>
      </View>
      { /** e-mail do cliente */ }
      <View style={ styles.containerDadoCliente }>
        <Text style={ styles.txtTituloDado }>E-mail</Text>
        <Text style={ styles.txtDado }>{ clienteApresentar.email }</Text>
      </View>
      { /** gênero do cliente */ }
      <View style={ styles.containerDadoCliente }>
        <Text style={ styles.txtTituloDado }>Gênero</Text>
        <Text style={ styles.txtDado }>{ clienteApresentar.genero }</Text>
      </View>
      { /** telefone do cliente */ }
      <View style={ styles.containerDadoCliente }>
        <Text style={ styles.txtTituloDado }>Telefone</Text>
        <Text style={ styles.txtDado }>{ clienteApresentar.telefone }</Text>
      </View>
      { /** data de nascimento do cliente */ }
      <View style={ styles.containerDadoCliente }>
        <Text style={ styles.txtTituloDado }>Data de nascimento</Text>
        <Text style={ styles.txtDado }>{ clienteApresentar.dataNascimento }</Text>
      </View>
      <TouchableOpacity style={ styles.btnOk } onPress={ () => {
        onRedirecionar();
      } }>
        <Text>OK</Text>
      </TouchableOpacity>
    </View>
  </View>
}

export default TelaDadosClienteSalvar;