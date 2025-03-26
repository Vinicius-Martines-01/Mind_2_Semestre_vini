
function copyNumber() {
    const cellNumber = document.getElementById('cell-n');

  try {
    navigator.clipboard.writeText(cellNumber.textContent);

  } catch (error) {
    console.error('não foi', error);
  }
}



function toHome(page){
  usuario = JSON.parse(sessionStorage.getItem('user'))
  if (usuario === null) {
      window.location.href =  window.location.href.replace("pages/"+page,"") + ""
  } else {
      window.location.href =  window.location.href.replace(page,"") + "home.html"   
  }
}

function changeNav(){
  const navButtons = document.querySelector('.nav-right-buttons')
  usuario = JSON.parse(sessionStorage.getItem('user'))
  let navB = ''
  if (usuario !== null) {
    navB += `<div></div>
            <button type="button"  class="nav-btn"
              style="background-image: url('/img/magnifying-glass-solid.png');">
            </button>  
            <a href="/pages/perfil-paciente.html">
            <button type="button"  class="nav-btn"
              style="background-image: url('/img/user-regular.png');
              margin-right: 20%;">
            </button>`} else { 
              navB += ` <div></div>
                        <button type="button"  class="nav-btn"
                            style="background-image: url('/img/magnifying-glass-solid.png');">
                        </button> 
                        <div onmouseenter="dropNav(this)" onmouseleave="closeNav(this)" class="nav-right">
                            <button type="button" class="nav-btn-login">login</button>
                            <div></div>
                        </div> `
            }
    navButtons.innerHTML = navB
}


function dropNav(own){
  document.querySelector('.nav-btn-login').classList.add('hover-state')
  const hr = this.window.location.href;
  let str = ''
  if (hr.includes('pages')) {
    str = '.';
  } else {
    str = 'pages';
  }

  console.log(this.window.location.href)
  own.children[1].innerHTML = `<div class=nav-login-drop-wrapper>
                                  <div class="nav-login-drop">
                                      <a href="${str}/login.html">
                                          <button type="button" onclick="setUserType(0)" class="nav-drop-btn">Paciente</button>
                                      </a>
                                      <a href="${str}/login.html">
                                          <button type="button" onclick="setUserType(1)" class="nav-drop-btn">Psicólogo</button>
                                          <button type="button" onclick="setUserType(2)" class="nav-drop-btn">Voluntário</button>
                                      </a>
                                  </div>`

}

function closeNav(own){
  document.querySelector('.nav-btn-login').classList.remove('hover-state')

  own.children[1].innerHTML = ''
}
