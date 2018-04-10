import React from "react";
import { Main } from "./pages";
import { StackNavigator } from "react-navigation";

const App = StackNavigator({
  Main: { screen: Main },
});

export default App
