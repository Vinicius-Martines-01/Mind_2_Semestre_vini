import { DataTypes } from "sequelize";

export default (sequelize) => {
  const Paciente = sequelize.define("Paciente", {
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
    dt_nascimento: {
      type: DataTypes.DATEONLY, // Alterado de STRING para DATEONLY para melhor semântica
      allowNull: true,
    },
    genero: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    telefone: {
      type: DataTypes.STRING, // Alterado de INTEGER para STRING
      allowNull: true,
    },
    endereco: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    img_perfil: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "",
    },
  }, {
    timestamps: true,
    tableName: "pacientes", // Mantendo o nome da tabela original
  });

  return Paciente;
};
