import React, { Component } from "react";
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native'

import CaPheDen from '../../../../../assets/Anh/CaPheDen.jpg'
import TraSuaTranChau from '../../../../../assets/Anh/TraSuaTranChau.jpg'
import SPACING from "../config/SPACING";
import TraSuaTruyenThong from '../../../../../assets/Anh/TraSuaTruyenThong.jpg'
const heightWindow = Dimensions.get("window").height;

import Swiper from "react-native-swiper";

export default class Category extends Component {

    render() {
        return (
            <View style={styles.wrapper}>
                {/* <Text>Sản phẩm bán chạy</Text> */}
                <Swiper style={styles.swipper}>
                    <Image source={CaPheDen} style={styles.Image} />
                    <Image source={TraSuaTranChau} style={styles.Image} />
                    <Image source={TraSuaTruyenThong} style={styles.Image} />
                </Swiper>
            </View>
        )

    }
}

const styles = StyleSheet.create({
    wrapper: {
        height: heightWindow / 3, 
        backgroundColor: 'none', 
        margin:35
    },
    swipper: {
        borderRadius: 10
    },
    Image: {
        height: 270, 
        width: 270,
        borderRadius:10
    }
})