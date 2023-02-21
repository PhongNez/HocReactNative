import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, SafeAreaView, Image } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './Home';
import Detail from './Detail';
import React, { Component } from 'react';
import axios from 'axios'

const Stack = createStackNavigator();

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'Firstd  Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Phong',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
];

const Item = ({ firstName, lastName, image }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{firstName}</Text>
    <Text style={styles.title}>{lastName}</Text>
    <Image style={{ height: 100, width: 100 }} source={{ uri: image }}></Image>
  </View>
);
// const Item = ({ title }) => (
//   <View style={styles.item}>
//     <Text style={styles.title}>{title}</Text>
//   </View>
// );
export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      arr: []
    }

  }
  async componentDidMount() {
    let res = await axios.get(`http://192.168.1.6:8080/api/get-all-user?id=${'ALL'}`);
    this.setState({
      arr: res.data.user
    })
    console.log(res.data.user);
  }

  // renderItem1 = ({ title }) => {
  //   return (
  //     <View style={styles.item}>
  //       <Text style={styles.title}>{title}</Text>
  //       <Image style={{ height: 100, width: 100 }} source={{ uri: 'http://192.168.1.6:8080/image/image-1675997764862.jpg' }}></Image>
  //     </View>
  //   )
  // }

  render() {
    let arr = this.state.arr;
    console.log('Check arr: ', arr);
    return (
      // <View style={styles.container}>
      //   <Text>Open up App.js to start working on your a!</Text>
      //   <StatusBar style="auto" />
      // </View>
      // <NavigationContainer>
      //   <Stack.Navigator>
      //     <Stack.Screen name="Home" component={Home}></Stack.Screen>
      //     <Stack.Screen name="Detail" component={Home}></Stack.Screen>
      //   </Stack.Navigator>
      // </NavigationContainer>

      <SafeAreaView>
        <FlatList
          data={arr}
          renderItem={({ item }) => <Item firstName={item.firstName} lastName={item.lastName} image={item.image} />}
          keyExtractor={item => item.id}
        />
      </SafeAreaView>
    );
  }

}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderWidth: 3
  },
  title: {
    fontSize: 32,
  },
})