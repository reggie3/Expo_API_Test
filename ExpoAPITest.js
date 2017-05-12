import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import App from './src/Pages/App';
import Expo from 'expo';


export default class ExpoAPITest extends Component {
  render() {
    return (
      <App/>
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

Expo.registerRootComponent(ExpoAPITest);
