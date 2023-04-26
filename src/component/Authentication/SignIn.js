import React, { Component } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Dimensions } from 'react-native'
import userServices from '../api/userServices'
import global from "../../global/global";
import saveToken from '../../global/saveToken'

export default class SignIn extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: ''
        }
    }

    onSignIn = async () => {
        console.log('Thử');
        const { email, password } = this.state;
        let data = await userServices.signIn(email, password)
        console.log(data);
        console.log('data:', data.userData);
        await saveToken(data.userData)
        global.onSignIn(data)
        console.log(data);
        this.props.diDenMain()

    }

    render() {
        // const { wrapper } = style
        const DEVICE_WIDTH = Dimensions.get('window').width;
        const DEVICE_HEIGHT = Dimensions.get('window').height;

        const { email, password } = this.state;
        return (
            <View style={style.container}>

                <Text style={style.title}>Đăng nhập / Đăng ký</Text>

                <View style={{ height: 45,width:DEVICE_WIDTH-40, backgroundColor: '#fff', margin: 10, borderBottomColor: "black", borderBottomWidth: "1" }}>
                    <TextInput placeholder='Email' value={email} onChangeText={text => this.setState({ email: text })}></TextInput>
                </View>
                <View style={{ height: 45,width:DEVICE_WIDTH-40, backgroundColor: '#fff', margin: 10, borderBottomColor: "black", borderBottomWidth: "1" }}>
                    <TextInput placeholder='Password' value={password} onChangeText={text => this.setState({ password: text })}></TextInput>
                </View>

                <TouchableOpacity style={{ marginTop: 20, marginLeft: 14, padding: 0, height: 50, width: 150, backgroundColor: "#rgba(0,145,234,1)", justifyContent: 'center', alignItems: 'center', borderRadius: 20 }}
                    onPress={() => this.onSignIn()}
                >
                    <Text >Đăng nhập</Text>
                </TouchableOpacity>
            </View>
        )
    }
}
const DEVICE_HEIGHT = Dimensions.get('window').height;

const style = StyleSheet.create({
    container: {
        height: DEVICE_HEIGHT ,
        // marginTop: 200,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 35,
        color: 'red',
    },
})