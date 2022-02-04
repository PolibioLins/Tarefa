import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';

export default class CardApp extends Component {

  getEstilo() {

    if (this.props.status === '1') {
      return {
        backgroundColor: 'red',
        borderColor: 'black',
        borderWidth: 1.2,
        flex: 1,
        flexDirection: 'row',
        margin: 5,
        marginLeft: 10,
        marginRight: 10,
      };
    } else {
      return {
        backgroundColor: '#3AB551',
        borderColor: 'black',
        borderWidth: 1.2,
        flex: 1,
        flexDirection: 'row',
        margin: 5,
        marginLeft: 10,
        marginRight: 10,
      };
    }
  }

  render() {
    return (
      <View style={this.getEstilo()}>
        <View style={styl.column1}>

          
          <Text style={styl.textContent}>
            {' '}
            Descrição: {this.props.descricao}
          </Text>
          <Text style={styl.textContent}>
            {' '}
            Data de Término: {this.props.dataDeTermino}
          </Text>
          <Text style={styl.textContent}>
            {' '}
            Prioridade: {this.props.prioridade}
          </Text>
        </View>

        <View style={styl.column2}>
          <TouchableOpacity onPress={() => this.props.remover(this.props.id)}>
            <Image
              style={styl.trashIcon}
              source={require('../Img/trash.png')}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styl = new StyleSheet.create({
  cardT: {
    borderColor: 'black',
    borderWidth: 1.2,
    flex: 1,
    flexDirection: 'row',
    margin: 5,
    marginLeft: 10,
    marginRight: 10,
  },

  column1: {
    flex: 4,
    flexDirection: 'column',
    padding: 8,
  },

  textContent: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 8,
  },

  column2: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 5,
  },

  trashIcon: {
    height: 35,
    marginRight: 15,
    width: 35,
  },
});
