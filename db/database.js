import mysql from 'mysql2';
import { Sequelize } from 'sequelize';

// Abre a conexão com o sql
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'admin', 
});

// Cria o database mind_plus_ultra
connection.query('CREATE DATABASE IF NOT EXISTS mind_plus_ultra', (err, results) => {
  if (err) throw err;
  console.log('Database já existe');
});
// fecha a conexão
connection.end();  

// Usa o banco de dados mind_plus_ultra
const sequelize = new Sequelize('mind_plus_ultra', 'root', 'admin', {
  host: 'localhost',
  dialect: 'mysql',
});

  
export async function authenticate() {
  await sequelize.authenticate();
}

export async function sync() {
  await sequelize.sync();
}

export async function close() {
  await sequelize.close();
}

export default sequelize;
