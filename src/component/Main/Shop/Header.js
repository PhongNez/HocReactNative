import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Dimensions, Image } from 'react-native';
import icMenu from '../../../public/appIcon/ic_menu.png'
import icLogo from '../../../public/appIcon/icon_coffee.png'
import { TextInput } from 'react-native-gesture-handler';
const windowHeight = Dimensions.get('window').height;
export default class Header extends Component {


    onpenMenu = () => {
        this.props.open();
    }

    render() {
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
    textStyle: { fontSize: 25, fontFamily: 'Avenir', color: '#fff', }
})