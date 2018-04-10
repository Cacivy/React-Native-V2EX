import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default class App extends React.Component {
  state = {
    color: 'green'
  }

  changeColor = () => {
    this.setState({color: this.state.color === 'green' ? 'orange' : 'green'})
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={{color: this.state.color}}>Open up App.js to start working on your app!</Text>
        <Text>Changes you make will automatically reload.</Text>
        <Text>Shake your phone to open the developer menu.</Text>
        <Button title="Click me!" onPress={this.changeColor}>Clike Me</Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
