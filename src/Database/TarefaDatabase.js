import SQLite from 'react-native-sqlite-storage';

//SQLite.DEBUG(true);
SQLite.enablePromise(true);

const database_name = 'ReactNativeSQLite.db'; //Nome do banco de dados
const database_version = '1.0'; //Versão do banco de dados
const database_displayname = 'SQLite React Offline Database'; //Nome de exibição do banco de dados
const database_size = 200000; //tamanho do banco de dados -->


//Função de inicialização do Banco de Dados
export default class Database {
    Conectar() {
      let db;
      return new Promise(resolve => {
        console.log('Checando a integridade do plugin ...');
        SQLite.echoTest()
          .then(() => {
            console.log('Integridade Ok ...');
            console.log('Abrindo Banco de Dados ...');
            SQLite.openDatabase(
              database_name,
              database_version,
              database_displayname,
              database_size,
            )
              .then(DB => {
                db = DB;
                console.log('Banco de dados Aberto');
                db.executeSql('SELECT 1 FROM Item LIMIT 1') // Substituir o nome da tabela 
                  .then(() => {
                    console.log(
                      'O banco de dados está pronto ... Executando Consulta SQL ...',
                    );
                  })
                  .catch(error => {
                    console.log('Erro Recebido: ', error);
                    console.log(
                      'O Banco de dados não está pronto ...Criando Dados',
                    );
                    db.transaction(tx => {
                      tx.executeSql(
                        'CREATE TABLE IF NOT EXISTS Item (id INTEGER PRIMARY KEY AUTOINCREMENT, descricao varchar(100), dataDeTermino varchar(11), prioridade varchar(30))', // Mudar o nome da tabela e os elementos colocando os tipos "varchar e etc"
                      );
                    })
                      .then(() => {
                        console.log('Tabela criada com Sucesso');
                      })
                      .catch(error => {
                        console.log(error);
                      });
                  });
                resolve(db);
              })
              .catch(error => {
                console.log(error);
              });
          })
          .catch(error => {
            console.log('echoTest Falhou - plugin não funcional');
          });
      });
    }
  
    Desconectar(db) {
      if (db) {
        console.log('Fechando Banco de Dados');
        db.close()
          .then(status => {
            console.log('Banco de dados Desconectado!!');
          })
          .catch(error => {
            this.errorCB(error);
          });
      } else {
        console.log('A conexão com o banco não está aberta');
      }
    }
  
    Listar() {
      return new Promise(resolve => {
        const lista = []; // Atualizar o nome
        this.Conectar() // Mudar para conectar
          .then(db => {
            db.transaction(tx => {
              //Query SQL para listar os dados da tabela
              tx.executeSql(
                'SELECT * FROM Item', []).then(([tx, results]) => {
                console.log('Consulta completa');
                var len = results.rows.length;
                for (let i = 0; i < len; i++) {
                  let row = results.rows.item(i);
                  // console.log('Prod ID: ${row.id}, Prod Nome: ${row.nome}'); --> Ajustar se quiser
                  const {id, descricao, dataDeTermino, prioridade} = row; // Colocar os elementos
                  lista.push({id, descricao, dataDeTermino, prioridade});
                }
                console.log(lista);
                resolve(lista);
              });
            })
              .then(result => {
                this.Desconectar(db); // Ajustar o nome que fecha o DB
              })
              .catch(err => {
                console.log(err);
              });
          })
          .catch(err => {
            console.log(err);
          });
      });
    }
 
    // Função para acrescentar um novo produto na tabela
    Inserir(item) {
      return new Promise(resolve => {
        this.Conectar() // Conexao
          .then(db => {
            db.transaction(tx => {
              //Query SQL para inserir um novo produto
              tx.executeSql('INSERT INTO Item (descricao,dataDeTermino,prioridade) VALUES (?, ?, ?)', [
                // Cada interregacao pede um parametro --> Id é autoincrentado, nao conta
                item.descricao,
                item.dataDeTermino,
                item.prioridade,
               
              ]).then(([tx, results]) => {
                resolve(results);
              });
            })
              .then(result => {
                this.Desconectar(db); // Desconexao
              })
              .catch(err => {
                console.log(err);
              });
          })
          .catch(err => {
            console.log(err);
          });
      });
    }
  
 
    //Função para excluir um dado do banco pela id
    Remover(id) {
      return new Promise(resolve => {
        this.Conectar()
          .then(db => {
            //Conectar
            db.transaction(tx => {
              //Query SQL para deletar um item da base de dados
              tx.executeSql('DELETE FROM Item WHERE id = ?', [id]).then(
                ([tx, results]) => {
                  console.log(results);
                  resolve(results);
                },
              );
            })
              .then(result => {
                this.Desconectar(db); //  Desconectar
              })
              .catch(err => {
                console.log(err);
              });
          })
          .catch(err => {
            console.log(err);
          });
      });
    }
    
  }