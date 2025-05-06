import app from './models/app.js'

const PORT = 5500;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
