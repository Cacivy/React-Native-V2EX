import React, { Component } from "react";
import { View, Text, ScrollView } from "react-native";
import styled from "styled-components";
import Card, { ContainerView } from "../Main/Card";
import { colors } from "../../config";

const ContentView = ContainerView.extend`
  border-top-width: 0;
  padding-top: 0;
`;

class Detail extends Component {
  static navigationOptions = {
    headerStyle: {
      backgroundColor: colors.primaryBg,
    },
    headerTitleStyle: {
      color: "#fff"
    }
  };

  render() {
    const { params } = this.props.navigation.state;
    const item = params.item;
    return (
      <ScrollView>
        <Card {...item} />
        <ContentView>
          <Text>{item.content}</Text>
        </ContentView>
      </ScrollView>
    );
  }
}

export default Detail;
