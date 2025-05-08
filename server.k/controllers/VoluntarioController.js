import Voluntario from "../db/models/Voluntario.js";
import bcrypt from "bcrypt";

const saltRounds = 10;

class VoluntarioController {
  async criar(req, res) {
    const { nome, email, senha, area_interesse, disponibilidade, telefone } = req.body;
    try {
      if (!nome || !email || !senha) {
        return res.status(400).json({ error: "Nome, email e senha são obrigatórios." });
      }

      const hashedPassword = await bcrypt.hash(senha, saltRounds);
      const novoVoluntario = await Voluntario.create({
        nome,
        email,
        senha: hashedPassword,
        area_interesse,
        disponibilidade,
        telefone,
      });
      res.status(201).json(novoVoluntario);
    } catch (error) {
      console.error("Erro ao criar voluntário:", error);
      if (error.name === "SequelizeUniqueConstraintError") {
        return res.status(409).json({ error: "Email já cadastrado." });
      }
      res.status(500).json({ error: "Erro interno ao criar voluntário." });
    }
  }

  async listarTodos(req, res) {
    try {
      const voluntarios = await Voluntario.findAll({
        attributes: { exclude: ["senha"] },
      });
      res.status(200).json(voluntarios);
    } catch (error) {
      console.error("Erro ao listar voluntários:", error);
      res.status(500).json({ error: "Erro interno ao listar voluntários." });
    }
  }

  async buscarPorId(req, res) {
    const { id } = req.params;
    try {
      const voluntario = await Voluntario.findByPk(id, {
        attributes: { exclude: ["senha"] },
      });
      if (!voluntario) {
        return res.status(404).json({ error: "Voluntário não encontrado." });
      }
      res.status(200).json(voluntario);
    } catch (error) {
      console.error("Erro ao buscar voluntário por ID:", error);
      res.status(500).json({ error: "Erro interno ao buscar voluntário." });
    }
  }

  async atualizar(req, res) {
    const { id } = req.params;
    const dadosAtualizacao = req.body;
    try {
      const voluntario = await Voluntario.findByPk(id);
      if (!voluntario) {
        return res.status(404).json({ error: "Voluntário não encontrado." });
      }

      if (dadosAtualizacao.senha) {
        dadosAtualizacao.senha = await bcrypt.hash(dadosAtualizacao.senha, saltRounds);
      }

      const [numLinhasAfetadas, voluntariosAtualizados] = await Voluntario.update(dadosAtualizacao, {
        where: { id },
        returning: true,
      });

      if (numLinhasAfetadas > 0) {
        const voluntarioAtualizado = await Voluntario.findByPk(id, { attributes: { exclude: ["senha"] } });
        return res.status(200).json(voluntarioAtualizado);
      }
      return res.status(404).json({ error: "Voluntário não encontrado para atualização ou nenhum dado alterado." });

    } catch (error) {
      console.error("Erro ao atualizar voluntário:", error);
       if (error.name === "SequelizeUniqueConstraintError" && dadosAtualizacao.email) {
        return res.status(409).json({ error: "Email já cadastrado por outro usuário." });
      }
      res.status(500).json({ error: "Erro interno ao atualizar voluntário." });
    }
  }

  async deletar(req, res) {
    const { id } = req.params;
    try {
      const voluntario = await Voluntario.findByPk(id);
      if (!voluntario) {
        return res.status(404).json({ error: "Voluntário não encontrado." });
      }
      await voluntario.destroy();
      res.status(204).send();
    } catch (error) {
      console.error("Erro ao deletar voluntário:", error);
      res.status(500).json({ error: "Erro interno ao deletar voluntário." });
    }
  }
}

export default new VoluntarioController();
