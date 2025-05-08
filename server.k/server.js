import app from "./app.js"; // Importando o app.js
import { syncDatabase, sequelize } from "./db/database.js"; // Importando a inicialização do banco e o sequelize

const PORT = process.env.PORT || 8080; // Usar variável de ambiente para porta ou default 8080

(async () => {
  try {
    // Sincronizando o banco e as tabelas
    await syncDatabase();

    // Opcional: Testar conexão com o banco
    await sequelize.authenticate();
    console.log("Conexão com o banco de dados estabelecida com sucesso.");
    
    // Iniciando o servidor
    app.listen(PORT, () => {
      console.log(`Servidor rodando em http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Erro ao inicializar a aplicação:", err);
    process.exit(1); // Encerra a aplicação caso ocorra erro
  }
})();
