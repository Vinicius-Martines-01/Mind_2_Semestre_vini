import Psicologo from '../db/models/Psicologo.js';

class PsicologoController {
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
