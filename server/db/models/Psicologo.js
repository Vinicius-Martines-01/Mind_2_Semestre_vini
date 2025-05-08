import { DataTypes } from "sequelize";

export default (sequelize) => {
  const Psicologo = sequelize.define("Psicologo", {
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
    crp: { // Conselho Regional de Psicologia
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    especialidade: {
      type: DataTypes.STRING,
      allowNull: true, // Originalmente era false, mas pode ser opcional
    },
    telefone: {
      type: DataTypes.STRING, // Alterado de INTEGER para STRING para acomodar formatos como (XX) XXXXX-XXXX
      allowNull: true,     // Originalmente era false
    },
    endereco: { // Campo adicionado para consistência, se necessário
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, {
    timestamps: true,
    tableName: "psicologos", // Mantendo o nome da tabela original se existir
  });

  return Psicologo;
};
