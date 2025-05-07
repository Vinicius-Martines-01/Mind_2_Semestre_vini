/*
    Código pra abrir o servidor e criar os quatro usuários padrões  
    EXECUTE: node ./db/default.js
*/
import './server.js';

import sequelize from './database.js';
import Paciente from './models/modeloPaciente.js';

async function insertDefault() {

    try {
        await sequelize.authenticate();
        await sequelize.sync();

        // o vetor mais amigo de todos
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
                console.log(`Usuário |${ds[i].login}| já foi adicionado`);
            } else {
                // cria os usuários
                let novoUser = await Paciente.create({ 
                    nome: ds[i].login, 
                    email: ds[i].email, 
                    senha: ds[i].password,
                    img_perfil: ds[i].img_perfil
                });
                console.log(`Usuário |${ds[i].login}| criado`, novoUser.toJSON());
            }
        }

    } catch (error) {
    console.error('Error:', error);
    } 
    // finally { await sequelize.close(); }// fecha a chamada

  }

insertDefault();
