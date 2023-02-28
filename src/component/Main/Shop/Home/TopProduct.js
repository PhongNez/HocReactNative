import React, { Component } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import sp1 from '../../../../public/temp/sp1.jpeg'
import { addCart, getProduct } from '../../../api/userServices'
import getToken from "../../../../global/getToken";

export default class TopProduct extends Component {

    constructor(props) {
        super(props)
        this.state = {
            arr: []
        }
    }

    async componentDidMount() {
        let response = await getProduct()
        this.setState({
            arr: response.dataProduct
        })
        console.log('Danh sach san pham', response);
    }

    handleAddGioHang = async () => {
        let token = await getToken()
        console.log('Token: ', token);
        //let response = await handleGetAllUser('ALL');
        //let response = await handleGetAllUserShop()
        let response = await addCart(token, 1, 2)
        console.log(response);
    }

    render() {
        const { container, titleContainer, body, productContainer } = styles
        let arrProduct = this.state.arr
        return (
            <View style={container}>
                <View style={titleContainer}>
                    <Text>TOP PRODUCT</Text>
                </View>
                <View style={body}>
                    {

                        arrProduct && arrProduct.map((item, index) => {
                            return (
                                // <tr key={index}>

                                //     <td><img src={item.image} alt="" height={50} width={50} /></td>

                                //     <td>{item.name}</td>
                                //     <td>{item.phone}</td>
                                //     <td>{item.email}</td>
                                //     <td>{item.address}</td>

                                //     <td>
                                //         <button className='btn-edit'><i className="fas fa-pencil-alt"></i> </button>
                                //         <button className='btn-delete'><i className="fas fa-trash"></i></button>
                                //     </td>

                                // </tr>
                                //  <View style={body}>
                                <View style={productContainer}>
                                    <Image source={sp1} style={{ height: 200, width: 147 }}></Image>
                                    <Text>{item.name}</Text>
                                    <Text>{item.price}</Text>
                                    <Text>{item.detail}</Text>
                                    <TouchableOpacity onPress={() => this.handleAddGioHang()}>
                                        <Text>Buy</Text></TouchableOpacity>
                                </View>
                            )
                        })
                    }</View>
                <View style={body}>
                    <View style={productContainer}>
                        <Image source={sp1} style={{ height: 200, width: 147 }}></Image>
                        <Text>Product name</Text>
                        <TouchableOpacity onPress={() => this.handleAddGioHang()}>
                            <Text>Buy</Text></TouchableOpacity>
                    </View>
                    <View style={productContainer}>
                        <Image source={sp1} style={{ height: 200, width: 147 }}></Image>
                        <Text>Product name</Text>
                        <Text>200$</Text>
                    </View>
                    <View style={productContainer}>
                        <Image source={sp1} style={{ height: 200, width: 147 }}></Image>
                        <Text>Product name</Text>
                        <Text>200$</Text>
                    </View>
                    <View style={productContainer}>
                        <Image source={sp1} style={{ height: 200, width: 147 }}></Image>
                        <Text>Product name</Text>
                        <Text>200$</Text>
                    </View>
                </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff', margin: 10
    },
    titleContainer: {
        height: 50, justifyContent: 'center', paddingLeft: 10,
        shadowColor: '#2E272B',
        shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.2
    },
    body: { flexDirection: 'row', justifyContent: 'space-around', flexWrap: 'wrap' },
    productContainer: {
        borderWidth: 1,
        width: 150, shadowColor: '#2E272B',
        shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.2,
        marginBottom: 10
    },

})