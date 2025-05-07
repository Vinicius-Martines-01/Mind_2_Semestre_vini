import sequelize from '../database.js';
import { Sequelize, DataTypes } from 'sequelize';

class Paciente extends Sequelize.Model {}

// NOME / EMAIL / SENHA / DT_NASCIMENTO / GENERO / TELEFONE / ENDEREÇO / IMAGEM DE PERFIL
Paciente.init({
  nome: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false },
  senha: { type: DataTypes.STRING, allowNull: false },
  dt_nascimento: { type: DataTypes.STRING, allowNull: true },
  genero: { type: DataTypes.STRING, allowNull: true },
  telefone: { type: DataTypes.INTEGER, allowNull: true },
  endereco: { type: DataTypes.STRING, allowNull: true },
  img_perfil: { type: DataTypes.STRING, allowNull: true, defaultValue: '' }
}, {
  sequelize,
  modelName: 'Pacientes',
  tableName: 'pacientes',
  timestamps: true,
});

export default Paciente;
