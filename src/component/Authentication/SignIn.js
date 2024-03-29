import React, { Component } from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  ToastAndroid,
} from "react-native";
// import Input from "./Input";
import { Ionicons } from "@expo/vector-icons";

import userServices from "../api/userServices";
import global from "../../global/global";
import saveToken from "../../global/saveToken";
import checkToken from "../../component/api/userServices";
import { connect } from "react-redux";
import { MaterialIcons } from "@expo/vector-icons";
import axios from "axios";
import getToken from "../../global/getToken";

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }

  quayLai = () => {
    this.props.navigation.goBack();
  };

  goBackHome = () => {
    this.props.navigation.popToTop();
  };

  onSignIn = async () => {
    console.log("Thử");
    const { email, password } = this.state;
    let data = await userServices.signIn(email, password);
    console.log(data);
    console.log("data:", data.userData);
    await saveToken(data.userData);
    data = await userServices.checkToken(data.userData);
    global.onSignIn(data);
    this.props.signIn(data);
    console.log("Data bên signIn:", data);
    //Cart
    let token = await getToken();
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    // this.props.setTabBarBadge()
    let cart = await axios.post("http://192.168.63.6:8081/api/v1/account");
    this.props.arrGioHang(cart.data.list);
    //Cart
    // this.props.diDenMain();
    ToastAndroid.show("Đăng nhập thành công", ToastAndroid.LONG);
    this.props.reduxState.history.popToTop();
    // this.props.reduxState.history.push("MAIN");
  };

  render() {
    const { email, password } = this.state;
    console.log("Thí props: ", this.props);
    return (
      <SafeAreaView style={styles.main}>
        <View style={styles.goBack}>
          <TouchableOpacity
            style={styles.goBack}
            onPress={() => this.quayLai()}
          >
            <MaterialIcons name="chevron-left" color="#000" size={26} />
            <Text style={styles.backText}>Quay Lại</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.goBackHome}
            // onPress={() => this.props.reduxState.history.push("MAIN")}
            onPress={() => this.goBackHome()}
          >
            <Ionicons name="home" color="#000" size={26} />
          </TouchableOpacity>
        </View>

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
              secureTextEntry={true}
              style={styles.input}
              placeholder="Mật Khẩu"
              value={password}
              onChangeText={(text) => this.setState({ password: text })}
            ></TextInput>

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
              onPress={() =>
                this.props.reduxState.history.push("FORGOT_PASSWORD")
              }
              style={styles.forgotPassBtn}
            >
              <Text style={styles.forgotPassText}>Quên Mật Khẩu?</Text>
            </TouchableOpacity>

            <View style={{ marginTop: 16 }}>
              <Text style={styles.socialLogin}>Hoặc Đăng Nhập Bằng</Text>

              <View style={styles.listLogoLogin}>
                <TouchableOpacity style={styles.logoItem}>
                  <Ionicons name="logo-google" color="#1F41BB" size={20} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.logoItem}>
                  <Ionicons name="logo-facebook" color="#1F41BB" size={20} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.logoItem}>
                  <Ionicons name="logo-github" color="#1F41BB" size={20} />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}> Bạn Chưa Có Tài Khoản? </Text>
            <TouchableOpacity
              onPress={() => this.props.reduxState.history.push("SIGN_UP")}
            >
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
      dispatch({ type: "id_product", payload: id_product }),
    history: (history) => dispatch({ type: "history", payload: history }),
    arrGioHang: (arrGioHang) =>
      dispatch({ type: "arrCart", payload: arrGioHang }),
    signIn: (signIn) => dispatch({ type: "signin", payload: signIn }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);

const styles = StyleSheet.create({
  main: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    padding: 20,
  },
  goBack: {
    flexDirection: "row",
    marginLeft: -4,
  },
  backText: {
    fontSize: 18,
    marginLeft: -2,
  },
  goBackHome: {
    marginLeft: "66%",
    marginTop: -6,
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
    // marginTop: -80,
  },
  brandName: {
    fontSize: 40,
    textAlign: "center",
    fontWeight: "bold",
    color: "#1F41BB",
    opacity: 0.9,
    marginBottom: 16,
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
    marginTop: 20,
    marginBottom: 30,
  },

  socialLogin: {
    color: "#1F41BB",
    textAlign: "center",
    fontSize: 14,
    marginBottom: 10,
    fontWeight: "bold",
  },

  listLogoLogin: {
    flexDirection: "row",
    justifyContent: "center",
  },

  logoItem: {
    padding: 10,
    backgroundColor: "#ECECEC",
    borderRadius: 8,
    marginHorizontal: 6,
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
    marginBottom: 10,
  },
});
