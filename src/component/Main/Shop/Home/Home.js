import React, { Component } from "react";
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import Collection from "./Collection";
import Category from "./Category";
import TopProduct from "./TopProduct";
export default class Home extends Component {
    render() {
        return (


            <ScrollView style={{ backgroundColor: "#dee1e6", flex: 1 }}>
                <Collection />
                <Category />
                <TopProduct />
            </ScrollView>

        )
    }

}