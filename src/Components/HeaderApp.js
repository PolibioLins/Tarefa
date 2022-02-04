import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

export default class HeaderApp extends Component {
  render() {
      return(
    <View style={styl.headerBox}>
      <Text style={styl.logo}>ID WebSistemas</Text>
    </View>
      )
  }
}

const styl = new StyleSheet.create({

    headerBox:{
        alignItems:'center',
        backgroundColor: '#ed5118',
        justifyContent:'center',
        padding: 5,
    },

    logo:{
      color:'#ffffff',   
      fontSize: 20,
      fontWeight:'bold',
    }

})