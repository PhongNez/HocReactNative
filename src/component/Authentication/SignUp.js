import React, { Component } from "react";
import { View, Text, StyleSheet, Dimensions, TextInput, TouchableOpacity } from 'react-native'


const heightWindow = Dimensions.get("window").height;

export default class SignUp extends Component {

    render() {
        const { wrapper } = style
        return (
            <View>
                <View style={{ height: 50, backgroundColor: '#fff', margin: 10 }}>
                    <TextInput placeholder='Email'></TextInput>
                </View>
                <View style={{ height: 50, backgroundColor: '#fff', margin: 10 }}>
                    <TextInput placeholder='password'></TextInput>
                </View>
                <View style={{ height: 50, backgroundColor: '#fff', margin: 10 }}>
                    <TextInput placeholder='name'></TextInput>
                </View>
                <TouchableOpacity style={{ height: 50, width: 150, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center' }}>
                    <Text >SIGN UP</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const style = StyleSheet.create({
    wrapper: {
        height: heightWindow / 3, backgroundColor: '#ffffff', margin: 7
    }
})