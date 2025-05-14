// Adiciona o listener a todos os botões "ver"
document.querySelectorAll('.hm-btn-ver').forEach(botao => {
  botao.addEventListener('click', function () {
    const card = botao.closest('.card-psychologist');

    // Pegando os dados do card
    const foto = card.querySelector('.psi-foto-perfil img').getAttribute('src');
    const nome = card.querySelector('.nome-psi').textContent.trim();
    const idade = card.querySelector('.idade-psi').textContent.trim();
    const local = card.querySelector('.local-psi').textContent.trim();

    // Especialidades
    const especialidadesElements = card.querySelectorAll('.hm-psi-stats');
    const especialidades = Array.from(especialidadesElements).map(el => el.textContent.trim());

    // Preenchendo o popup
    document.getElementById('pop-up-img').src = foto;
    document.getElementById('pop-up-name').textContent = nome;
    document.getElementById('pop-up-idade').textContent = idade;
    document.getElementById('pop-up-local').textContent = local;

    // Preencher lista de especialidades
    const ul = document.getElementById('pop-up-especialidades');
    ul.innerHTML = '';

especialidades.forEach(esp => {
  const li = document.createElement('li');
  const img = document.createElement('img');
  img.src = '../img/check.png';
  img.alt = 'Ícone';
  img.style.width = '16px';
  img.style.marginRight = '8px';
  img.style.verticalAlign = 'middle';
  img.style.filter = "invert()"
  li.appendChild(img);
  li.appendChild(document.createTextNode(esp));

  ul.appendChild(li);
});


    // Mostrar o popup
    document.querySelector('.container-pop-up-agendarConsulta').style.display = 'flex';
  });
});

// Botão para fechar popup
document.getElementById('pop-up-fechar').addEventListener('click', function () {
  document.querySelector('.container-pop-up-agendarConsulta').style.display = 'none';
});
