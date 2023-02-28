import React, { Component } from "react";
import { Text, View, TouchableOpacity, Dimensions } from 'react-native'
import { NavigationContainer } from "@react-navigation/native";
import Home from "./Home/Home";
import Contact from "./Contact/Contact";
import Search from "./Search/Search";
import Cart from "./Cart/Cart";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from 'react-native-vector-icons/Ionicons'
import Header from "./Header";

const Tab = createBottomTabNavigator();
const windowHeight = Dimensions.get('window').height;
export default class Shop extends Component {
    constructor(props) {
        super(props);
    }

    onpenMenu = () => {
        this.props.open()
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                {/* <View style={{ height: windowHeight / 7, paddingTop: 4 }}>
                    <TouchableOpacity style={{ backgroundColor: 'green', height: 30, width: 100, borderRadius: 10, alignItems: 'center' }}
                        onPress={() => this.onpenMenu()}
                    >
                        <Text style={{ top: 4.999 }}>
                            Open Menu
                        </Text>
                    </TouchableOpacity>
                </View> */}
                <Header open={this.onpenMenu} />
                {/* <NavigationContainer> */}

                <Tab.Navigator
                    screenOptions={({ route }) => ({
                        tabBarIcon: ({ focused, color, size }) => {
                            let iconName;

                            if (route.name === 'Home') {
                                iconName = focused
                                    ? 'ios-home'
                                    : 'ios-home';
                            } else if (route.name === 'Settings') {
                                iconName = focused ? 'ios-list' : 'ios-list-outline';
                            }


                            if (route.name === 'Cart') {
                                iconName = focused
                                    ? 'ios-cart-outline'
                                    : 'ios-cart-outline';
                            } else if (route.name === 'Settings') {
                                iconName = focused ? 'ios-list' : 'ios-list-outline';
                            }

                            if (route.name === 'Search') {
                                iconName = focused
                                    ? 'ios-search'
                                    : 'ios-search';
                            } else if (route.name === 'Settings') {
                                iconName = focused ? 'ios-list' : 'ios-list-outline';
                            }

                            if (route.name === 'Contact') {
                                iconName = focused
                                    ? 'ios-information-circle'
                                    : 'ios-information-circle-outline';
                            } else if (route.name === 'Settings') {
                                iconName = focused ? 'ios-list' : 'ios-list-outline';
                            }
                            // You can return any component that you like here!
                            return <Ionicons name={iconName} size={size} color={color} />;
                        },
                        tabBarActiveTintColor: '#5d6129',
                        tabBarInactiveTintColor: '#ffe2c7',
                        headerShown: false
                    })}

                >
                    <Tab.Screen name="Home" component={Home} />
                    <Tab.Screen name="Cart" component={Cart} />
                    <Tab.Screen name="Search" component={Search} />
                    <Tab.Screen name="Contact" component={Contact} />
                </Tab.Navigator>
                {/* </NavigationContainer> */}
            </View >
        )
    }

}