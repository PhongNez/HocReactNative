import axios from "axios";
import React, { Component } from "react";
import { connect } from 'react-redux';
import {
    ImageBackground,
    ScrollView,
    Dimensions,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    SafeAreaView,
} from "react-native";
import global from "../../global/global";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { BlurView } from "expo-blur";

import colors from "../Main/Shop/Store/colors";

import coffee from "../Main/Shop/Store/Coffee";
const sizes = ["S", "M", "L"];
const { height, width } = Dimensions.get("window");
import ImageCoffee from "../Main/Shop/Store/coffees/cafechoi.jpg";

class DetailProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            idproduct: "",
            size: 0,
            listProduct: [],
            giaSize: 0,
            trangthai: '',
            quantity: 0
        }
        // global.id_product = (id_product) => {
        //     this.setState(
        //         {
        //             idproduct: id_product,
        //         },
        //         console.log(id_product)
        //     );
        // };
    }

    async componentDidMount() {

        // console.log("this.state.id_product", this.props.reduxState.id_product);
        let response = await axios.get(
            `http://192.168.1.12:8081/api/v1/chiTiet?id=${this.props.reduxState.id_product}`
        );
        console.log("Chi tiết sản phẩm:", response.data);
        this.setState({
            listProduct: response.data.listProduct
        })
    }

    handleIncrement = () => {
        const { quantity } = this.state;
        this.setState({ quantity: quantity + 1 });
    };

    handleDecrement = () => {
        const { quantity } = this.state;
        if (quantity > 0) this.setState({ quantity: quantity - 1 });
    };

    quayLai = () => {
        this.props.navigation.goBack();
    };

    chonSize = (size, giaSize, trangthai) => {

        this.setState({
            size: size,
            giaSize: giaSize,
            trangthai: trangthai
        })
        console.log(this.state.size, this.state.giaSize);
    }


    render() {
        let listProduct = this.state.listProduct;
        let giaSize = this.state.giaSize;
        const quantity = this.state.quantity;
        if (listProduct[0]) { console.log(listProduct[0].detail); }


        return (
            <>
                {listProduct && listProduct[0] && <>
                    <ScrollView style={{ backgroundColor: "#000" }}>
                        <SafeAreaView>
                            <ImageBackground
                                source={{ uri: `http://192.168.1.12:8081/image/${listProduct[0].images}` }}
                                style={styles.imgbg}
                                imageStyle={{
                                    borderRadius: 10 * 3,
                                }}
                            >
                                <View style={styles.viewhd}>
                                    <TouchableOpacity
                                        style={styles.buttonhd}
                                        onPress={() => this.quayLai()}
                                    >
                                        <Ionicons
                                            name="return-up-back"
                                            color={colors["white-smoke"]}
                                            size={10 * 2.5}
                                        />
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.buttonhd}>
                                        <Ionicons
                                            name="cart"
                                            color={colors["white-smoke"]}
                                            size={10 * 2.5}
                                        />
                                    </TouchableOpacity>
                                </View>

                                <View style={styles.viewbt}>
                                    <BlurView intensity={80} tint="dark" style={styles.blurview}>
                                        <View>
                                            <Text style={styles.nametext}>
                                                {/* Cà Phê Chòi */}
                                                {listProduct[0].name}
                                            </Text>
                                            <Text style={styles.inclutext}>
                                                {/* Nhà Làm */}
                                                {listProduct[0].price + giaSize} VNĐ
                                            </Text>
                                        </View>
                                    </BlurView>
                                </View>
                            </ImageBackground>

                            <View style={styles.viewbd}>
                                <Text style={styles.destext}>Mô Tả</Text>
                                <Text numberOfLines={3} style={styles.desc}>
                                    {/* Cafe chòi là nơi uống cà phê tâm sự cho cặp đôi là những chòi lá
                                nhỏ nhỏ, xinh xinh, kín mít không ai có thể biết bên trong chòi
                                cặp đôi đang làm chuyện gì cả. */}
                                    {listProduct[0].detail}
                                </Text>
                                <View style={styles.viewsize}>
                                    <Text style={styles.sizetext}>Size</Text>
                                    <View
                                        style={{
                                            flexDirection: "row",
                                            justifyContent: "space-between",
                                        }}
                                    >
                                        <TouchableOpacity style={this.state.trangthai == 1 ? styles.activeSize : styles.buttonsize} onPress={() => this.chonSize(360, 0, 1)}>
                                            <Text style={[this.state.trangthai == 1 ? styles.activeText : styles.fonetext]}>S</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={this.state.trangthai == 2 ? styles.activeSize : styles.buttonsize} onPress={() => this.chonSize(500, 5000, 2)}>
                                            <Text style={[this.state.trangthai == 2 ? styles.activeText : styles.fonetext]}>M</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={this.state.trangthai == 3 ? styles.activeSize : styles.buttonsize} onPress={() => this.chonSize(700, 10000, 3)}>
                                            <Text style={[this.state.trangthai == 3 ? styles.activeText : styles.fonetext]}>L</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                {/* SỐ LƯỢNG */}
                                <Text style={styles.sizetext}>Số Lượng</Text>
                                <View style={styles.container}>
                                    <TouchableOpacity
                                        style={styles.button}
                                        onPress={this.handleDecrement}
                                    >
                                        <Text style={styles.buttonText}>-</Text>
                                    </TouchableOpacity>
                                    <Text style={styles.quantity}>{quantity}</Text>
                                    <TouchableOpacity
                                        style={styles.button}
                                        onPress={this.handleIncrement}
                                    >
                                        <Text style={styles.buttonText}>+</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </SafeAreaView>
                    </ScrollView>
                    <SafeAreaView style={styles.safefoot}>
                        <View
                            style={{
                                padding: 10,
                                alignItems: "center",
                                justifyContent: "center",
                                paddingLeft: 10 * 3,
                            }}
                        >
                            <View style={{ flexDirection: "row" }}>
                                <FontAwesome5
                                    name="cart-plus"
                                    color={colors["white-smoke"]}
                                    size={10 * 2}
                                />
                            </View>
                            <Text style={{ color: colors.white, fontSize: 10 * 2 }}>
                                Giỏ Hàng
                            </Text>
                        </View>
                        <TouchableOpacity
                            style={{
                                marginRight: 10,
                                backgroundColor: colors.primary,
                                width: width / 2 + 10 * 1,
                                justifyContent: "center",
                                alignItems: "center",
                                borderRadius: 10 * 2,
                            }}
                        >
                            <Text
                                style={{
                                    color: colors.white,
                                    fontSize: 10 * 2,
                                    fontWeight: "700",
                                }}
                            >
                                Buy Now
                            </Text>
                        </TouchableOpacity>
                    </SafeAreaView></>}
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        reduxState: state
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        product: (id_product) => dispatch({ type: 'id_product', payload: id_product })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailProduct)


