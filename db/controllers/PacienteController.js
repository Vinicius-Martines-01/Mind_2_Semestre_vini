
import Paciente from '../models/createPacientes.js'; 

class pacienteController {
  async criar(nome, email, senha, dt_nascimento, genero, telefone, endereco) {
    const usuario = await Paciente.create({ nome, email, senha, dt_nascimento, genero, telefone, endereco});
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

  
}

export default new pacienteController();
