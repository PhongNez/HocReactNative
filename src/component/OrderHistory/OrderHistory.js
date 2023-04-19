import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
class OrderHistory extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }

    }

    quayLai = () => {
        this.props.navigation.goBack()
    }

    render() {
        console.log(this.props.reduxState);
        return (
            <View style={{ backgroundColor: 'yellow', flex: 1 }}>
                <Text>Hello Tân OrderHistory</Text>
                <TouchableOpacity
                    onPress={() => this.quayLai()}>
                    <Text>Go to back</Text>
                </TouchableOpacity>
            </View>

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

export default connect(mapStateToProps, mapDispatchToProps)(OrderHistory)