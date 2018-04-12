import React from "react";
import { Main, Detail, Node } from "./pages";
import { StackNavigator } from "react-navigation";
import { colors, appConfig } from "./config";

const App = StackNavigator({
  Main: { screen: Main },
  Detail: {screen: Detail},
  Node: {screen: Node}
}, {
  initialRouteName: 'Main',
  navigationOptions: {
    title: appConfig.appname,
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
    headerTintColor: '#fff',
    headerTitleStyle: {
      color: "#fff"
    }
  }
});

export default App
