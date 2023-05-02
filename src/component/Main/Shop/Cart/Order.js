import React, { Component } from "react";
import { SafeAreaView, ScrollView } from "react-native";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  Image,
} from "react-native";
import {
  Ionicons,
  MaterialCommunityIcons,
  FontAwesome5,
  Foundation,
} from "@expo/vector-icons";
import colors from "..//Store/colors";
import { BlurView } from "expo-blur";
import ImageCoffee from "..//Store/coffees/nathan-dumlao-ikU3J1nr52w-unsplash.jpg";
import { Button } from "react-native-elements";
const { height, width } = Dimensions.get("window");

export default class Order extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  quayLai = () => {
    this.props.navigation.goBack();
  };
  render() {
    // let listCart = this.props.reduxState.arrGioHang;
    // console.log("mang: ", this.state.listCart);
    return (
      <>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => this.quayLai()}
          >
            <Ionicons
              name="return-up-back"
              color={colors["white"]}
              size={10 * 2.5}
            />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Đặt hàng</Text>
        </View>

        <ScrollView style={{ backgroundColor: "#fff" }}>
          <View>
            <Text style={styles.addressInfo}>Thông tin nhận hàng:</Text>
            <View style={styles.container}>
              <Foundation name="map" size={24} color={colors.primary} />
              <Text style={styles.addressText}>Ngô Duy Tân</Text>
              <Text style={styles.addressText}>SĐT: 0982 610 047</Text>
              <Text style={styles.address}>
                Địa chỉ: 281/4/24, Bình Lợi, P.13, Q. Bình Thạnh
              </Text>
            </View>
          </View>

          <View>
            <Text style={styles.delivery}>Hình thức giao hàng</Text>

            <View style={styles.deliveryView}>
              <FontAwesome5 name="truck" size={20} color={colors.primary} />
              <Text style={styles.deliveryName}>
                Giao hàng tận nơi: 20.000 đ
              </Text>
              <Text style={styles.deliveryText}>
                Thời gian giao hàng từ 4-5 ngày tùy thuộc vào thời điểm. Nếu có
                lâu mong quý khách thông cảm. Cafe Happy xin cảm ơn!
              </Text>
            </View>
          </View>
          <View>
            <Text style={styles.orderInfo}>Thông tin đơn hàng</Text>

            <View style={styles.orderContainer}>
              <TouchableOpacity>
                <Image source={ImageCoffee} style={styles.orderImage} />
              </TouchableOpacity>
              <View
                style={{
                  marginLeft: 12,
                  flexDirection: "column",
                }}
              >
                <Text style={styles.orderName}>Trà sữa trân châu</Text>
                <Text style={styles.orderSize}>
                  Size:
                  <Text style={styles.orderSizeText}>L</Text>
                </Text>
                <Text style={styles.orderPrice}>40.000 đ</Text>
                <Text style={styles.orderOuantity}>Số lượng: 5</Text>
              </View>
            </View>
          </View>

          <View style={{ marginTop: 30 }}>
            <View style={styles.lineOne}></View>
            <Text style={styles.paymethod}>Phương thức thanh toán</Text>

            <View style={styles.paymethodView}>
              <MaterialCommunityIcons
                name="cash-multiple"
                size={24}
                color={colors.primary}
              />
              <Text style={styles.paymethodText}>Thanh toán khi nhận hàng</Text>
            </View>
            <View style={styles.lineTwo}></View>
          </View>
          <View style={styles.payView}>
            <View style={{ flexDirection: "column", marginRight: 60 }}>
              <Text style={styles.payText}>Tạm Tính:</Text>
              <Text style={styles.payText}>Phí vận chuyển:</Text>
              <Text style={styles.payText}>Tổng tiền:</Text>
            </View>
            <View style={{ flexDirection: "column" }}>
              <Text style={styles.payText}> 200.000 đ</Text>
              <Text style={styles.payText}> 20.000 đ</Text>
              <Text style={styles.paySum}>220.000 đ</Text>
            </View>
          </View>
        </ScrollView>

        <SafeAreaView style={styles.footer}>
          <Text style={styles.footerText}>Tổng cộng: 220.000 đ</Text>

          <TouchableOpacity style={styles.orderButton}>
            <Text style={styles.buttonName}>Đặt Hàng</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </>
    );
  }
}
const styles = StyleSheet.create({
  header: {
    backgroundColor: "#000",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  backButton: {
    backgroundColor: colors.light,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 10 * 1.5,
    width: 48,
    right: 122.8,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    top: 1,
    right: 22,
  },
  addressInfo: {
    color: "#777777",
    marginTop: 24,
    marginLeft: 16,
    fontWeight: "500",
  },
  container: {
    padding: 10,
    backgroundColor: "#f1f4ff",
    borderWidth: 1,
    borderColor: "#f1f4ff",
    width: "90%",
    height: "auto",
    borderRadius: 15,
    borderWidth: 2.2,
    marginTop: 8,
    left: 16,
  },
  addressText: {
    color: "#777777",
    marginBottom: 4,
    fontWeight: "500",
  },
  address: {
    color: "#777777",
    fontWeight: "500",
  },
  delivery: {
    color: "#777777",
    marginTop: 18,
    marginLeft: 16,
    fontWeight: "500",
  },
  deliveryView: {
    padding: 10,
    backgroundColor: "#f1f4ff",
    borderWidth: 1,
    borderColor: "#f1f4ff",
    width: "90%",
    height: "auto",
    borderRadius: 15,
    borderWidth: 2.2,
    marginTop: 8,
    left: 16,
  },
  deliveryName: {
    color: "#777777",
    fontWeight: "500",
    marginBottom: 4,
  },
  deliveryText: {
    color: "#777777",
    fontWeight: "500",
    marginBottom: 4,
    lineHeight: 22,
  },
  orderInfo: {
    color: "#777777",
    marginTop: 18,
    marginLeft: 16,
    fontWeight: "500",
  },
  orderContainer: {
    flexDirection: "row",
    padding: 10,
    backgroundColor: "#f1f4ff",
    borderWidth: 1,
    borderColor: "#f1f4ff",
    width: "90%",
    height: 114,
    borderRadius: 15,
    borderWidth: 2.2,
    marginTop: 8,
    left: 16,
  },
  orderImage: {
    height: 80,
    width: 80,
    borderRadius: 10,
    position: "relative",
    top: 4,
    marginRight: 5,
  },
  orderName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
    marginBottom: 2,
  },
  orderSize: {
    fontSize: 14,
    fontWeight: "500",
    color: "#000",
    marginBottom: 8,
  },
  orderSizeText: {
    color: "#000",
    fontSize: 15,
    fontWeight: "500",
  },
  orderPrice: {
    fontSize: 15,
    fontWeight: "500",
    color: "#000",
  },
  orderOuantity: {
    fontSize: 14,
    fontWeight: "500",
    color: "#000",
    marginLeft: 160,
    top: -20.8,
  },
  lineOne: {
    backgroundColor: "#000",
    borderWidth: 1,
    borderColor: "#f1f4ff",
    width: "90%",
    marginTop: 2,
    left: 16,
  },
  paymethod: {
    color: "#777777",
    fontWeight: "500",
    marginTop: 18,
    marginLeft: 16,
  },
  paymethodView: {
    padding: 10,
    backgroundColor: "#f1f4ff",
    borderWidth: 1,
    borderColor: "#f1f4ff",
    width: "90%",
    height: "auto",
    borderRadius: 15,
    borderWidth: 2.2,
    marginTop: 8,
    left: 16,
  },
  paymethodText: {
    color: "#777777",
    fontWeight: "500",
    marginBottom: 4,
  },
  lineTwo: {
    backgroundColor: "#000",
    borderWidth: 1,
    borderColor: "#f1f4ff",
    width: "90%",
    marginTop: 28,
    left: 16,
  },
  payView: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    margin: 18,
  },
  payText: {
    fontWeight: "500",
  },
  paySum: {
    fontWeight: "500",
    color: colors.primary,
  },
  footer: {
    backgroundColor: "#000",
    flexDirection: "row",
    justifyContent: "space-between",
    height: 70,
  },
  footerText: {
    color: "#fff",
    marginLeft: 68,
    marginTop: 24.8,
    fontSize: 10 * 1.48,
    fontWeight: "500",
  },
  orderButton: {
    marginTop: 14,
    marginRight: 16,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10 * 1.2,
    height: 44,
    width: 130,
  },
  buttonName: {
    color: colors.white,
    fontSize: 10 * 1.6,
    fontWeight: "600",
  },
});
