import React, { Component } from "react";
import { View, Text } from "react-native";
import Card, { ContainerView, HeaderView, Member } from "../Main/Card";
import styled from "styled-components";

const Reply = ({ reply, index }) => {
  return (
    <ContainerView showBorder={true}>
      <HeaderView>
        <Member member={reply.member} created={reply.created} />
        <View>
          <Text>{index}</Text>
        </View>
      </HeaderView>
      <View>
        <Text>{reply.content}</Text>
      </View>
    </ContainerView>
  );
};

export default Reply;
