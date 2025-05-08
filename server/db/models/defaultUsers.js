export function getPacientes(){
    const ds = [ 
        { id: 1, login: "gabriel", password: "1234", email: "gabriel@gmail.com", img_perfil:''},//[0]
        { id: 2, login: "amanda", password: "12345@", email: "amanda@gmail.com", img_perfil:'amanda.png'},//[1]
        { id: 3, login: "ladygaga", password: "123456@", email: "ladygaga@gmail.com", img_perfil:''},//[2]
        { id: 4, login: "snoopy", password: "1950", email: "snoopy@gmail.com", img_perfil:'snoopy.png'},
        { id: 5, login: "scooby", password: "1950", email: "scooby@gmail.com", img_perfil: 'scooby.png' }
    ]
    return ds
}
