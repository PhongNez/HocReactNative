import React, { Component } from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
// import Input from "./Input";


import userServices from "../api/userServices";
import global from "../../global/global";
import saveToken from "../../global/saveToken";
import { connect } from "react-redux";

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }

  onSignIn = async () => {
    console.log("Thử");
    const { email, password } = this.state;
    let data = await userServices.signIn(email, password);
    console.log(data);
    console.log("data:", data.userData);
    await saveToken(data.userData);
    global.onSignIn(data);
    console.log(data);
    this.props.diDenMain();
  };

  render() {
    const { email, password } = this.state;
    console.log("Thí props: ", this.props);
    return (
      <SafeAreaView style={styles.main}>
        <View style={styles.container}>
          <Image
            source={{
              uri: `https://aeonmall-haiphong-lechan.com.vn/wp-content/uploads/2021/01/resize-highlands-1000x625-3.jpg`,
            }}
            style={styles.logo}
          ></Image>
          <View style={styles.wFull}>
            <View style={styles.row}>
              <Text style={styles.brandName}>Đăng Nhập</Text>
            </View>

            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={(text) => this.setState({ email: text })}
            ></TextInput>
            <TextInput
              style={styles.input}
              placeholder="Mật Khẩu"
              value={password}
              onChangeText={(text) => this.setState({ password: text })}
            ></TextInput>

            {/* <Input placeHolder={"Email"} />

            <Input placeHolder={"Mật Khẩu"} /> */}

            <View style={styles.loginBtnWrapper}>
              <TouchableOpacity
                // onPress={() => navigation.navigate()}
                onPress={() => this.onSignIn()}
                activeOpacity={0.7}
                style={styles.loginBtn}
              >
                <Text style={styles.loginText}>Đăng Nhập</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              //   onPress={() => navigation.navigate()}
              style={styles.forgotPassBtn}
            >
              <Text style={styles.forgotPassText}>Quên Mật Khẩu?</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}> Bạn Chưa Có Tài Khoản? </Text>
            <TouchableOpacity onPress={() => this.props.reduxState.history.push("SIGN_UP")}>
              <Text style={styles.signupBtn}>Đăng Ký</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
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

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  container: {
    padding: 15,
    width: "100%",
    position: "relative",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    height: 130,
    width: 130,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    marginBottom: 16,
    marginTop: -80,
  },
  brandName: {
    fontSize: 40,
    textAlign: "center",
    fontWeight: "bold",
    color: "#1F41BB",
    opacity: 0.9,
    // marginTop: -10,
  },
  loginContinueTxt: {
    fontSize: 21,
    textAlign: "center",
    color: "#666666",
    marginBottom: 16,
    fontWeight: "bold",
  },
  input: {
    backgroundColor: "#f1f4ff",
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 15,
    marginVertical: 10,
    borderRadius: 5,
    height: 55,
    paddingVertical: 0,
  },

  loginBtnWrapper: {
    height: 55,
    marginTop: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 5,
  },

  loginBtn: {
    backgroundColor: "#1F41BB",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: 55,
    borderRadius: 10,
    shadowColor: "#1F41BB",
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  loginText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
  forgotPassText: {
    color: "#1F41BB",
    textAlign: "center",
    fontWeight: "bold",
    marginTop: 24,
  },

  footer: {
    position: "absolute",
    bottom: 20,
    textAlign: "center",
    flexDirection: "row",
  },
  footerText: {
    color: "#666666",
    fontWeight: "bold",
  },
  signupBtn: {
    color: "#1F41BB",
    fontWeight: "bold",
    textDecorationLine: "underline",
  },

  wFull: {
    width: "100%",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
});
