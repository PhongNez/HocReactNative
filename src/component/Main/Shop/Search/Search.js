import React, { Component } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Dimensions,
} from "react-native";
import global from "../../../../global/global";

const windowHeight = Dimensions.get("window").height;
export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textSearch: "",
    };
  }

  componentDidMount() {
    console.log("Search ComponentDimount");
  }

  onSearch = async () => {
    //console.log('Phong');
    let data = { name: 1 };
    let res = await axios.post(
      "http://192.168.1.10:8081/api/v1/search",
      { name: this.state.textSearch },
      { headers: { "content-type": "application/x-www-form-urlencoded" } }
    );
    console.log(res.data.message);
  };
  render() {
    return (
      <View style={{ backgroundColor: "brown" }}>
        <TextInput
          style={{ height: windowHeight / 20, backgroundColor: "#ffffff" }}
          placeholder="Bạn muốn dùng món gì??"
          value={this.state.textSearch}
          onChangeText={(text) =>
            this.setState({
              textSearch: text,
            })
          }
          onSubmitEditing={() => this.onSearch()}
        />
      </View>
    );
  }
}
