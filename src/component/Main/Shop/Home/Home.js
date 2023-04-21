import React, { Component } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import Collection from "./Collection";
import Category from "./Category";
import TopProduct from "./TopProduct";
import { connect } from "react-redux";

class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { navigation } = this.props;
    console.log("Hello");
    console.log("Redux", this.props.reduxState);
    return (
      <ScrollView style={{ backgroundColor: "#dee1e6", flex: 1 }}>
        <Collection />
        <Category />
        {/* <TopProduct navigation={navigation} /> */}
      </ScrollView>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    reduxState: state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    product: (id_product) =>
      dispatch({ type: "id_product", payload: id_product }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
