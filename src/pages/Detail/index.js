import React, { Component } from "react";
import { View, Text, ScrollView, RefreshControl } from "react-native";
import styled from "styled-components";
import { Card, ContainerView, getRefreshControl } from "../../components";
import Reply from "./Reply";
import { colors } from "../../config";
import { getRepliesByTopicId } from "../../api";
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
    getRepliesByTopicId(id).then(data => {
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

  onPressNodeTitle = node => {
    const { navigate } = this.props.navigation;
    navigate("Node", { node });
  };

  render() {
    const { params } = this.props.navigation.state;
    const item = params.item;
    return (
      <ScrollView
        refreshControl={
          getRefreshControl(this.state.isRefreshing, this._onRefresh)
        }
      >
        <Card
          {...item}
          hideBorder={true}
          onPressNodeTitle={this.onPressNodeTitle}
        />
        <ContentView>
          <Text>{item.content}</Text>
        </ContentView>
        <View>
          {this.state.replies.length ? (
            this.state.replies.map((reply, index) => (
              <Reply key={reply.id} reply={reply} index={1 + index} />
            ))
          ) : (
            <ContainerView>
              <Text>{
                this.state.isRefreshing ? '拼命获取回复中...' : '目前还没有回复...'
              }</Text>
            </ContainerView>
          )}
        </View>
      </ScrollView>
    );
  }
}

export default Detail;
