import React, { Component } from "react";
import { View, Text, ScrollView, RefreshControl } from "react-native";
import styled from "styled-components";
import Card, { ContainerView } from "../Main/Card";
import Reply from "./Reply";
import { apis, colors } from "../../config";
import request from "../../api";
import produce from "immer";

const ContentView = ContainerView.extend`
  border-top-width: 0;
  padding-top: 0;
`;

class Detail extends Component {
  static navigationOptions = {
    headerStyle: {
      backgroundColor: colors.primaryBg
    },
    headerTitleStyle: {
      color: "#fff"
    }
  };

  state = {
    isRefreshing: false,
    replies: []
  };

  fetch = id => {
    this.setState({ isRefreshing: true });
    request(apis.replies + id).then(data => {
      this.setState({ replies: data, isRefreshing: false });
    });
  };

  componentDidMount() {
    this._onRefresh();
  }

  _onRefresh = () => {
    const { params } = this.props.navigation.state;
    const item = params.item;
    this.fetch(item.id);
  };

  render() {
    const { params } = this.props.navigation.state;
    const item = params.item;
    return (
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={this.state.isRefreshing}
            onRefresh={this._onRefresh}
            tintColor={colors.primaryBg}
            colors={[colors.primaryBg]}
            progressBackgroundColor="#fff"
          />
        }
      >
        <Card {...item} showBorder={false} />
        <ContentView>
          <Text>{item.content}</Text>
        </ContentView>
        <View>
          {this.state.replies.map((reply, index) => (
            <Reply key={reply.id} reply={reply} index={1 + index} />
          ))}
        </View>
      </ScrollView>
    );
  }
}

export default Detail;
