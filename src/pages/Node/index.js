import React, { Component } from "react";
import { ScrollView, View, Text } from "react-native";
import { getTopicsByName } from "../../api";
import { Card } from "../../components";

class Node extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;

    return {
      title: params ? params.node.title : "节点"
    };
  };

  state = {
    isRefreshing: false,
    data: []
  };

  fetch = name => {
    this.setState({ isRefreshing: true });
    getTopicsByName(name).then(data => {
      this.setState({ data, isRefreshing: false });
    });
  };

  componentDidMount() {
    const { params } = this.props.navigation.state;
    this.fetch(params.node.name);
  }

  onPressCard = item => {
    const { navigate } = this.props.navigation;
    navigate("Detail", { item });
  };

  render() {
    const { params } = this.props.navigation.state;
    const node = params.node;
    return (
      <ScrollView>
        {this.state.data.map(item => (
          <Card
            key={item.id}
            {...item}
            onPress={this.onPressCard.bind(null, item)}
          />
        ))}
      </ScrollView>
    );
  }
}

export default Node;
