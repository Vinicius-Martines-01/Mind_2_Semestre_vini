import { Sequelize } from 'sequelize';

// Usa o banco de dados mind_plus_ultra
const sequelize = new Sequelize('mind_plus_ultra', 'root', 'admin', {
  host: 'localhost',
  dialect: 'mysql',
});

// Cria o banco de dados TOP DAS GALÁXIAS
sequelize.query('CREATE DATABASE mind_plus_ultra')
  .then(() => {
    console.log('Banco de dados criado com sucesso!');
  })
  .catch(err => {
    console.error('Erro ao criar o banco de dados:', err);
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
console.log('Você esta aqui')