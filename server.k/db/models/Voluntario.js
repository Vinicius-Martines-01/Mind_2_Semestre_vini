import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const Voluntario = sequelize.define('Voluntario', {
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    senha: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    area_interesse: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    disponibilidade: {
      type: DataTypes.STRING, // Ex: 'Manhãs de segunda e quarta'
      allowNull: true,
    },
    telefone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    // Adicione outros campos relevantes para Voluntario
  }, {
    timestamps: true,
  });

  return Voluntario;
};
