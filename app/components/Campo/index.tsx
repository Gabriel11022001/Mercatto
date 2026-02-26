import { config } from '@/config';
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Picker } from '@react-native-picker/picker';
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import styles from "./styles";

export enum TipoCampo {

  email,
  senha,
  padrao,
  nomeUsuario,
  telefone,
  nome,
  data,
  cep,
  endereco,
  complemento,
  multiploSeletorEndereco,
  multiploSeletorGenero,
  cpf

}

interface Props {

  valor: string;
  label: string;
  tipoCampo: TipoCampo;
  erro?: string;
  alterarValor?: (valor: string) => void;
  habilitado: boolean;
  senhaVisivel: boolean;
  onVisualizarSenha: () => void;
  onConsultarEnderecoPeloCep?: () => void;
  onSelecionarOpcao?: (opcaoSelecionada: string) => void;
  opcoes?: Array<{ key: string, valor: string, label: string }>;

}

const Campo = ({
  valor,
  label,
  tipoCampo,
  erro,
  alterarValor,
  habilitado,
  senhaVisivel = false,
  onVisualizarSenha,
  onConsultarEnderecoPeloCep,
  onSelecionarOpcao,
  opcoes
}: Props) => {

  // obter o icone do campo
  const getIcone = () => {
    
    const corIcones: string = config.cores.find(c => c.nomeCor === "primaria")?.cor ?? "#000";

    if (tipoCampo === TipoCampo.email) {

      return <Feather name="mail" size={ 24 } color={ corIcones } />;
    }

    if (tipoCampo === TipoCampo.senha) {

      return <AntDesign name="lock" size={ 24 } color={ corIcones } />;
    }

    if (tipoCampo === TipoCampo.nomeUsuario || tipoCampo === TipoCampo.nome || tipoCampo === TipoCampo.cpf) {

      return <Ionicons name="person-outline" size={ 24 } color={ corIcones } />;
    }

    if (tipoCampo === TipoCampo.data) {

      return <FontAwesome name="calendar" size={ 24 } color={ corIcones } />;
    }

    if (tipoCampo === TipoCampo.cep || tipoCampo === TipoCampo.endereco
      || tipoCampo === TipoCampo.complemento
    ) {

      return <Feather name="map-pin" size={ 24 } color={ corIcones } />;
    }

    if (tipoCampo === TipoCampo.multiploSeletorEndereco) {

      return <AntDesign name="home" size={ 24 } color={ corIcones } />
    }

    if (tipoCampo === TipoCampo.multiploSeletorGenero) {

      return <FontAwesome name="transgender" size={ 24 } color={ corIcones } />;
    }

    return null;
  }

  const getModoTecladoCampo = () => {

    if (tipoCampo === TipoCampo.email) {

      return "email";
    }

    if (tipoCampo === TipoCampo.senha) {

      return "numeric";
    }

    return "text";
  }

  const getTipoCampo = () => {

    if (tipoCampo === TipoCampo.email) {

      return "email-address";
    }

    if (tipoCampo === TipoCampo.senha) {

      return "number-pad";
    }

    return "default";
  }

  // aplicar máscara de cpf no campo
  const aplicarMascaraCpfCampo = (valor: string): string => {
    const apenasNumeros = valor.replace(/\D/g, '');

    const cpfLimitado = apenasNumeros.slice(0, 11);

    const cpf: string = cpfLimitado
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2');

    return cpf;
  }

  // aplicar uma máscara no campo de cep
  const aplicarMascaraCepCampo = (valor: string): string => {
    const apenasNumeros = valor.replace(/\D/g, '');

    const cepLimitado = apenasNumeros.slice(0, 8);

    return cepLimitado.replace(/(\d{5})(\d)/, '$1-$2');
  }

  // aplicar uma máscara no campo de telefone
  const aplicarMascaraTelefoneCampo = (valor: string): string => {
    const apenasNumeros = valor.replace(/\D/g, '');

    const numeroLimitado = apenasNumeros.slice(0, 11);

    return numeroLimitado
      .replace(/^(\d{2})(\d)/g, '($1) $2')
      .replace(/(\d{5})(\d)/, '$1-$2');
  }

  // aplicar mascara no campo de data de nascimento
  const aplicarMascaraDataNascimentoCampo = (valor: string): string => {
    const apenasNumeros = valor.replace(/\D/g, '');

    const dataLimitada = apenasNumeros.slice(0, 8);

    return dataLimitada
      .replace(/(\d{2})(\d)/, '$1/$2')
      .replace(/(\d{2})(\d)/, '$1/$2');
  }

  if (tipoCampo === TipoCampo.multiploSeletorEndereco || tipoCampo === TipoCampo.multiploSeletorGenero) {

    return <View style={ styles.containerCampo }>
      <View style={ {
        backgroundColor: config.cores.find(c => c.nomeCor === "branco")?.cor ?? "#fff",
        padding: 10,
        borderRadius: 12,
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: config.cores.find(c => c.nomeCor === "borda")?.cor ?? "#000",
        elevation: 3,
        flexDirection: "row",
        alignItems: "center"
      } }>
        { getIcone() }
        <Picker style={ { flex: 1, marginStart: 5 } } selectedValue={ valor } onValueChange={ (valorSelecionado: string) => {
          
          if (onSelecionarOpcao) {
            onSelecionarOpcao(valorSelecionado);
          }

        } }>
          { opcoes?.map((op) => {

            return <Picker.Item label={ op.label } value={ op.valor } key={ op.key } />
          }) }
        </Picker>
      </View>
    </View>
  }

  return <View style={ styles.containerCampo }>
    <View style={ styles.campo }>
      { tipoCampo != TipoCampo.telefone && getIcone() }
      { tipoCampo === TipoCampo.telefone ? <View style={ styles.containerCampoTelefone }>
        <Image style={ styles.iconeBandeira } source={ require("@/assets/images/icone_bandeira_brasil.png") } />
        <Text style={ styles.txtDddTelefone }>+55</Text>
      </View> : false }
      <TextInput
        style={ styles.textInputCampo }
        value={ valor }
        placeholder={ label }
        secureTextEntry={ tipoCampo === TipoCampo.senha && !senhaVisivel }
        onChangeText={ (valorDigitado: string) => {
          
          if (alterarValor) {

            if (tipoCampo === TipoCampo.cpf) {
              alterarValor(aplicarMascaraCpfCampo(valorDigitado));

              return;
            }

            if (tipoCampo === TipoCampo.cep) {
              alterarValor(aplicarMascaraCepCampo(valorDigitado));
              
              return;
            }

            if (tipoCampo === TipoCampo.telefone) {
              alterarValor(aplicarMascaraTelefoneCampo(valorDigitado));

              return;
            }

            if (tipoCampo === TipoCampo.data) {
              alterarValor(aplicarMascaraDataNascimentoCampo(valorDigitado));

              return;
            }

            alterarValor(valorDigitado);
          }

        } }
        underlineColorAndroid={ undefined }
        inputMode={ getModoTecladoCampo() }
        keyboardType={ getTipoCampo() } />
      { tipoCampo === TipoCampo.senha && <TouchableOpacity onPress={ () => {
        onVisualizarSenha();
      } } >
        { senhaVisivel ? 
        <AntDesign name="eye-invisible" size={ 24 } color={ config.cores.find(c => c.nomeCor === "texto")?.cor ?? "#000" } /> : 
        <Feather name="eye" size={ 24 } color={ config.cores.find(c => c.nomeCor === "texto")?.cor ?? "#000" } /> }
      </TouchableOpacity> }
      { tipoCampo === TipoCampo.cep && <TouchableOpacity onPress={ onConsultarEnderecoPeloCep }>
        <Feather name="search" size={ 30 } color={
          config.cores.find(c => c.nomeCor === "primaria")?.cor ?? "#000"
        } />
      </TouchableOpacity> }
    </View>
    { erro && <Text style={ styles.erro }>{ erro }</Text> }
  </View>
}

export default Campo;