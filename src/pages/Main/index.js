import React from "react";
import { Text, View, Image, ScrollView, StyleSheet } from "react-native";
import ScrollableTabView from "react-native-scrollable-tab-view";
import apis from "../../config/http.config";
import styled from 'styled-components';
import timeago from 'timeago.js';

const tabMenu = [
  {
    label: "最热",
    data: []
  },
  {
    label: "全部",
    data: []
  },
  {
    label: "技术",
    data: []
  },
  {
    label: "创意",
    data: []
  },
  {
    label: "酷工作",
    data: []
  }
];

export default class MainScreen extends React.Component {
  static navigationOptions = {
    title: "V2EX"
  };

  state = {
    tabMenu
  };

  componentDidMount() {
    fetch(apis.all)
      .then(res => res.json())
      .then(data => {
        let tabMenu = this.state.tabMenu.slice();
        tabMenu[1].data = data;
        this.setState({ tabMenu });
      });
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <ScrollableTabView style={styles.container} initialPage={1}>
        {this.state.tabMenu.map(tab => (
          <ScrollView
            key={tab.label}
            tabLabel={tab.label}
            style={styles.tabView}
          >
            {tab.data.map(item => <Card key={item.id} {...item} />)}
          </ScrollView>
        ))}
      </ScrollableTabView>
    );
  }
}

const TimeText = styled.Text`
  font-size: 12;
  color: #cecece;
`;

const Card = ({ title, content, node, member, replies, created }) => (
  <View style={styles.card}>
    <View style={styles.cardHeader}>
      <View style={styles.member}>
        <Image
          style={styles.avatar}
          source={{ uri: "https:" + member.avatar_normal }}
        />
        <View style={styles.colText}>
          <Text>
            <Text style={styles.name} >{member.username}</Text>
            &nbsp;
            <Text style={styles.nodeTitle}>{node.title}</Text>
          </Text>
          <TimeText>{timeago(null, 'zh_CN').format(created * 1000)}</TimeText>
        </View>
      </View>
      {replies > 0 && (
        <View>
          <Text style={styles.icon}>{replies}</Text>
        </View>
      )}
    </View>
    <Text style={styles.cardTitle}>{title}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginTop: 10
  },
  tabView: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.01)"
  },
  card: {
    borderWidth: 1,
    backgroundColor: "#fff",
    borderColor: "rgba(0,0,0,0.1)",
    margin: 5,
    padding: 15,
    shadowColor: "#ccc",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 3
  },
  cardHeader: {
    height: 40,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10
  },
  avatar: {
    height: 40,
    width: 40,
    marginRight: 10,
    borderRadius: 100
  },
  member: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start"
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold"
  },
  nodeTitle: {
    color: "green"
  },
  colText: {
    height: 40,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  name: {
    fontWeight: 'bold'
  },
  icon: {
    color: "#fff",
    backgroundColor: "#e5e5e5",
    fontWeight: "700",
    borderRadius: 12,
    paddingTop: 2,
    paddingRight: 12,
    paddingBottom: 2,
    paddingLeft: 12
  }
});
