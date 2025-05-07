// models/Usuario.js
import sequelize from '../database.js';

// Importar a classe Sequelize e DataTypes

import { Sequelize, DataTypes } from 'sequelize';

// Definir o modelo de Pacientes
class Paciente extends Sequelize.Model {}
Paciente.init({
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false
  },
  dt_nascimento: {
    type: DataTypes.STRING, // Corrigi o tipo para STRING, pois DataTypes.String não existe
    allowNull: true
  },
  genero: {
    type: DataTypes.STRING,
    allowNull: true
  },
  telefone: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  endereco: {
    type: DataTypes.STRING,
    allowNull: true
  },
  img_perfil:{
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: ''
  }
}, {
  sequelize, // A instância do Sequelize
  modelName: 'Pacientes', // Nome do modelo
  tableName: 'pacientes', // Nome da tabela (opcional, se você quiser customizar)
  timestamps: true // Sequelize adicione campos `createdAt` e `updatedAt`
});

export default Paciente;