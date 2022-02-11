import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import DatePicker from 'react-native-datepicker';

import Tarefa from '../Models/Tarefa';
import TarefaDatabase from '../Database/TarefaDatabase';
import CardApp from './CardApp';

export default class BodyApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      descricao: '',
      dataDeTermino: '',
      prioridade: '',
      lista: [],
    };
    this.Listar();
  }

  Listar = () => {
    const banco = new TarefaDatabase();
    banco.Listar().then(listaCompleta => {
      this.setState({lista: listaCompleta});
    });
  };

 
  Cadastrar = (descricao, dataDeTermino, prioridade) => {
    const novaTarefa = new Tarefa(descricao, dataDeTermino, prioridade);
    const banco = new TarefaDatabase();
    banco.Inserir(novaTarefa);
    this.Listar();
  };

  Remover = (id) => {
    const banco = new TarefaDatabase();
    banco.Remover(id);
    this.Listar();
  };

  ChangeDate = (valor) => {
    this.setState({
      dataDeTermino: valor,
    });
 
  };

  render() {
    return (

      <View style={styl.body}>
        <View style={styl.areaInput}>
          <TextInput
            onChangeText={valorDigitado => {
              this.setState({descricao: valorDigitado});
            }}
            placeholder=" Digite aqui a descrição"
            style={styl.textInput}
          />

          <TextInput
            onChangeText={valorDigitado => {
              this.setState({prioridade: valorDigitado});
            }}
            placeholder=" Digite aqui a prioridade"
            style={styl.textInput}
          />

          <DatePicker
            format="DD/MM/YYYY"
            date={this.state.dataDeTermino}
           onDateChange={this.ChangeDate}
            placeholder="Selecione a Data"
            customStyles={{
              dateInput: {
                borderWidth: 1,
                borderColor: 'black',
                fontSize: 15,
                height: 35,
              },
            }}
            style={styl.dataTermino}
          />
        </View>

        <View>
          <TouchableOpacity
            onPress={() =>
              this.Cadastrar(
                this.state.descricao,
                this.state.dataDeTermino,
                this.state.prioridade,
                
              )
            }
            style={styl.button}>
            <Text style={styl.buttonText}>Registrar Tarefa</Text>
          </TouchableOpacity>
        </View>

        <View style={styl.areaTarefa}>
          <Text style={styl.textTarefa}>Tarefas:</Text>
          <ScrollView>

            <View style={styl.column}>
           
           {
              this.state.lista.map(item =>(
              
                <CardApp
                  key={item.id}
                  tarefa={item}
                  id={item.id}
                  descricao={item.descricao}
                  dataDeTermino={item.dataDeTermino}
                  prioridade={item.prioridade}
                  remover={this.Remover}
                 
                />
                
              ))}
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styl = new StyleSheet.create({
  body: {
    padding: 10,
    flex: 1,
  },

  textInput: {
    borderColor: 'black',
    borderWidth: 1.2,
    fontSize: 15,
    height: 35,
    margin: 5,
    padding: 5,
  },

  dataTermino: {
    margin: 5,
    width: 350,
  },

  button: {
    alignItems: 'center',
    backgroundColor: '#ed5118',
    borderRadius: 5,
    justifyContent: 'center',
    marginBottom: 8,
    marginLeft: 15,
    marginRight: 15,
    marginTop: 8,
    padding: 5,
  },

  buttonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
  },

  areaTarefa: {
    backgroundColor: '#FBFFD9',
    borderWidth: 1,
    flex: 1,
    margin: 5,
  },

  textTarefa: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    margin: 5,
  },

  column: {
    paddingLeft: 20,
    paddingRight: 20,
    alignItems: 'center',
    flexDirection: 'column',
  },
});