const styles = StyleSheet.create({
    imgbg: {
        height: height / 2.5 + 10 * 2,
        justifyContent: "space-between",
    },
    viewhd: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 10 * 2,
        paddingTop: 35,
    },
    buttonhd: {
        backgroundColor: colors.dark,
        padding: 10,
        borderRadius: 10 * 1.5,
        position: "relative",
        top: -12,
    },
    viewbt: {
        borderRadius: 10 * 3,
        overflow: "hidden",
    },
    blurview: {
        padding: 10 * 2,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    nametext: {
        fontSize: 10 * 2,
        color: colors.white,
        fontWeight: "600",
        marginBottom: 10,
    },
    inclutext: {
        fontSize: 10 * 1.8,
        color: colors["white-smoke"],
        fontWeight: "500",
        marginBottom: 10,
    },
    viewbd: {
        padding: 10,
    },
    destext: {
        color: colors["white-smoke"],
        fontSize: 10 * 1.7,
        marginBottom: 10,
        marginTop: 10,
    },
    desc: {
        color: colors.white,
        marginBottom: 10,
    },
    viewsize: {
        marginVertical: 10 * 0.8,
    },
    activeSize: {
        borderColor: colors.primary,
        backgroundColor: colors.dark,
        borderWidth: 2,
        paddingVertical: 10 / 2,
        borderRadius: 10,
        width: width / 3 - 10 * 2,
        alignItems: "center",
    },
    activeText: {
        fontSize: 10 * 1.9,
        color: colors.primary,
    },
    sizetext: {
        color: colors["white-smoke"],
        fontSize: 10 * 1.7,
        marginTop: 10,
        marginBottom: 10,
    },
    buttonsize: {
        borderWidth: 2,
        paddingVertical: 10 / 2,
        borderRadius: 10,
        backgroundColor: colors["dark-light"],
        width: width / 3 - 10 * 2,
        alignItems: "center",
    },
    fonetext: {
        color: colors["white-smoke"],
        fontSize: 10 * 1.9,
    },
    safefoot: {
        backgroundColor: "#000",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    viewgh: {
        padding: 10,
        alignItems: "center",
        justifyContent: "center",
        paddingLeft: 10 * 5,
    },
    container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        // borderColor: "gray",
        backgroundColor: 'rgba(255, 255, 255, 0.08)',
        borderRadius: 8,
        padding: 5,
        width: 123,
        height: 50,
        borderWidth: 0,

    },
    button: {
        backgroundColor: "#ccc",
        width: 35,
        height: 35,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 8,
    },
    buttonText: {
        fontSize: 20,
        color: "white",
        fontWeight: "bold",
    },
    quantity: {
        fontSize: 20,
        fontWeight: "bold",
        color: "white",
        // fontFamily: 'Rosarivo-Regular', 
        // fontStyle: 'normal'
    },
});