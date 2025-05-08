import express, { json } from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';

const app = express();

// Configuração do CORS // PS: Veja qual porta o live -server está enviando, se ela não estiver aqui, ADICIONE
const origensPermitidas = [
  'http://127.0.0.1:5501',
  'http://localhost:5501',
  'http://localhost:5500',
  'http://127.0.0.1:5500',
];

app.use(cors({
  origin(origin, callback) {
    if (!origin || origensPermitidas.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('CORS disse NÃO'));
    }
  },
  credentials: true,
}));

app.use(json());
app.use('/api', userRoutes); // Definindo as rotas

export default app;
