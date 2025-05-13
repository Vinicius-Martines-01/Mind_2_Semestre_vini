// os pacientes o vetor mais top das galaxias (só porque tem o snoopy)
export function getPacientes(){
    const ds = [ 
        { id: 1, login: "gabriel", password: "2000", email: "gabriel@gmail.com", nome:"Gabriel", sobrenome:"", 
            genero:"Masculino", dt_nascimento:'2000-09-13', telefone:"(12) 2959-7375", local:"São Paulo", img_perfil:'snoopy.png'},
        { id: 2, login: "snoopy", password: "1950", email: "snoopy@gmail.com", nome:"Snoopy", sobrenome:"", 
            genero:"Masculino", dt_nascimento:'1969-09-13', telefone:"(79) 2337-2615", local:"São Paulo", img_perfil:'snoopy.png'},
        { id: 3, login: "scooby", password: "1950", email: "scooby@gmail.com", nome:"Scoobert", sobrenome:"Cornelius Doo", 
            genero:"Masculino", dt_nascimento:'1950-10-04', telefone:"(61) 3070-0787", local:"São Paulo", img_perfil:'snoopy.png', img_perfil: 'scooby.png' },
    ]
    return ds
}
