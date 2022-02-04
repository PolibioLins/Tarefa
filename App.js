import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';

import HeaderApp from './src/Components/HeaderApp';
import BodyApp from './src/Components/BodyApp';

export default class App extends Component {
  render() {
    return (
      <View style={{flex:1,flexDirection:'column'}}>
        <View style={{justifyContent:'flex-start'}}>
          <HeaderApp />
        </View>
        <View style={{flex:1}}>
          <BodyApp />
        </View>
        <View style={{justifyContent:'flex-end'}}>
          <HeaderApp />
        </View>
      </View>
    );
  }
}
