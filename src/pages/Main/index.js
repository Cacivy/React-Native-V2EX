import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import ScrollableTabView from "react-native-scrollable-tab-view";
import { apis, appConfig, colors } from "../../config";
import request from "../../api";
import produce from "immer";
import Card from "./Card";
const { appname, tabMenu, defaultIndex } = appConfig;

export default class MainScreen extends React.Component {
  static navigationOptions = {
    title: appname,
    headerStyle: {
      backgroundColor: colors.primaryBg,
      elevation: 0,
      // shadowColor: 'transparent',
      // shadowRadius: 0,
      shadowOffset: {
        height: 0
      },
      borderBottomWidth: 0
    },
    headerTitleStyle: {
      color: "#fff"
    }
  };

  activeIndex = defaultIndex

  state = {
    tabMenu
  };

  fetch = (key) => {
    key = key || this.state.tabMenu[this.activeIndex].key;
    request(apis[key]).then(data => {
      let tabMenu = produce(this.state.tabMenu, draft => {
        draft.find(item => item.key === key).data = data;
      });
      this.setState({ tabMenu });
    });
  };

  componentDidMount() {
    this.fetch();
  }

  onChangeTab = ({ i }) => {
    this.activeIndex = i
    this.fetch();
  };

  onPressCard = item => {
    const { navigate } = this.props.navigation;
    navigate("Detail", { item });
  };

  render() {
    const scrollViewProps = {
      tabBarPosition: "top",
      tabBarUnderlineStyle: {
        backgroundColor: colors.primaryText
      },
      tabBarTextStyle: {
        // padding: 5
      },
      tabBarBackgroundColor: colors.primaryBg,
      tabBarActiveTextColor: colors.primaryText,
      tabBarInactiveTextColor: colors.defaultText
    };
    return (
      <ScrollableTabView
        {...scrollViewProps}
        style={styles.container}
        initialPage={this.activeIndex}
        onChangeTab={this.onChangeTab}
      >
        {this.state.tabMenu.map(tab => (
          <ScrollView
            key={tab.label}
            tabLabel={tab.label}
            style={styles.tabView}
          >
            {tab.data.map(item => (
              <Card
                key={item.id}
                {...item}
                onPress={this.onPressCard.bind(null, item)}
              />
            ))}
          </ScrollView>
        ))}
      </ScrollableTabView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 0,
  },
  tabView: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.01)"
  }
});
