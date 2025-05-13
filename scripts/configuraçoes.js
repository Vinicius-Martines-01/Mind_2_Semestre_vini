PORT = 8080 // servidor

const btn_imagePreview = document.querySelector("#file-image")
btn_imagePreview.addEventListener('change', (event) => {
    const hasImage = event.target.files[0]; // Acessando o primeiro arquivo
    if(hasImage){ // Se tiver imagem, automaticamente será true
        const imagePreview = document.querySelector("#imagePreview")
        const imageURL = URL.createObjectURL(hasImage); // Cria uma URL para a imagem que esta no arquivo local
        imagePreview.src = imageURL;
    }
})

// pop-up-deletar----------------------------------

const abrir_pop_up = document.getElementById("btn-abrir-pop-up");
const pop_up_deletar = document.getElementById("pop-up-deletar");
const fechar_pop_up = document.getElementById("btn-fechar-pop-up");

abrir_pop_up.addEventListener("click", () => {
    pop_up_deletar.style.display = "flex";
});
fechar_pop_up.addEventListener("click", () => {
    pop_up_deletar.style.display = "none";
})



// DB ----------------------------------

// devolve os valores para eles serem modificados
window.addEventListener('DOMContentLoaded', async () => {
    usuario = JSON.parse(sessionStorage.getItem("mind_user"))

    try {
        const response = await fetch(`http://localhost:${PORT}/api/paciente/${usuario.id}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });

        const dados_do_usuario = await response.json();

        if (response.ok) {
            // devolve o nome da Imagem
            document.getElementById('imagePreview').src = '../server/img/user/perfil_' + usuario.img_perfil; 
            // devolve o nome e o email
            document.getElementById('nomeEdit').value = dados_do_usuario.nome;
            document.getElementById('sobrenomeEdit').value = dados_do_usuario.sobrenome;

            document.getElementById('telefoneEdit').value = dados_do_usuario.telefone;

            document.getElementById('loginEdit').value = dados_do_usuario.login;
            document.getElementById('emailEdit').value = dados_do_usuario.email;
            document.getElementById('senhaEdit').value = dados_do_usuario.senha;

            document.getElementById('localEdit').value = dados_do_usuario.endereco;
            document.getElementById('generoEdit').value = dados_do_usuario.genero;

            // para converter YYYY/MM/DD do banco de dados para DD/MM/YYYY 
            const [ano, mes, dia] = dados_do_usuario.dt_nascimento.split('-');
            document.getElementById('nascimentoEdit').value = `${dia.padStart(2, '0')}/${mes.padStart(2, '0')}/${ano}`;

        }
    } catch (error) {
    console.log(`Erro na requisição: ${error.message}`);
    }
});

const form = document.getElementById("formAtualizar");

form.addEventListener("submit", function(event) {
     event.preventDefault();
});

// atualizar o BD
document.getElementById('btnAtualizarPerfil').addEventListener('click', async () => {
  const usuario = JSON.parse(sessionStorage.getItem("mind_user"));

  const nome = document.getElementById('nomeEdit').value 
  const sobrenome = document.getElementById('sobrenomeEdit').value
  const dt_nascimento = document.getElementById('nascimentoEdit').value

  const telefone = document.getElementById('telefoneEdit').value 
  const endereco =  document.getElementById('localEdit').value 
  const genero = document.getElementById('generoEdit').value 

  const login = document.getElementById('loginEdit').value;
  const email = document.getElementById('emailEdit').value;
  const senha = document.getElementById('senhaEdit').value;


  try {
    const response = await fetch(`http://localhost:${PORT}/api/paciente/atualizar/${usuario.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome, sobrenome, dt_nascimento, telefone, endereco, genero, login, email, senha })
    });
    // se ok: fazer login denovo
    if (response.ok) {
        try {
          const response = await fetch(`http://localhost:${PORT}/api/paciente/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ login, senha })
          });
          const data = await response.json();
      
          if (response.ok) {
              let n = JSON.stringify(data.user);
              sessionStorage.setItem("mind_user", n)
              window.location.reload(true)
          } else {
              console.log(`Erro: ${data.erro}`);
          }

        } catch (error) {
        console.log(`Erro na requisição: ${error.message}`);
        }
    } else { 
      const errorText = await response.text();
      throw new Error(`Erro: ${response.status} - ${errorText}`);      
    }

    const result = await response.json();
    console.log("Perfil atualizado com sucesso:", result);

  } catch (error) {
    console.error("Erro ao atualizar perfil:", error.message);
  }



});

// deleta o database 
document.getElementById('btnADeletarPerfil').addEventListener('click', async () => {
  const usuario = JSON.parse(sessionStorage.getItem("mind_user"));

  try {
    const response = await fetch(`http://localhost:${PORT}/api/paciente/deletar/${usuario.id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await response.json();

    if (response.ok) {
      // deleta o user do vetor e faz logout
      sessionStorage.removeItem("mind_user")
      window.location.href =  window.location.href.replace("/pages/configuracoes.html","")

    } else {
      console.log(`Erro: ${data.erro}`);
    }
  } catch (error) {
    console.log(`Erro na requisição: ${error.message}`);
  }
});


// trocar Imagem
document.getElementById('file-image').addEventListener('change', async (e) => {
  console.log('one')
});
