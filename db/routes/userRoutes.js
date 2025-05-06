import express from 'express';
const router = express.Router();
import pacienteController from '../controllers/PacienteController.js';

// Aqui usamos arrow functions para chamar os métodos assíncronos corretamente
// POST
router.post('/paciente', async (req, res) => {
    const { nome, email } = req.body;
    try {
      await pacienteController.criar(nome, email);
      res.status(201).json({ mensagem: 'Usuário criado com sucesso!' });
    } catch (err) {
      res.status(500).json({ erro: 'Erro ao criar usuário', detalhe: err.message });
    }
  });
  // GET
  router.get('/paciente', async (req, res) => {
    try {
      const usuarios = await pacienteController.listarTodos();
      res.json(usuarios);
    } catch (err) {
      res.status(500).json({ erro: 'Erro ao listar usuários', detalhe: err.message });
    }
  });
  
  // GET POR EMAIL
  router.get('/paciente/:email', async (req, res) => {
    const { email } = req.params;

    try {
      const usuario = await pacienteController.buscarPorEmail(email);
      console.log(usuario)
      if (usuario) {
        res.json(usuario);
      } else {
        res.status(404).json({ erro: 'Usuário não encontrado' });
      }
    } catch (err) {
      res.status(500).json({ erro: 'Erro ao buscar usuário', detalhe: err.message });
    }
  });

  export default router;
