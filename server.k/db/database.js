import { Sequelize } from "sequelize";
import path from "path";
import { fileURLToPath } from "url";

// Import model definitions
import PacienteModel from "./models/Paciente.js";
import PsicologoModel from "./models/Psicologo.js";
import VoluntarioModel from "./models/Voluntario.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuração da conexão com o banco de dados SQLite
// O arquivo do banco será criado na raiz da pasta 'server'
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: path.join(__dirname, "..", "database.sqlite"), 
  logging: console.log, // Para ver os logs SQL no console (pode remover em produção)
});

// Carregar os modelos
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize; // Exporta a instância do sequelize

db.Paciente = PacienteModel(sequelize);
db.Psicologo = PsicologoModel(sequelize);
db.Voluntario = VoluntarioModel(sequelize);

// Função para sincronizar o banco de dados
const syncDatabase = async () => {
  try {
    // await sequelize.sync({ force: true }); // Use com cautela, recria tabelas
    await sequelize.sync(); // Cria tabelas se não existirem
    console.log("Banco de dados sincronizado com sucesso.");
  } catch (error) {
    console.error("Erro ao sincronizar o banco de dados:", error);
    throw error; // Propaga o erro para ser tratado no server.js
  }
};

// Exporta a instância do sequelize e a função de sincronização
export { sequelize, db, syncDatabase };

