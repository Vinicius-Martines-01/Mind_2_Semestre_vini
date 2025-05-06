import express, { json } from 'express';
const app = express();
import sequelize from '../database.js';
import userRoutes from '../routes/userRoutes.js';
import cors from 'cors';

// possiveis origins irritantes
const origensPermitidas = [
  'http://127.0.0.1:5501',
  'http://localhost:5501',
  'http://localhost:5500',
  'http://127.0.0.1:5500',
];

// Abre o cors para as portas 5500 | 5501 - Porta do Live Server
app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (origensPermitidas.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error('CORS disse NÃO'));
    }
  },
  credentials: true,
}));


app.use(json());
app.use('/api', userRoutes);

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Conectado ao banco com sucesso!');
    await sequelize.sync(); // Garante que a tabela será criada
  } catch (err) {
    console.error('Erro ao conectar ao banco:', err);
  }
})();

export default app;
