// os pacientes o vetor mais top das galaxias (só porque tem o snoopy)
export function getPacientes(){
    const ds = [ 
        { id: 1, login: "gabriel", password: "2000", email: "gabriel@gmail.com", nome:"Gabriel", sobrenome:"", 
            genero:"Masculino", dt_nascimento:'2000-09-13', telefone:"(12) 2959-7375", local:"São Paulo", img_perfil:'perfil-snoopy.png'},
        { id: 2, login: "snoopy", password: "1950", email: "snoopy@gmail.com", nome:"Snoopy", sobrenome:"", 
            genero:"Masculino", dt_nascimento:'1969-09-13', telefone:"(79) 2337-2615", local:"São Paulo", img_perfil:'perfil-snoopy.png'},
        { id: 3, login: "scooby", password: "1950", email: "scooby@gmail.com", nome:"Scoobert", sobrenome:"Cornelius Doo", 
            genero:"Masculino", dt_nascimento:'1950-10-04', telefone:"(61) 3070-0787", local:"São Paulo", img_perfil: 'perfil-scooby.png' },
    ]
    return ds
}
// Get Psicologos
export function getPsicologo(){
    const ds = [ 
        { id: 1, login: "Robson Souza", password: "2000", email: "robson_souza@gmail.com", crp:'CRP-06/123456', nome:"Robson", sobrenome:"Souza", 
            genero:"Masculino", dt_nascimento:'1997-04-13', telefone:"(12) 2959-7375", local:"São Paulo", img_perfil:'psi_1.png',
            especialidade: [1, 2, 4]},
    ]
    return ds
}

export function getEspecialidades(){
    const ds = [ 
        {nome: 'Ansiedade'},
        {nome: 'Casais'},
        {nome: 'Conflitos familiares'},
        {nome: 'Dependencia Química'},
        {nome: 'Insonia'},
    ]
    return ds
}
