import React from "react";
import { View, Text, Image, TouchableHighlight } from "react-native";
import styled from "styled-components";
import timeago from "timeago.js";

export const ContainerView = styled.View`
  border-width: ${props => (props.hideBorder ? 0 : 1)};
  background-color: #fff;
  border-color: "rgba(0,0,0,0.1)";
  height: auto;
  /* margin: 5px; */
  padding: 15px;
  /* shadow-color: #ccc;
  shadow-offset: { width: 2, height: 2 };
  shadow-opacity: 0.5;
  shadow-radius: 3; */
`;

const headerHeight = 40;

export const HeaderView = styled.View`
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
  background-color: #aab0c6;
  font-weight: 700;
  border-radius: 12;
  padding-left: 12;
  padding-right: 12;
  padding-top: 2;
  padding-bottom: 2;
`;

const TitleView = styled.View`
  flex: 1;
`;

const TitleText = styled.Text`
  font-size: 16;
  font-weight: bold;
`;

export const Member = ({ member = {}, node, created, onPressNodeTitle }) => (
  <MemberView>
    <AvatarImage source={{ uri: "https:" + member.avatar_normal }} />
    <ColView>
      <Text>
        <NameText>{member.username}</NameText>
        {node && (
          <NodeTitleText onPress={onPressNodeTitle && onPressNodeTitle.bind(null, node)}>
            &nbsp;{node.title}
          </NodeTitleText>
        )}
      </Text>
      <TimeText>{timeago(null, "zh_CN").format(created * 1000)}</TimeText>
    </ColView>
  </MemberView>
);

const Card = ({
  title,
  content,
  node,
  member,
  replies,
  created,
  onPress,
  onPressNodeTitle,
  hideBorder = false
}) => {
  const Header = (
    <HeaderView>
      <Member
        member={member}
        node={node}
        created={created}
        onPressNodeTitle={onPressNodeTitle}
      />
      {replies > 0 && (
        <View>
          <IConText>{replies}</IConText>
        </View>
      )}
    </HeaderView>
  );
  return (
    <TouchableHighlight onPress={onPress}>
      <ContainerView hideBorder={hideBorder}>
        {Header}
        <TitleView>
          <TitleText>{title}</TitleText>
        </TitleView>
      </ContainerView>
    </TouchableHighlight>
  );
};

export default Card;
