import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  Image,
  TextInput,
  ToastAndroid,
} from "react-native";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { connect } from "react-redux";
import axios from "axios";

class EnterOTP extends Component {
  constructor(props) {
    super(props);
    this.state = {
      maXacNhan: "",
    };
  }
  quayLai = () => {
    this.props.navigation.goBack();
  };

  goBackHome = () => {
    this.props.navigation.popToTop();
  };

  handleMaXacNhan = async () => {
    const { maXacNhan } = this.state;
    const id_account = this.props.reduxState.id_account;
    console.log("Phong:", id_account, maXacNhan);
    let res = await axios.post(
      `http://192.168.63.6:8081/api/v1/confirm/${id_account}`,
      { code: maXacNhan }
    );
    console.log(res.data);
    this.props.reduxState.history.push("RESET_PASSWORD");
  };

  goBackHome = () => {
    this.props.navigation.popToTop();
  };

  render() {
    const { maXacNhan } = this.state;
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
              <Text style={styles.brandName}>Nhập Mã Xác Nhận</Text>
            </View>

            <TextInput
              // secureTextEntry={true}
              style={styles.input}
              placeholder="Nhập Mã Xác Nhận"
              value={maXacNhan}
              onChangeText={(text) => this.setState({ maXacNhan: text })}
            ></TextInput>

            <View style={styles.loginBtnWrapper}>
              <TouchableOpacity
                // onPress={() => navigation.navigate()}
                // onPress={() => this.handleChangePassWord()}
                onPress={() => this.handleMaXacNhan()}
                activeOpacity={0.7}
                style={styles.loginBtn}
              >
                <Text style={styles.loginText}>OK</Text>
              </TouchableOpacity>
            </View>
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
    signIn: (signIn) => dispatch({ type: "signIn", payload: signIn }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EnterOTP);

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
    fontSize: 36,
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
