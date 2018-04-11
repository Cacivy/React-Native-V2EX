import React from "react";
import { View, Text, Image, TouchableHighlight } from "react-native";
import styled from "styled-components";
import timeago from "timeago.js";

export const ContainerView = styled.View`
  border-width: ${props => props.isMain ? 1 : 0};
  background-color: #fff;
  border-color: "rgba(0,0,0,0.1)";
  /* margin: 5px; */
  padding: 15px;
  shadow-color: #ccc;
  shadow-offset: { width: 2, height: 2 };
  shadow-opacity: 0.5;
  shadow-radius: 3;
`;

const headerHeight = 40;

const HeaderView = styled.View`
  height: ${headerHeight};
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 10;
`;

const MemberView = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: flex-start;
`;

const AvatarImage = styled.Image`
  height: ${headerHeight};
  width: ${headerHeight};
  margin-right: 10;
  border-radius: 100;
`;

const ColView = styled.View`
  height: 40;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
`;

const NameText = styled.Text`
  font-weight: bold;
`;

const NodeTitleText = styled.Text`
  color: green;
`;

const TimeText = styled.Text`
  font-size: 12;
  color: #cecece;
`;

const IConText = styled.Text`
  color: #fff;
  background-color: #e5e5e5;
  font-weight: 700;
  border-radius: 12;
  padding-left: 12;
  padding-right: 12;
  padding-top: 2;
  padding-bottom: 2;
`;

const TitleText = styled.Text`
  font-size: 16;
  font-weight: bold;
`;

const Card = ({ title, content, node, member, replies, created, onPress }) => {
  const Header = (
    <HeaderView>
      <MemberView>
        <AvatarImage source={{ uri: "https:" + member.avatar_normal }} />
        <ColView>
          <Text>
            <NameText>{member.username}</NameText>
            <NodeTitleText>&nbsp;{node.title}</NodeTitleText>
          </Text>
          <TimeText>{timeago(null, "zh_CN").format(created * 1000)}</TimeText>
        </ColView>
      </MemberView>
      {replies > 0 && (
        <View>
          <IConText>{replies}</IConText>
        </View>
      )}
    </HeaderView>
  );
  return (
    <TouchableHighlight onPress={onPress}>
      <ContainerView isMain={!!onPress}>
        {Header}
        <TitleText>{title}</TitleText>
      </ContainerView>
    </TouchableHighlight>
  );
};

export default Card;
