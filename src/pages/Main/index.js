import React from "react";
import { ScrollView, View, StyleSheet, ToastAndroid } from "react-native";
import ScrollableTabView, {
  ScrollableTabBar
} from "react-native-scrollable-tab-view";
import { appConfig, colors } from "../../config";
import { getTopicsByName } from "../../api";
import produce from "immer";
import { Card, getRefreshControl } from "../../components";
import { get, save, multiGet, mergeData } from "../../store";
const { tabMenu, defaultIndex } = appConfig;

export default class MainScreen extends React.PureComponent {
  activeIndex = defaultIndex;

  get activeKey() {
    return this.state.tabMenu[this.activeIndex].key;
  }

  state = {
    tabMenu,
    isRefreshing: false
  };

  fetch = key => {
    key = key || this.activeKey;
    this.setState({ isRefreshing: true });
    getTopicsByName(key).then(data => {
      let tabMenu = produce(this.state.tabMenu, draft => {
        let item = draft.find(item => item.key.toString() === key.toString());
        item.data = mergeData(item.data, data);
        save(key.toString(), item.data)
      });
      this.setState({ tabMenu, isRefreshing: false });
    });
  };

  componentDidMount() {
    this.fetch();

    let tabMenu = this.state.tabMenu.slice()
    let promises = tabMenu.map(({key}) => get(key.toString()))
    Promise.all(promises).then(data => {
      data.forEach((item, index) => {
        tabMenu[index].data = item ? JSON.parse(item) : []
      })
      this.setState({ tabMenu });
      
    })
  }

  onChangeTab = ({ i }) => {
    this.activeIndex = i;
    // if (!this.state.tabMenu[i].data.length) {
    this.fetch();
    // }
  };

  _onRefresh = () => {
    this.fetch();
  };

  onPressCard = item => {
    const { navigate } = this.props.navigation;
    navigate("Detail", { item });
  };

  onPressNodeTitle = node => {
    const { navigate } = this.props.navigation;
    navigate("Node", { node });
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
        initialPage={defaultIndex}
        onChangeTab={this.onChangeTab}
        renderTabBar={() => <ScrollableTabBar />}
      >
        {this.state.tabMenu.map(tab => (
          <ScrollView
            key={tab.label}
            tabLabel={tab.label}
            style={styles.tabView}
            removeClippedSubviews={true}
            refreshControl={getRefreshControl(
              this.state.isRefreshing,
              this._onRefresh
            )}
          >
            <View>
              {tab.data.map(item => (
                <Card
                  key={item.id}
                  {...item}
                  onPress={this.onPressCard.bind(null, item)}
                  onPressNodeTitle={this.onPressNodeTitle}
                />
              ))}
            </View>
          </ScrollView>
        ))}
      </ScrollableTabView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // paddingTop: 0
  },
  tabView: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.01)"
  }
});
