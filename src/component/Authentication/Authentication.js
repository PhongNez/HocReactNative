import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Button, AsyncStorage } from 'react-native';
import SignIn from './SignIn';
import SignUp from './SignUp';

export default class Authentication extends Component {
    constructor(props) {
        super(props)
        this.state = {
            signIn: false
        }

    }
    quayLai = async () => {
        await AsyncStorage.removeItem('@token')
        this.props.navigation.goBack()

    }

    diDenMain = () => {
        this.props.navigation.push('MAIN')
    }

    signIn = () => {
        this.setState({
            signIn: false
        })
    }

    signUp = () => {
        this.setState({
            signIn: true
        })
    }
    render() {


        const mainJSX = this.state.signIn ? <SignUp /> : <SignIn diDenMain={this.diDenMain} />
        return (
            <View style={{ backgroundColor: "#f5fcff", justifyContent:'center',alignContent:'center' }}>
                
                

                
                <TouchableOpacity style={{marginBottom:0,marginLeft:120, padding: 0, height: 50, width: 150, backgroundColor: "#rgba(0,145,234,1)", justifyContent: 'center', alignItems: 'center', borderRadius: 20}}
                    onPress={() => this.signUp()}
                >
                    <Text >Đăng ký</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{marginTop: 0, marginLeft:120, padding: 0
                , height: 50, width: 150, backgroundColor: 'none', justifyContent: 'center', alignItems: 'center'}}
                    onPress={() => this.quayLai()}>
                    <Text>Quay lại</Text>
                    
                </TouchableOpacity>
                {mainJSX}

            </View>
        );
    }

}