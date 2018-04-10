import React from "react";
import Main from "./pages/Main";
import Profile from "./pages/Profile";
import { StackNavigator } from "react-navigation";

const App = StackNavigator({
  Main: { screen: Main },
  Profile: { screen: Profile }
});

export default App
