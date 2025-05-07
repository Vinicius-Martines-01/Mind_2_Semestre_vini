import express from 'express';
import pacienteController from '../controllers/PacienteController.js';

const router = express.Router();

// Definindo as rotas
router.put('/paciente/', async (req, res) => {
  const { nome, email, senha } = req.body;
  try {
    await pacienteController.cadastrar(nome, email, senha);
    res.status(201).json({ mensagem: 'Usuário criado com sucesso!' });
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao criar usuário', detalhe: err.message });
  }
});

router.get('/paciente/', async (req, res) => {
  try {
    const usuarios = await pacienteController.listarTodos();
    res.json(usuarios);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao listar usuários', detalhe: err.message });
  }
});

router.get('/paciente/email/:email', async (req, res) => {
  const { email } = req.params;
  try {
    const usuario = await pacienteController.buscarPorEmail(email);
    if (usuario) {
      res.json(usuario);
    } else {
      res.status(404).json({ erro: 'Usuário não encontrado' });
    }
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao buscar usuário', detalhe: err.message });
  }
});

router.get('/paciente/nome/:nome', async (req, res) => {
  const { nome } = req.params;
  try {
    const usuario = await pacienteController.buscarPorNome(nome);
    if (usuario) {
      res.json(usuario);
    } else {
      res.status(404).json({ erro: 'Usuário não encontrado' });
    }
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao buscar usuário', detalhe: err.message });
  }
});

router.post('/paciente/login', async (req, res) => {
  const { login, senha } = req.body;
  try {
    const usuario = await pacienteController.buscarPorLogin(login);

    if (!usuario) {
      return res.status(401).json({ error: 'Usuário não encontrado' });
    }

    if (usuario.senha !== senha) {
      return res.status(401).json({ error: 'Senha incorreta' });
    }

    res.status(200).json({
      user: {
        id: usuario.id,
        login: usuario.nome,
        email: usuario.email,
        img_perfil: usuario.img_perfil,
      },
    });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao fazer login' });
  }
});

export default router;
