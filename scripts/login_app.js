const PORT = 8080; // port principal

// os pacientes
export function getPacientes(){
    const ds = [ 
        { id: 1, login: "gabriel", password: "1234", email: "gabriel@gmail.com", img_perfil:''},//[0]
        { id: 2, login: "amanda", password: "12345@", email: "amanda@gmail.com", img_perfil:'amanda.png'},//[1]
        { id: 3, login: "ladygaga", password: "123456@", email: "ladygaga@gmail.com", img_perfil:''},//[2]
        { id: 4, login: "snoopy", password: "1950", email: "snoopy@gmail.com", img_perfil:'snoopy.png'},
        { id: 5, login: "scooby", password: "1950", email: "scooby@gmail.com", img_perfil: 'scooby.png' },
    ]
    return ds
}

function local(){
    if (window.location.hostname.includes("vercel")){
    // quando não tiver o vetor usuario e o site estiver offline
        if (localStorage.getItem('usersHere') === null) {

            const ds = getPacientes()
            let n = JSON.stringify(ds);
            localStorage.setItem("usersHere", n);   
            return ds  
        }
    }
}


function doLogin(event){
    event.preventDefault();

    let login = document.querySelector("#login0").value
    let senha = document.querySelector('#password0').value

    // check - Versão Online; ELSE - Versão offline
    if (window.location.hostname.includes("vercel")){
        const usuarios = JSON.parse(localStorage.getItem("usersHere")) // busca os usuarios do vetor
    
        for(let i = 0; i < usuarios.length; i++){
            if((login == usuarios[i].login || login == usuarios[i].email) && senha == usuarios[i].password){
                let n = JSON.stringify(usuarios[i]);
                sessionStorage.setItem("user", n)
                window.location.href =  window.location.href.replace("login.html", "home.html")
                break
            }
        }
    } else {
        // FAZ O LOGIN ACESSANDO O BANCO DE DADOS
        (async () => {
            try {
                const response = await fetch(`http://localhost:${PORT}/api/paciente/login`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ login, senha })
                });
                const data = await response.json();
                
                if (response.ok) {
                    let n = JSON.stringify(data.user);
                    sessionStorage.setItem("user", n)
                    window.location.href =  window.location.href.replace("login.html", "home.html") 
                } else {
                    console.log(`Erro: ${data.erro}`);
                }

            } catch (error) {
            console.log(`Erro na requisição: ${error.message}`);
            }

        })();
    }
}

function cadastrar(event) {
    event.preventDefault();

    let nome = document.querySelector("#nome0").value
    let email = document.querySelector("#email0").value
    let senha = document.querySelector("#password0").value

    // faz o cadastro online
    if (window.location.hostname.includes("vercel")){
        var usuarios = JSON.parse(localStorage.getItem("usersHere"))

        if (nome !== '' && senha !== '' && email !== ''){
            let user = { id: Date.now(), login: nome, password: senha, email:email, psi: false, img_perfil:''}
            usuarios.push(user)
            
            localStorage.setItem("usersHere", JSON.stringify(usuarios))
            alert('Conta Registrada!')
            window.location.href =  window.location.href.replace("cadastro.html","login.html")
        
        }
    } else { // faz o cadastro offline usando o pc como servidor
        (async () => {
            try {
                const response = await fetch(`http://localhost:${PORT}/api/paciente`, {
                  method: 'PUT',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ nome, email, senha })
                });
          
                const data = await response.json();
          
                if (response.ok) {
                    window.location.href = window.location.href.replace("cadastro.html","login.html")
                } else {
                  console.log(`Erro: ${data.erro}`);
                }
              } catch (error) {
                console.log(`Erro na requisição: ${error.message}`);
              }
        })();
    }
  
  }


function changePerfilData(){
    const name = document.querySelector('#perfilNome');
    const photo = document.querySelector('#perfilFoto');

    usuario = JSON.parse(sessionStorage.getItem('user'))
    console.log(usuario) // check if user is log
    
    const defaultImage = '/img/perfil_.png'
    
    if (usuario === null) {
        photo.src = defaultImage
      } else {
        name.innerHTML = usuario.login
        name.classList.add('perfilTex')

        if (usuario.img_perfil === ''){
            photo.src = defaultImage
        } else {
            photo.src = '/img/perfil_'+usuario.img_perfil; 
        }
      }

}

function logout(){
    sessionStorage.removeItem("user")
    window.location.href =  window.location.href.replace("/pages/perfil-paciente.html","")
  
}

function setTerapia(val){
    n = JSON.stringify(val);
    sessionStorage.setItem("terapia_n", n)

}

function getTerapia(){
    const NumeroTerapia = JSON.parse(sessionStorage.getItem("terapia_n"))
    
    const streamImage = document.querySelector('#streamImage');
    const srcImage = '/img/stream_'+NumeroTerapia+'.png'
    console.log(srcImage+'   '+streamImage)
    streamImage.src = srcImage;

}
  
function setUserType(val){
    n = JSON.stringify(val);
    sessionStorage.setItem("userType", n)

}

function getUserTypeColor(){
    const userType = JSON.parse(sessionStorage.getItem("userType"))
    
    console.log(userType)
    const tableColors = ['#F8A764', '#1C5841','#00AD6E']

    if (userType !== null){
        const loginContainer = document.querySelector(".container-login");
        const loginBody = document.querySelector(".container-login-body");

        loginContainer.style.backgroundColor = tableColors[userType];
        loginBody.style.boxShadow  = `inset 0px 14px 0px ${tableColors[userType]}`
    }
}

if (typeof window !== 'undefined') {
    window.local = local; 
    window.doLogin = doLogin; 
    window.cadastrar = cadastrar; 
    window.changePerfilData = changePerfilData;
    window.logout = logout;
    window.setTerapia = setTerapia;
    window.getTerapia = getTerapia;
    window.setUserType = setUserType;
    window.getUserTypeColor = getUserTypeColor;
} 
