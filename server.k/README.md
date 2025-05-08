# Projeto Express com Sequelize Atualizado

Este projeto foi atualizado para incluir controllers e modelos para Pacientes, Psicólogos e Voluntários, mantendo a estrutura original com `app.js`, `server.js` e `userRoutes.js`.

## Estrutura do Projeto (dentro da pasta `server`)

```
/server
|-- controllers/
|   |-- PacienteController.js
|   |-- PsicologoController.js
|   |-- VoluntarioController.js
|-- db/
|   |-- models/
|   |   |-- Paciente.js
|   |   |-- Psicologo.js
|   |   |-- Voluntario.js
|   |-- database.js         # Configuração do Sequelize e conexão com o banco
|-- routes/
|   |-- userRoutes.js       # Definição das rotas da API
|-- app.js                  # Configuração principal do Express (middlewares, rotas)
|-- server.js               # Ponto de entrada da aplicação (inicializa servidor e DB)
|-- package.json
|-- package-lock.json
|-- database.sqlite         # Arquivo do banco de dados SQLite (será criado na primeira execução)
|-- README.md               # Este arquivo
```

## Pré-requisitos

- Node.js (versão 14 ou superior recomendada)
- npm (geralmente vem com o Node.js)

## Como Executar

1.  **Descompacte o arquivo `updated_project_kaue.zip`** em um diretório de sua escolha.

2.  **Navegue até o diretório `server`** dentro da pasta descompactada, pelo terminal:
    ```bash
    cd caminho/para/updated_project_kaue/server
    ```

3.  **Instale as dependências** do projeto:
    ```bash
    npm install
    ```

4.  **Inicie o servidor**:
    ```bash
    npm start
    ```
    Isso iniciará o servidor Express (geralmente na porta 8080, conforme definido em `server.js`) e sincronizará os modelos com o banco de dados SQLite, criando o arquivo `database.sqlite` na pasta `server` se ele não existir.

    Você deverá ver mensagens no console indicando que o banco de dados foi sincronizado e o servidor está rodando:
    ```
    Banco de dados sincronizado com sucesso.
    Conexão com o banco de dados estabelecida com sucesso.
    Servidor rodando em http://localhost:8080
    ```

## Endpoints da API (Exemplos)

Todos os endpoints são prefixados com `/api` (conforme definido em `app.js` e `userRoutes.js`).

**Pacientes:**
- `POST /api/pacientes`
- `GET /api/pacientes`
- `GET /api/pacientes/:id`
- `GET /api/pacientes/email/:email`
- `PUT /api/pacientes/:id`
- `DELETE /api/pacientes/:id`

**Psicólogos:**
- `POST /api/psicologos`
- `GET /api/psicologos`
- `GET /api/psicologos/:id`
- `PUT /api/psicologos/:id`
- `DELETE /api/psicologos/:id`

**Voluntários:**
- `POST /api/voluntarios`
- `GET /api/voluntarios`
- `GET /api/voluntarios/:id`
- `PUT /api/voluntarios/:id`
- `DELETE /api/voluntarios/:id`

### Exemplo de Corpo da Requisição (JSON) para Criar um Paciente:
```json
{
  "nome": "Maria Souza",
  "email": "maria.souza@example.com",
  "senha": "outrasenha456",
  "dt_nascimento": "1985-07-22",
  "genero": "Feminino",
  "telefone": "(21) 91234-5678",
  "endereco": "Avenida Principal, 456, Rio de Janeiro, RJ"
}
```

## Observações

-   **Segurança de Senhas:** As senhas são hasheadas usando `bcrypt`.
-   **Banco de Dados:** Utiliza SQLite. Para produção, considere PostgreSQL, MySQL, etc., ajustando `db/database.js`.
-   **CORS:** Configurado em `app.js` para permitir origens específicas. Ajuste conforme necessário.

Este projeto foi atualizado para refletir as funcionalidades solicitadas, mantendo a estrutura de arquivos original. Adapte e expanda conforme suas necessidades.
