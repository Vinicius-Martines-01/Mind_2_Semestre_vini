// código para verificar a largura da pagina para assim poder modificar o nav
// check o minimo de 800px de largura
let widthMatch = window.matchMedia("(min-width: 800px)");

function checkPageWidth(mm) {
    if (mm.matches) {
        desktopNav()
    } else {
        mobileNav()
    }
    checkNavLinks(mm.matches)
    
}

// adiciona o eventListener para checar a largura
widthMatch.addEventListener('change', checkPageWidth);

// primeira inicialização
checkPageWidth(widthMatch);

// check se precisa de links pela largura da pagina
function checkNavLinks(check){
    let navLinks = document.querySelector('.cont-nav-center')
    if (check){
        navLinks.classList.remove("null")
        navLinks.innerHTML = `
            <a class="nav-item nav-link" href="/pages/sobrenos.html"> Sobre nós</a>
            <a class="nav-item nav-link" href="javascript:void(0)" onclick="scrollToPos()" > Planos</a>
            <a class="nav-item nav-link" href="/pages/artigos.html"> Artigos</a>`
    } else {
        navLinks.classList.add("null")
        navLinks.innerHTML = ''
    }

}
function desktopNav(){
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
              </button>`
      } else { 
          navB += ` <div></div><div></div>
                    <div class="nav-right" onmouseenter="dropNav(this)" onmouseleave="closeNav(this)">
                        <button type="button" class="nav-btn-login">login</button>
                        <div></div>
                    </div> `
        }
      navButtons.innerHTML = navB
  }

  function mobileNav(){
    let navRightButton = document.querySelector('.nav-right-buttons')
    navRightButton.innerHTML = `
        <div></div><div></div>
        <button type="button"  class="nav-btn"
        style="background-image: url('/img/cardapio.png');
        margin-right: 20%;">
        </button>`
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
  