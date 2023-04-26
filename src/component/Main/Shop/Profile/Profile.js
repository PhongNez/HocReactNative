import React, { Component } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Image, AsyncStorage, Button } from 'react-native'
import global from '../../../../global/global'
import getToken from '../../../../global/getToken'
import { CommonActions } from '@react-navigation/native';
import colors from "../config/colors";
import SPACING from "../config/SPACING";



export default class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: null
        }
        global.onSignIn = (user) => {
            console.log('Bên Menu');
            this.onSignIn(user)
        }

    }

    onSignIn(user) {
        this.setState({ user: user })
    }

    async onSignOut() {
        let token = await getToken()
        await AsyncStorage.removeItem('@token')
        let token1 = await getToken()
        console.log('token1:', token);
        console.log('token2:', token1);
        this.setState({ user: null })
        this.props.navigation.dispatch(
            CommonActions.reset({
                index: 1,
                routes: [
                    { name: 'MAIN' },
                    // {
                    //   name: 'Profile',
                    //   params: { user: 'jane' },
                    // },
                ],
            })
        );
    }

    gotoChangeInfo = () => {
        this.props.navigation.push('CHANGE_INFO')
    }
    gotoOderHistory = () => {
        this.props.navigation.push('ORDER_HISTORY')
    }
    gotoAuthentication = () => {
        this.props.navigation.push('AUTHENTICATION')
    }

    render() {
        const { container, profile, btnStyle, btnText, btnSignInStyle } = styles;
        const user = this.state.user;
        // if (user) {
        //     console.log(user.userInfo.name);
        // }

        const logoutJSX = (
            <View style={styles.title}>
                <Text style={styles.sub_title}>
                    Bạn cần đăng nhập để sử dụng chức năng này
                </Text>
                <TouchableOpacity onPress={() => this.gotoAuthentication()}>
                    <Text style={styles.btnStyle}> Đăng nhập</Text>
                </TouchableOpacity>
            </View >
        )

        const loginJSX = (
            <View style={{ flex: 1, alignItems: 'center' }}>
                <Text>
                    {user && user.userInfo && user.userInfo.name}
                </Text>
                <View>
                    <TouchableOpacity onPress={() => this.gotoChangeInfo()}>
                        <Text style={styles.btnInfo}>
                            Thay đổi thông tin
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.gotoOderHistory()}>
                        <Text style={styles.btnOrder}>
                            Lịch sử đơn hàng
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.onSignOut()}>
                        <Text style={styles.btnSignOut}>
                            Đăng xuất
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
        const mainJSX =
            // this.state.user
            true
                ? loginJSX : logoutJSX
        // const mainJSX = logoutJSX
        console.log('State user của Menu: ', this.state.user);
        let image = user && user.userInfo && user.userInfo.avatar
        return (
            <View style={container}>
                <Image source={{ uri: `http://192.168.96.6:8081/image/${image}` }} style={profile} />


                {mainJSX}
            </View>

        )
    }

}

const styles = StyleSheet.create({
    container: { backgroundColor: "#000", flex: 1, alignItems: 'center' },
    profile: {
        height: 150, width: 150, borderRadius: 75, backgroundColor:colors.white
    },
    title: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    sub_title: {
    color: colors.white,
    fontSize: SPACING * 1.6,
    alignContent: "center",
    fontWeight: "600",
    paddingBottom: 40,
},
    btnStyle: {
    borderRadius: 5,
    paddingHorizontal: 70,
    fontSize: 30,
    color: colors.white
},
    btnText: {
    color: '#34B089',
    fontSize: 20
},
    btnInfo:{
    borderRadius: 5,
    paddingHorizontal: 70,
    fontSize: 30,
    color: colors.white
    },
    btnOrder:{
    borderRadius: 5,
    paddingHorizontal: 70,
    fontSize: 30,
    color: colors.white
    },
    btnSignOut:{
    borderRadius: 5,
    paddingHorizontal: 70,
    fontSize: 30,
    color: colors.white
    }

//     btnSignInStyle: {
//     height: 50,
//     backgroundColor: 'white',
//     justifyContent: 'center',
//     borderRadius: 5,
//     paddingHorizontal: 70,
//     width: 200,
//     alignItems: 'center',
//     marginTop: 10
// },
})