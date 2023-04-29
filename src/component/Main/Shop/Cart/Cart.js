import React, { Component } from "react";
import {
  Button,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Image,
  StyleSheet,
  Dimensions,
  SafeAreaView,
} from "react-native";
import global from "../../../../global/global";
import axios from "axios";
import getToken from "../../../../global/getToken";
import { checkToken } from "../../../api/userServices";
import colors from "..//Store/colors";
import { BlurView } from "expo-blur";
import { CheckBox } from "react-native-elements";
import { MaterialIcons } from "@expo/vector-icons";
const { height, width } = Dimensions.get("window");
import { connect } from "react-redux";

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: 1,
      isChecked: false,
      checkALL: false,
      listCart: []
    };
    this.toggleCheckbox = this.toggleCheckbox.bind(this);
    this.handlePress = this.handlePress.bind(this);
  }

  toggleCheckbox(id_product) {
    this.setState({ isChecked: !this.state.isChecked });
  }
  handlePress = () => {
    // this.setState((prevState) => ({
    //   checkALL: !prevState.checkALL,
    // }));
    // let listCart = this.state.listCart
    let copyState = { ...this.state }
    if (this.state.checkALL == false) {
      for (let i = 0; i < this.props.reduxState.arrGioHang.length; i++) {
        copyState['checked' + i] = true;
      }

      this.setState({
        ...copyState,
        checkALL: true
      }, () => console.log('Check: ', this.state))
    }
    else {
      for (let i = 0; i < this.props.reduxState.arrGioHang.length; i++) {
        copyState['checked' + i] = false;
      }
      this.setState({
        ...copyState,
        checkALL: false
      }, () => console.log('Check: ', this.state))
    }
    // if (!copyState['checked' + index]) {
    //   copyState['checked' + index] = true;
    //   // listCart.push(item)
    // }
    // else {
    //   copyState['checked' + index] = false;
    // const id = listCart.indexOf(item);
    // if (id > -1) { // only splice array when item is found
    //   listCart.splice(id, 1); // 2nd parameter means remove one item only
    // }
    //}


  }

  async componentDidMount() {
    let token = await getToken();
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    global.setTabBarBadge(this.props.reduxState.arrGioHang.length);
    let cart = await axios.post("http://192.168.134.135:8081/api/v1/account");
    console.log(cart.data);
    this.props.arrGioHang(cart.data.list)
  }

  addCart = async () => {
    let token = await getToken();
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    let response = await axios.post(
      "http://192.168.134.135:8081/api/v1/product/2"
    );
    console.log("Check token add cart:", response);
  };

  deleteCart = async (id_product, size) => {
    let token = await getToken();
    // let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF9hY2NvdW50IjoxLCJlbWFpbCI6ImFkbWluLmZvb2RvcmRlckBnbWFpbC5jb20iLCJwaG9uZSI6IjAzMjEiLCJuYW1lIjoiS2ltIMSQ4bqhaSBQaG9uZyIsImNyZWF0ZWRfdGltZSI6IjIwMjItMDktMjFUMDU6MTI6MjYuMDAwWiIsImFkZHJlc3MiOiI1MiIsImF2YXRhciI6IicnIiwic3RhdHVzIjowLCJyb2xlIjoxLCJpYXQiOjE2Nzc3NDIzMjZ9.cVxNo4bTJq2zKQomgAlFFKHbfjCZ9y5Vm4zmcavUC3k'
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    //let response = await handleGetAllUser('ALL');
    //let response = await handleGetAllUserShop()
    // let response = await axios.get('http://192.168.134.135:8081/api/v1/admin/account')
    console.log("Size: ", size);
    let response = await axios.delete(
      `http://192.168.134.135:8081/api/v1/product/${id_product}`, { data: { size } }
    );
    console.log(response);
    let cart = await axios.post("http://192.168.134.135:8081/api/v1/account");
    console.log("CArt", cart.data);
    if (cart && cart.data && cart.data.list) {
      // global.setArrCart(cart.data.list);
      this.props.arrGioHang(cart.data.list);

      console.log("CArt hien thi: ", cart.data.list.length);
      global.setTabBarBadge(cart.data.list.length);
    } else {
      // global.setArrCart([]);
      this.props.arrGioHang([]);
      global.setTabBarBadge(0);
    }
    this.setState({
      num: this.state.num + 1,
    });
    // console.log(cart.data.list);
    // global.setArrCart(listCart)
  };

  handleIncrement = async (id_product, quantity1, size1) => {
    console.log(quantity1, size1);



    let response = await axios.put(
      `http://192.168.134.135:8081/api/v1/account/tangSoLuongCart/${id_product}`, { data: { quantity: quantity1, size: size1 } }
    );
    let cart = await axios.post("http://192.168.134.135:8081/api/v1/account");
    this.props.arrGioHang(cart.data.list)
    console.log(response);
  };

  handleDecrement = async (id_product, quantity1, size1) => {
    console.log(quantity1, size1);
    if (quantity1 > 1) {
      let response = await axios.put(
        `http://192.168.134.135:8081/api/v1/account/giamSoLuongCart/${id_product}`, { data: { quantity: quantity1, size: size1 } }
      );
      let cart = await axios.post("http://192.168.134.135:8081/api/v1/account");
      this.props.arrGioHang(cart.data.list)
      console.log(response);
    }
  };

  xemDon = async () => {
    let token = await getToken();
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    let response = await axios.get(`http://192.168.134.135:8081/api/v1/order`);
    console.log(response.data);
  };

  datHang = async () => {
    let token = await getToken();
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    let response = await axios.post(`http://192.168.134.135:8081/api/v1/pay`);
    console.log(response.data);
  };

  handleCheckBox = (index, item) => {
    let listCart = this.state.listCart
    let copyState = { ...this.state }
    if (!copyState['checked' + index]) {
      copyState['checked' + index] = true;
      listCart.push(item)
    }
    else {
      copyState['checked' + index] = false;
      // for (let i = 0; i < listCart.length; i++) {
      //   if (listCart[i] === item) {
      //     listCart.splice[i, 1]
      //     // console.log("phong: ", listCart[i]);
      //   }
      // }
      const id = listCart.indexOf(item);
      if (id > -1) { // only splice array when item is found
        listCart.splice(id, 1); // 2nd parameter means remove one item only
      }
    }

    this.setState({
      ...copyState
    }, () => console.log('Check: ', this.state))
  }

  render() {
    let listCart = this.props.reduxState.arrGioHang
    const { quantity } = this.state;
    console.log('mang: ', this.state.listCart);
    // if (user) {
    //     console.log('Cart 2: ',);
    //     console.log('Cart 3: ',);
    // }

    return (
      <View style={{ flex: 1, backgroundColor: "#000" }}>
        <View
          style={{
            width: "100%",
            height: 60,
            flexDirection: "row",
            alignItems: "center",
            paddingLeft: 20,
            backgroundColor: "#000",
            elevation: 1,
            bottom: 15,
          }}
        >
          <Text style={{ color: "#fff", fontSize: 24, fontWeight: "600", marginTop: 10 }}>
            Giỏ hàng của bạn
          </Text>
        </View>

        <FlatList style={{ marginTop: -16, }}
          data={listCart}

          renderItem={({ item, index }) => (
            // <Image
            //   source={{ uri: `http://192.168.134.135:8081/${item.images}` }}
            //   style={{ height: 60, width: 60, alignItems: "center" }}
            // ></Image>

            <BlurView
              tint="dark"
              intensity={95}
              style={{
                width: "94%",
                alignSelf: "center",
                height: 120,
                backgroundColor: "#000",
                borderRadius: 10,
                elevation: 1,
                flexDirection: "row",
                margin: 6,
                position: "relative",
                // marginTop:-10,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  right: 14,
                  width: 36,
                }}
              >
                <CheckBox
                  style={{
                    alignSelf: "flex-start",
                  }}
                  checked={this.state['checked' + index]}

                  onPress={() => this.handleCheckBox(index, item)}
                // checked={this.state.isChecked}
                // onPress={()=>this.toggleCheckbox(item.id_product)}
                />
              </View>

              <TouchableOpacity>
                <Image
                  // source={ImageCoffee}
                  source={{
                    uri: `http://192.168.134.135:8081/image/${item.images}`,
                  }}

                  style={{
                    height: 80,
                    width: 80,
                    borderRadius: 10,
                    position: "relative",
                    top: 20,
                    // left: 2,
                    marginRight: 5,
                  }}
                />
              </TouchableOpacity>

              <View style={{ padding: 14 }}>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "700",
                    color: "#fff",
                    marginBottom: 5,
                  }}
                >
                  {item.name}
                </Text>
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: "500",
                    color: "#fff",
                    marginBottom: 12,
                  }}
                >
                  {item.price} VNĐ
                </Text>
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: "500",
                    color: "#fff",
                    marginBottom: 12,
                  }}
                >
                  Size: {item.size == 360 ? 'S' : item.size == 500 ? 'M' : 'L'}
                </Text>
                <View style={styles.container}>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => this.handleDecrement(item.id_product, item.quantity, item.size)}
                  >
                    <Text style={styles.buttonText}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.quantity}>{item.quantity}</Text>
                  {/* <Text style={styles.quantity}> {item.quantity}</Text> */}
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => this.handleIncrement(item.id_product, item.quantity, item.size)}
                  >
                    <Text style={styles.buttonText}>+</Text>
                  </TouchableOpacity>
                </View>

                <TouchableOpacity
                  onPress={() => this.deleteCart(item.id_product, item.size)}
                  style={{
                    position: "relative",
                    left: 200,
                    bottom: 70,
                  }}
                >
                  <MaterialIcons name="delete" size={30} color="#ddd" />
                </TouchableOpacity>
              </View>
            </BlurView>
          )}
          keyExtractor={(item) => item.id}
        />
        <SafeAreaView style={styles.safefoot}>
          <View style={{ flexDirection: "row", marginLeft: -10, marginTop: 10, }}>
            <CheckBox
              // title={` ${this.state.checkALL ? "Bỏ" : ""} Tất cả`}
              // checked={this.state.isChecked}
              // onPress={this.toggleCheckbox}
              checked={this.state.checkALL}
              onPress={() => this.handlePress()}
              iconType="material-community"
              checkedIcon="checkbox-marked"
              uncheckedIcon="checkbox-blank-outline"
              checkedColor="red"
            />
            <Text
              style={{
                color: "#fff",
                justifyContent: "center",
                alignItems: "center",
                marginLeft: -12,
                marginTop: 16,
              }}
            >
              Tất cả
            </Text>
          </View>

          <TouchableOpacity
            style={{
              marginTop: 14,
              marginRight: 16,
              backgroundColor: colors.primary,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 10 * 1.2,
              height: 44,
              width: 130,
            }}
          >
            <Text
              style={{
                color: colors.white,
                fontSize: 10 * 1.6,
                fontWeight: "600",
              }}
            >
              Thanh Toán
            </Text>
          </TouchableOpacity>
        </SafeAreaView>
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
    arrGioHang: (arrGioHang) =>
      dispatch({ type: "arrCart", payload: arrGioHang })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    // borderColor: "gray",
    // backgroundColor: "rgba(255, 255, 255, 0.08)",
    backgroundColor: colors["dark"],
    borderRadius: 8,
    width: 90,
    height: 35,
    borderWidth: 0,
  },
  button: {
    backgroundColor: colors.primary,
    width: 25,
    height: 25,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 15,
    color: "white",
    fontWeight: "bold",
    alignItems: "center",
    justifyContent: "center",
  },
  quantity: {
    fontSize: 17,
    fontWeight: "bold",
    color: "white",
    // fontFamily: 'Rosarivo-Regular',
    // fontStyle: 'normal'
  },
  safefoot: {
    backgroundColor: "#000",
    flexDirection: "row",
    justifyContent: "space-between",
    height: 70,
  },
});
