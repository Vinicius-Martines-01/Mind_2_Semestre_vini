import express from "express";
import PacienteController from "../controllers/PacienteController.js";
import PsicologoController from "../controllers/PsicologoController.js";
import VoluntarioController from "../controllers/VoluntarioController.js";

const router = express.Router();

// Rotas para Pacientes
// A rota POST /paciente/ agora chama diretamente o método do controller que lida com req, res
router.post("/pacientes", PacienteController.criar);
router.get("/pacientes", PacienteController.listarTodos);
router.get("/pacientes/:id", PacienteController.buscarPorId);
// A rota /paciente/email/:email foi mantida, mas o controller foi ajustado para buscar por req.params
router.get("/pacientes/email/:email", PacienteController.buscarPorEmail);
router.put("/pacientes/:id", PacienteController.atualizar);
router.delete("/pacientes/:id", PacienteController.deletar);

// A rota /paciente/nome/:nome e /paciente/login foram removidas pois a lógica de 
// buscar por nome genérico e login foi simplificada ou deve ser tratada 
// de forma mais específica (ex: autenticação separada).

// Rotas para Psicólogos
router.post("/psicologos", PsicologoController.criar);
router.get("/psicologos", PsicologoController.listarTodos);
router.get("/psicologos/:id", PsicologoController.buscarPorId);
router.put("/psicologos/:id", PsicologoController.atualizar);
router.delete("/psicologos/:id", PsicologoController.deletar);

// Rotas para Voluntários
router.post("/voluntarios", VoluntarioController.criar);
router.get("/voluntarios", VoluntarioController.listarTodos);
router.get("/voluntarios/:id", VoluntarioController.buscarPorId);
router.put("/voluntarios/:id", VoluntarioController.atualizar);
router.delete("/voluntarios/:id", VoluntarioController.deletar);

export default router;
