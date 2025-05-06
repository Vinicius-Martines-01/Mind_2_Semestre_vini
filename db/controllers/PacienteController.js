
import Paciente from '../models/modeloPaciente.js'; 

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

  // CRIAR PASCIENTE DEFAULT
  async criarPacienteDefault(){
     const ds = [ 
      {login: "gabriel", password: "1234", email: "gabriel@gmail.com", img_perfil:''},//[0]
      {login: "amanda", password: "12345@", email: "amanda@gmail.com", img_perfil:'amanda.png'},//[1]
      {login: "ladygaga", password: "123456@", email: "ladygaga@gmail.com", img_perfil:''},//[2]
      {login: "snoopy", password: "1950", email: "snoopy@gmail.com", img_perfil:'snoopy.png'}
      ]
      
      // faz o loop para criar os usuários no MYSQL
      for (let i=0; i < ds.length; i++){
          let isUserThere = await Paciente.findOne({ where: { email: ds[i].email} }); // Check se o usuário já esta aqui

          if (isUserThere) {
              console.log(`Usuário |${ds[i].login}| já foi adicionado`, isUserThere.toJSON());
          } else {
              // cria os usuários
              let novoUser = await Paciente.create({ 
                  nome: ds[i].login, 
                  email: ds[i].email, 
                  senha: ds[i].password 
              });
              console.log(`Usuário |${ds[i].login}| criado`, novoUser.toJSON());
          }
      }

  }

  
}

export default new pacienteController();
