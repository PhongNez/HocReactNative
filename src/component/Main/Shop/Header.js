import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Dimensions, Image } from 'react-native';
import icMenu from '../../../public/appIcon/ic_menu.png'
import icLogo from '../../../public/appIcon/icon_coffee.png'
import { TextInput } from 'react-native-gesture-handler';
import axios from 'axios';
const windowHeight = Dimensions.get('window').height;

import global from '../../../global/global';
export default class Header extends Component {
    constructor(props) {
        super(props)
        this.state = {
            textSearch: ''
        }
    }

    onpenMenu = () => {
        this.props.open();
    }

    onSearch = async () => {
        //console.log('Phong');
        let data = { name: 1 }
        let res = await axios.post('http://192.168.225.135:8081/api/v1/search', { name: this.state.textSearch }
        );
        console.log('Search: ', res.data);
        global.setArrSearch(res.data.message)

    }

    render() {
        console.log(this.state.textSearch);
        const { wrapper, row1, textInput, iconStyle, textStyle } = style
        return (
            <View style={wrapper}>
                <View style={row1}>
                    <TouchableOpacity
                        onPress={() => this.onpenMenu()}
                    >
                        <Image source={icMenu} style={iconStyle}></Image>
                    </TouchableOpacity>
                    <Text style={textStyle}

                    >Cà phê</Text>
                    <Image source={icLogo} style={iconStyle}></Image>

                </View>
                <TextInput style={textInput}
                    placeholder="Bạn muốn dùng món gì??"
                    value={this.state.textSearch}
                    onChangeText={text => this.setState({
                        textSearch: text
                    })}
                    onSubmitEditing={() => this.onSearch()}
                />
            </View>
        );
    }

}

const style = StyleSheet.create({
    wrapper: { height: windowHeight / 7, backgroundColor: '#02be6e', padding: 5, justifyContent: 'space-around' },// 
    row1: { flexDirection: 'row', justifyContent: 'space-between', },
    textInput: { height: windowHeight / 20, backgroundColor: '#ffffff', },// marginTop: 10
    iconStyle: { height: 30, width: 30 },
    textStyle: { fontSize: 25, color: '#fff', }
})