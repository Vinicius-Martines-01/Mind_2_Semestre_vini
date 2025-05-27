import Psicologo from '../db/models/Psicologo.js';
import Consulta from '../db/models/Consulta.js';
import Pagamento from '../db/models/Pagamento.js';
import Especialidade from '../db/models/Especialidade.js';
import PsicologoEspecialidade from '../db/models/PsicologoEspecialidade.js';

import { getEspecialidades, getPsicologo } from '../scripts/userVectors.js';


// Definindo o relacionamento
Psicologo.belongsToMany(Especialidade, {
  through: PsicologoEspecialidade,
  foreignKey: 'ID_Psicologo',
  otherKey: 'ID_Especialidade',
});

Especialidade.belongsToMany(Psicologo, {
  through: PsicologoEspecialidade,
  foreignKey: 'ID_Especialidade',
  otherKey: 'ID_Psicologo',
});

class PsicologoController {
  async criarEspecialidadeDefault() {
    const ds = getEspecialidades() 
    try {
      // Adiciona as Especialidades
      for (const item of ds) {
        const novaEspecialidade = await Especialidade.create({
          nome: item.nome,
        });
        console.log(`Especialidade |${item.nome}| criada`, novaEspecialidade.toJSON());
      }

      console.log('Especialidade criada com sucesso!');
    } catch (err) {
      console.error('Erro ao criar Especialidade de exemplo:', err);
    }
  }

  // CRIA OS PSICOLOGOS PADRÕES
  async criarPsicologoDefault() {
    const ds = getPsicologo() 

    try {
      //await Psicologo.destroy({ where: {}, truncate: true });
  
      for (const item of ds) {
        const novoUser = await Psicologo.create({
          login: item.login,
          email: item.email,
          senha: item.password,
          crp: item.crp,

          nome: item.nome,
          sobrenome: item.sobrenome,
          dt_nascimento: item.dt_nascimento,
          genero: item.genero,

          telefone: item.telefone,
          endereco: item.endereco,

          img_perfil: item.img_perfil
        });
        // FAZ O LOOP PARA COLOCAR AS ESPECIALIDADES
        for (const spec of item.especialidade) {
          const especialidade = await Especialidade.findByPk(spec); // ID da especialidade
      
          await novoUser.addEspecialidade(especialidade);
          
        }

        console.log(`Psicologo |${item.login}| criado`, novoUser.toJSON());
      }

      console.log('Psicologo de exemplo criados com sucesso!');
    } catch (err) {
      console.error('Erro ao criar Psicologo de exemplo:', err);
    }
  }

  async cadastrar(dados) {
    const novoPsicologo = await Psicologo.create(dados);
    return novoPsicologo.toJSON();
  }

  async listarTodos() {
    const psicologos = await Psicologo.findAll();
    return psicologos.map(p => p.toJSON());
  }

  async buscarPorEmail(email) {
    const psicologo = await Psicologo.findOne({ where: { email } });
    return psicologo ? psicologo.toJSON() : null;
  }

  async buscarPorId(id) {
    const psicologo = await Psicologo.findOne({ where: { id } });
    return psicologo ? psicologo.toJSON() : null;
  }

  async atualizar(id, camposAtualizados) {
    await Psicologo.update(camposAtualizados, { where: { id } });
  }

  async deletar(id) {
    await Psicologo.destroy({ where: { id } });
  }
}

export default new PsicologoController();
