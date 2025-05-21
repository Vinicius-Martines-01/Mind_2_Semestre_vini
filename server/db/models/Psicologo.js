import sequelize from '../database.js';
import { Sequelize, DataTypes } from 'sequelize';


class Psicologo extends Sequelize.Model {}

// NOME / EMAIL / SENHA / CRP / ESPECIALIDADE / TELEFONE / ENDEREÇO
Psicologo.init({
  ID_Psicologo: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  nome: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true, validate: { isEmail: true } },
  senha: {type: DataTypes.STRING, allowNull: false },
  crp: { type: DataTypes.STRING, allowNull: false, unique: true },
  especialidade: { type: DataTypes.STRING, allowNull: true },
  telefone: { type: DataTypes.STRING, allowNull: true },
  endereco: { type: DataTypes.STRING, allowNull: true },
}, {
sequelize,
modelName: 'Psicologos',
tableName: 'psicologos',
timestamps: true,
});

  export default Psicologo;
