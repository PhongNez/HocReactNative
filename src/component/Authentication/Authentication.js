import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Button,
  AsyncStorage,
} from "react-native";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import { connect } from "react-redux";

class Authentication extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signIn: false,
    };
  }
  // quayLai = async () => {
  //   await AsyncStorage.removeItem("@token");
  //   this.props.navigation.goBack();
  // };

  diDenMain = () => {
    this.props.navigation.popToTop();
  };

  GoToSignUp = () => {
    // this.props.navigation.push("SIGN_UP");

    this.props.reduxState.history.push("SIGN_UP");

  };

  GoToSignIn = () => {
    this.props.navigation.push("SIGN_IN");
  };

  signIn = () => {
    this.setState({
      signIn: false,
    });
  };

  signUp = () => {
    this.setState({
      signIn: true,
    });
  };
  render() {
    const mainJSX = this.state.signIn ? (
      <SignUp GoToSignIn={this.GoToSignIn} />
    ) : (
      <SignIn diDenMain={this.diDenMain} GoToSignUp={this.GoToSignUp} />
    );
    return (
      <View style={{ backgroundColor: "#fff", flex: 1 }}>
        {/* <Text>Hello from Authentication</Text> */}
        <TouchableOpacity onPress={() => this.quayLai()}>
          {/* <Text>Go to back</Text> */}
        </TouchableOpacity>

        {/* {mainJSX} */}
        <SignIn diDenMain={this.diDenMain} GoToSignUp={this.GoToSignUp} />
        {/* <SignUp GoToSignIn={this.GoToSignIn} /> */}
        {/* <TouchableOpacity
          style={{
            height: 50,
            width: 150,
            backgroundColor: "#fff",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 100,
          }}
          onPress={() => this.signIn()}
        >
          <Text>SIGN IN</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            height: 50,
            width: 150,
            backgroundColor: "#fff",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 20,
          }}
          onPress={() => this.signUp()}
        >
          <Text>SIGN UP</Text>
        </TouchableOpacity> */}
      </View>
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
      dispatch({ type: "id_product", payload: id_product })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Authentication);