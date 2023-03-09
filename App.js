import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, Button, Alert, ScrollView } from 'react-native';
import axios from 'axios';

export default function App() {

  const [name, setName] = useState('');
  const [cats, setcats] = useState([])
  const [amoutCat, setAmoutCat] = useState(0)

  const getCat = async (name) => {
    const catApi = (await axios.get("https://api.thecatapi.com/v1/images/search")).data
    const imgCat = await catApi[0].url
    const nameCat = await name
    console.log(name)
    const cat = await {
      img: imgCat,
      name: nameCat
    }
    setcats([...cats, cat])
    setAmoutCat(amoutCat + 1)
    setName('')
  }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          style={styles.img}
          source={{ uri: "https://www.pngmart.com/files/15/Face-Cat-Vector-PNG-Photos.png" }}
        />
        <Text style={styles.text}>Love <Text style={styles.span}>Cats</Text></Text>
      </View>
      <View style={styles.body}>
        <Text style={styles.numCat}>Numero de gatinhos adotados : {amoutCat} </Text>
        <TextInput
          style={{ width: 300, height: 40, borderWidth: 2, marginBottom: 5, textAlign: "center", borderRadius: 20, }}
          placeholder='Dê um nome para seu novo gatinho =)'
          value={name}
          onChangeText={setName}
        />
        <View style={styles.button}>
          <Button
            title='Adotar gatinho'
            onPress={ () => {
              if(name.length <= 0){
                Alert.alert("O gatinho precisa de um nome antes de ser adotado")
                return
              }
              getCat(name)
            }}
          />
        </View>
        <View style={styles.button}>
          <Button
            title='Limpar Lista'
            onPress={async () => {
              setcats([])
              setAmoutCat(0)
            }}
          />
        </View>
        <ScrollView>
          <View style={styles.list}>
            {cats.map((cat, index) => (
              <View key={index} style={styles.card}>
                <Image
                  style={{ width: 300, height: 300 }}
                  source={{ uri: cat.img }}
                />
                <Text style={{ fontSize: 25, textAlign: "center" }}>Nome : {cat.name}</Text>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "auto",
    flex: 1,
    flexDirection: 'column',
    backgroundColor: "white",
    alignItems: 'center',
    backgroundColor: "#f2f2f2"
  },
  img: {
    marginRight: 30,
    width: 150,
    height: 150,
  },
  span: {
    color: "red",
  },
  header: {
    alignItems: "center",
    flex: 1,
    flexDirection: 'row',
    with: "auto",
  },
  text: {
    fontWeight: "700",
    textAlign: 'center',
    fontSize: 35
  },
  body: {
    alignItems: "center",
    marginTop: 20,
    flex: 4.5,
  },
  list: {
    flex: 1
  },
  card: {
    padding: 10,
    margin: 5,
    borderWidth: 8,
    borderColor: "#1a53ff",
    borderRadius: 30,
  },
  numCat: {
    textAlign: "center",
    fontSize: 20,
    margin: 10,
    fontWeight: 700,
  },
  button: {
    margin: 5,
    width: 200,
  }
});
