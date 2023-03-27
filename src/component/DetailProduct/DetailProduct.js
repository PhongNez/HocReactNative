import axios from 'axios';
import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import global from '../../global/global';

export default class DetailProduct extends Component {
    constructor(props) {
        super(props)
        this.state = {
            idproduct: ''
        }
        global.id_product = (id_product) => {
            this.setState({
                idproduct: id_product
            }, console.log(id_product))
        }

    }

    async componentDidMount() {
        global.id_product = (id_product1) => {
            this.setState({
                idproduct: id_product1
            }, console.log(id_product1))
        }
        console.log('this.state.id_product', this.state.idproduct);
        let response = await axios.get(`http://192.168.225.135:8081/api/v1/chiTiet?id=${this.state.idproduct}`)
        console.log('Chi tiết sản phẩm:', response.data);
    }

    quayLai = () => {
        this.props.navigation.goBack()
    }

    render() {
        return (
            <View style={{ backgroundColor: 'yellow', flex: 1 }}>
                <Text>Hello Tân Chi tiết</Text>
                <TouchableOpacity
                    onPress={() => this.quayLai()}>
                    <Text>Go to back</Text>
                </TouchableOpacity>
            </View>

        );
    }

}