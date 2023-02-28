import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, AsyncStorage } from 'react-native';
import Menu from './Menu';
import Shop from './Shop/Shop';
import Drawer from 'react-native-drawer';
import global from '../../global/global';
import getToken from '../../global/getToken'
import { checkToken } from '../api/userServices'
export default class Main extends Component {
    constructor(props) {
        super(props)
    }

    async componentDidMount() {
        console.log('Phong');
        let token = await getToken()
        // let token = await AsyncStorage.getItem('@token')
        // let value = JSON.parse(token)
        console.log('token Phong va value: ', token);

        // let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF9hY2NvdW50IjoxLCJlbWFpbCI6ImFkbWluLmZvb2RvcmRlckBnbWFpbC5jb20iLCJwaG9uZSI6IjAzMjEiLCJuYW1lIjoiS2ltIMSQ4bqhaSBQaG9uZyIsImNyZWF0ZWRfdGltZSI6IjIwMjItMDktMjFUMDU6MTI6MjYuMDAwWiIsImFkZHJlc3MiOiI1MiIsImF2YXRhciI6IicnIiwic3RhdHVzIjowLCJyb2xlIjoxLCJpYXQiOjE2NzY1MzE0MzV9.Ngwuj6tqRhjZngTiHdgi5HWyHAyyd5_thccp28m-slg'
        let res = await checkToken(token)
        console.log('File MAin', res);
        global.onSignIn(res)
    }

    closeControlPanel = () => {
        this.drawer.close()
    };
    openControlPanel = () => {
        this.drawer.open()
    };

    render() {
        let { navigation } = this.props
        return (
            <Drawer
                ref={(ref) => this.drawer = ref}
                content={<Menu navigation={navigation} />}
                openDrawerOffset={0.5}//mở menu 0.4 màn hình
                tapToClose={true}//bấm để ẩn menu
            >
                <Shop open={this.openControlPanel} />
            </Drawer>
        );
    }

}