import { FotoProduto } from "@/app/views/CadastroProduto";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useEffect, useState } from "react";
import { Image, Pressable, View } from "react-native";
import styles from "./styles";

type Props = {

  fotos: Array<FotoProduto>;

}

// carrossel apresentando as fotos dos produtos
const CarrosselFotosProduto = ({ fotos }: Props) => {

  const [ fotoAtualApresentar, setFotoAtualApresentar ] = useState<FotoProduto | null>(null);
  const [ posicaoFotoAtual, setPosicaoFotoAtual ] = useState<number>(0);

  const prosseguir = (): void => {
    let posicaoAtualFoto: number = 0;

    if (posicaoFotoAtual == fotos.length - 1) {
      posicaoAtualFoto = 0;
    } else {
      posicaoAtualFoto = posicaoFotoAtual + 1;
    }

    setPosicaoFotoAtual(posicaoAtualFoto);
    setFotoAtualApresentar(fotos[ posicaoAtualFoto ]);
  }

  const voltar = (): void => {
    let posicaoAtualFoto: number = 0;

    if (posicaoFotoAtual === 0) {
      posicaoAtualFoto = fotos.length - 1;
    } else {
      posicaoAtualFoto = posicaoFotoAtual - 1;
    }

    setPosicaoFotoAtual(posicaoAtualFoto);
    setFotoAtualApresentar(fotos[ posicaoAtualFoto ]);
  }

  useEffect(() => {

    if (fotoAtualApresentar == null && fotos.length > 0) {
      setFotoAtualApresentar(fotos[ 0 ]);
      setPosicaoFotoAtual(0);
    }

  }, []);

  if (fotos.length === 0) {

    return null;
  }

  return <View style={ styles.carrosselContainer }>
    <Image style={ styles.foto } source={ { uri: `data:image/jpeg;base64,${ fotoAtualApresentar?.foto ?? "" }` } } />
    { fotos.length > 1 && <View style={ styles.containerProgressoFotos }>
      { /** retornar para a foto anterior */ }
      <Pressable style={ [ styles.botaoControle, { marginStart: 10 } ] } onPress={ voltar }>
        <MaterialIcons name="keyboard-arrow-left" size={ 30 } color="#fff" />
      </Pressable>
      { /** prosseguir para a próxima foto */ }
      <Pressable style={ [ styles.botaoControle, { marginEnd: 10 } ] } onPress={ prosseguir }>
        <MaterialIcons name="keyboard-arrow-right" size={ 30 } color="#fff" />
      </Pressable>
    </View> }
  </View>
}

export default CarrosselFotosProduto;