import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import colors from "../Main/Shop/config/colors";
import SPACING from "../Main/Shop/config/SPACING";
export default class ChangeInfo extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }

    }
    quayLai = () => {
        this.props.navigation.goBack()
    }
    render() {
        return (
            <View style={{ backgroundColor: 'black', flex: 1 }}>
                <Text style={styles.sub_title}>
                    Thay đổi thông tin
                </Text>
                <TouchableOpacity onPress={() => this.quayLai()}>
                    <Text style={styles.btnquayLai}> Quay lại</Text>
                </TouchableOpacity>

            </View>
        );
    }

}
const styles = StyleSheet.create({
    sub_title: {
        color: colors.white,
        fontSize: SPACING * 2,
        alignContent: "center",
        fontWeight: "600",
        paddingTop: 40,
    },
    btnquayLai:{
        borderRadius: 5,
    paddingHorizontal: 70,
    fontSize: 30,
    color: colors.white
    }
})