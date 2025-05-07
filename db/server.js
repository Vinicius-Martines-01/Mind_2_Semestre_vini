import app from './models/app.js'

const PORT = 8080; // port principal

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
