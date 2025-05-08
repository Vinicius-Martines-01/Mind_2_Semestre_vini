import Paciente from '../db/models/Paciente.js'; 
import { getPacientes } from '../../scripts/login_app.js';
class PacienteController {
  async cadastrar(nome, email, senha) {
    // dt_nascimento, genero, telefone, endereco
    const usuario = await Paciente.create({ nome, email, senha});
    console.log('Usuário criado:', usuario.toJSON());
  }

  async listarTodos() {
    const usuarios = await Paciente.findAll();
    return usuarios.map(u => u.toJSON());
  }

  async buscarPorEmail(email) {
    const usuario = await Paciente.findOne({ where: { email } });
    return usuario ? usuario.toJSON() : null;
  }

  async buscarPorNome(nome) {
    const usuario = await Paciente.findOne({ where: { nome } });
    return usuario ? usuario.toJSON() : null;
  }

  async buscarPorLogin(login) {
    const where = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(login)
      ? { email: login }
      : { nome: login };

    const usuario = await Paciente.findOne({ where });
    return usuario ? usuario.toJSON() : null;
  }

  // CRIA OS USUARIOS PADRÕES / AKA SNOOPY SUPREMACY
  async criarPacienteDefault() {
    const ds = getPacientes() 

    try {
      // deleta os pacientes antigos caso existam
      // resolve o problema
      await Paciente.destroy({ where: {}, truncate: true });
  
      for (const item of ds) {
        const novoUser = await Paciente.create({
          nome: item.login,
          email: item.email,
          senha: item.password,
          img_perfil: item.img_perfil
        });
        console.log(`Usuário |${item.login}| criado`, novoUser.toJSON());
      }
  
      console.log('Usuários de exemplo recriados com sucesso!');
    } catch (err) {
      console.error('Erro ao criar usuários de exemplo:', err);
    }
  }
}

export default new PacienteController();
