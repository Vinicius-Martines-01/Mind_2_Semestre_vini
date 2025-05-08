import Psicologo from "../db/models/Psicologo.js";
import bcrypt from "bcrypt";

const saltRounds = 10;

class PsicologoController {
  async criar(req, res) {
    const { nome, email, senha, crp, especialidade, telefone } = req.body;
    try {
      if (!nome || !email || !senha || !crp) {
        return res.status(400).json({ error: "Nome, email, senha e CRP são obrigatórios." });
      }

      const hashedPassword = await bcrypt.hash(senha, saltRounds);
      const novoPsicologo = await Psicologo.create({
        nome,
        email,
        senha: hashedPassword,
        crp,
        especialidade,
        telefone,
      });
      res.status(201).json(novoPsicologo);
    } catch (error) {
      console.error("Erro ao criar psicólogo:", error);
      if (error.name === "SequelizeUniqueConstraintError") {
        return res.status(409).json({ error: "Email ou CRP já cadastrado." });
      }
      res.status(500).json({ error: "Erro interno ao criar psicólogo." });
    }
  }

  async listarTodos(req, res) {
    try {
      const psicologos = await Psicologo.findAll({
        attributes: { exclude: ["senha"] },
      });
      res.status(200).json(psicologos);
    } catch (error) {
      console.error("Erro ao listar psicólogos:", error);
      res.status(500).json({ error: "Erro interno ao listar psicólogos." });
    }
  }

  async buscarPorId(req, res) {
    const { id } = req.params;
    try {
      const psicologo = await Psicologo.findByPk(id, {
        attributes: { exclude: ["senha"] },
      });
      if (!psicologo) {
        return res.status(404).json({ error: "Psicólogo não encontrado." });
      }
      res.status(200).json(psicologo);
    } catch (error) {
      console.error("Erro ao buscar psicólogo por ID:", error);
      res.status(500).json({ error: "Erro interno ao buscar psicólogo." });
    }
  }

  async atualizar(req, res) {
    const { id } = req.params;
    const dadosAtualizacao = req.body;
    try {
      const psicologo = await Psicologo.findByPk(id);
      if (!psicologo) {
        return res.status(404).json({ error: "Psicólogo não encontrado." });
      }

      if (dadosAtualizacao.senha) {
        dadosAtualizacao.senha = await bcrypt.hash(dadosAtualizacao.senha, saltRounds);
      }

      const [numLinhasAfetadas, psicologosAtualizados] = await Psicologo.update(dadosAtualizacao, {
        where: { id },
        returning: true,
      });

      if (numLinhasAfetadas > 0) {
        const psicologoAtualizado = await Psicologo.findByPk(id, { attributes: { exclude: ["senha"] } });
        return res.status(200).json(psicologoAtualizado);
      }
      return res.status(404).json({ error: "Psicólogo não encontrado para atualização ou nenhum dado alterado." });

    } catch (error) {
      console.error("Erro ao atualizar psicólogo:", error);
      if (error.name === "SequelizeUniqueConstraintError" && (dadosAtualizacao.email || dadosAtualizacao.crp) ) {
        return res.status(409).json({ error: "Email ou CRP já cadastrado por outro usuário." });
      }
      res.status(500).json({ error: "Erro interno ao atualizar psicólogo." });
    }
  }

  async deletar(req, res) {
    const { id } = req.params;
    try {
      const psicologo = await Psicologo.findByPk(id);
      if (!psicologo) {
        return res.status(404).json({ error: "Psicólogo não encontrado." });
      }
      await psicologo.destroy();
      res.status(204).send();
    } catch (error) {
      console.error("Erro ao deletar psicólogo:", error);
      res.status(500).json({ error: "Erro interno ao deletar psicólogo." });
    }
  }
}

export default new PsicologoController();
