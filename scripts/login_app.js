
function local(){

    if (localStorage.getItem('usersHere') === null) {
        const ds = [ 
            { id: 1, login: "gabriel", password: "1234", email: "gabriel@gmail.com", psi: false, img_perfil:''},//[0]
            { id: 2, login: "amanda", password: "12345@", email: "amanda@gmail.com", psi: false, img_perfil:'amanda.png'},//[1]
            { id: 3, login: "ladygaga", password: "123456@", email: "ladygaga@gmail.com", psi: false, img_perfil:''},//[2]
            { id: 4, login: "snoopy", password: "1950", email: "snoopy@gmail.com", psi: false, img_perfil:'snoopy.png'}
         ]
        let n = JSON.stringify(ds);
        localStorage.setItem("usersHere", n);   
        return ds  
    } 

}

function doLogin(event){
    event.preventDefault();

    const usuarios = JSON.parse(localStorage.getItem("usersHere"))
    
    let log = document.querySelector("#login0").value
    let senha = document.querySelector('#password0').value

        for(let i = 0; i < usuarios.length; i++){
            if((log == usuarios[i].login || log == usuarios[i].email) && senha == usuarios[i].password){
                let n = JSON.stringify(usuarios[i]);
                sessionStorage.setItem("user", n)
                window.location.href =  window.location.href.replace("login.html","") + "home.html"
                break
            }
}       
}

function cadastrar(event) {
    event.preventDefault();

    var usuarios = JSON.parse(localStorage.getItem("usersHere"))
    let nome = document.querySelector("#nome1").value
    let senha = document.querySelector("#password1").value
    let email = document.querySelector("#email1").value

    if (nome !== '' && senha !== '' && email !== ''){
        let user = { id: Date.now(), login: nome, password: senha, email:email, psi: false, img_perfil:''}
        usuarios.push(user)
        
        localStorage.setItem("usersHere", JSON.stringify(usuarios))
        alert('Conta Registrada!')
        window.location.href =  window.location.href.replace("/pages/cadastro.html","")
    
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
