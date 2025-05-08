import Paciente from "../db/models/Paciente.js";
import bcrypt from "bcrypt";

const saltRounds = 10;

class PacienteController {
  async criar(req, res) {
    const { nome, email, senha, dt_nascimento, genero, telefone, endereco, img_perfil } = req.body;
    try {
      if (!nome || !email || !senha) {
        return res.status(400).json({ error: "Nome, email e senha são obrigatórios." });
      }

      const hashedPassword = await bcrypt.hash(senha, saltRounds);
      const novoPaciente = await Paciente.create({
        nome,
        email,
        senha: hashedPassword,
        dt_nascimento,
        genero,
        telefone,
        endereco,
        img_perfil
      });
      // Removendo a senha do objeto retornado
      const pacienteSemSenha = novoPaciente.toJSON();
      delete pacienteSemSenha.senha;
      res.status(201).json(pacienteSemSenha);
    } catch (error) {
      console.error("Erro ao criar paciente:", error);
      if (error.name === "SequelizeUniqueConstraintError") {
        return res.status(409).json({ error: "Email já cadastrado." });
      }
      res.status(500).json({ error: "Erro interno ao criar paciente." });
    }
  }

  async listarTodos(req, res) {
    try {
      const pacientes = await Paciente.findAll({
        attributes: { exclude: ["senha"] } // Não retornar a senha
      });
      res.status(200).json(pacientes);
    } catch (error) {
      console.error("Erro ao listar pacientes:", error);
      res.status(500).json({ error: "Erro interno ao listar pacientes." });
    }
  }

  async buscarPorId(req, res) {
    const { id } = req.params;
    try {
      const paciente = await Paciente.findByPk(id, {
        attributes: { exclude: ["senha"] }
      });
      if (!paciente) {
        return res.status(404).json({ error: "Paciente não encontrado." });
      }
      res.status(200).json(paciente);
    } catch (error) {
      console.error("Erro ao buscar paciente por ID:", error);
      res.status(500).json({ error: "Erro interno ao buscar paciente." });
    }
  }

  async buscarPorEmail(req, res) {
    const { email } = req.params; // Ajustado para req.params conforme userRoutes.js original
    try {
      const paciente = await Paciente.findOne({ 
        where: { email },
        attributes: { exclude: ["senha"] }
      });
      if (!paciente) {
        return res.status(404).json({ error: "Paciente não encontrado com este email." });
      }
      res.status(200).json(paciente);
    } catch (error) {
      console.error("Erro ao buscar paciente por email:", error);
      res.status(500).json({ error: "Erro interno ao buscar paciente por email." });
    }
  }

  async atualizar(req, res) {
    const { id } = req.params;
    const dadosAtualizacao = req.body;
    try {
      const paciente = await Paciente.findByPk(id);
      if (!paciente) {
        return res.status(404).json({ error: "Paciente não encontrado." });
      }

      if (dadosAtualizacao.senha) {
        dadosAtualizacao.senha = await bcrypt.hash(dadosAtualizacao.senha, saltRounds);
      }

      const [numLinhasAfetadas] = await Paciente.update(dadosAtualizacao, {
        where: { id },
      });

      if (numLinhasAfetadas > 0) {
        const pacienteAtualizado = await Paciente.findByPk(id, { attributes: { exclude: ["senha"] } });
        return res.status(200).json(pacienteAtualizado);
      }
      // Se numLinhasAfetadas for 0, pode ser que o paciente exista mas nenhum dado foi de fato alterado.
      // Retornar o paciente existente sem modificação ou uma mensagem específica.
      const pacienteExistente = await Paciente.findByPk(id, { attributes: { exclude: ["senha"] } });
      return res.status(200).json({ message: "Nenhum dado alterado ou dados iguais aos existentes.", paciente: pacienteExistente });

    } catch (error) {
      console.error("Erro ao atualizar paciente:", error);
      if (error.name === "SequelizeUniqueConstraintError" && dadosAtualizacao.email) {
        return res.status(409).json({ error: "Email já cadastrado por outro usuário." });
      }
      res.status(500).json({ error: "Erro interno ao atualizar paciente." });
    }
  }

  async deletar(req, res) {
    const { id } = req.params;
    try {
      const paciente = await Paciente.findByPk(id);
      if (!paciente) {
        return res.status(404).json({ error: "Paciente não encontrado." });
      }
      await paciente.destroy();
      res.status(204).send();
    } catch (error) {
      console.error("Erro ao deletar paciente:", error);
      res.status(500).json({ error: "Erro interno ao deletar paciente." });
    }
  }
}

export default new PacienteController();
