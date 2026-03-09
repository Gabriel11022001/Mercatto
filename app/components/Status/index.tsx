import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';
import { StyleSheet, Text, View } from "react-native";

export enum StatusItem {

  ativo,
  inativo

}

type Props = {

  status: StatusItem;

}

const Status = ({ status }: Props) => {

  return (
    <View style={ styles.status }>
      { status === StatusItem.inativo ? 
        <Entypo name="block" size={ 24 } color="red" /> : 
        <AntDesign name="check-circle" size={ 24 } color="green" /> }
      <Text style={ status === StatusItem.ativo ? styles.ativo : styles.inativo }>{ status === StatusItem.ativo ? "Ativo" : "Inativo" }</Text>
    </View>
  );
}

const styles = StyleSheet.create({

  status: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10
  },
  ativo: {
    color: "green",
    marginStart: 7,
    fontSize: 16
  },
  inativo: {
    color: "red",
    marginStart: 7,
    fontSize: 16
  }

});

export default Status;