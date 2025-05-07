import sequelize from '../database.js';
import { Sequelize, DataTypes } from 'sequelize';

// Definir o modelo de Psicologos
class Psicologo extends Sequelize.Model {}

Psicologo.init({
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
  especialidade: {
    type: DataTypes.STRING,
    allowNull: false
  },
  endereco: {
    type: DataTypes.STRING, // Corrigi para STRING, já que é um campo de endereço
    allowNull: false
  },
  telefone: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  sequelize, // A instância do Sequelize
  modelName: 'Psicologos', // Nome do modelo
  tableName: 'psicologos', // Nome da tabela (opcional, se você quiser customizar)
  timestamps: true // Sequelize adicione campos `createdAt` e `updatedAt`
});

export default Psicologo;