import React from "react";
import { Main, Detail } from "./pages";
import { StackNavigator } from "react-navigation";

const App = StackNavigator({
  Main: { screen: Main },
  Detail: {screen: Detail}
});

export default App
