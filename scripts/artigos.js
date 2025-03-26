function loadArtigos(n){
    const artigos = [ 
        {img:'',
        artigo: `Segundo a OMS em seu relatório sobre Saúde Mental Global ao cumprimento dos 
        objetivos de saúde entre 2013 a 2030. A saúde mental existe em um processo 
        complexo e contínuo de experiências que variam de um estado de bem-estar a 
        estados debilitantes de grande sofrimento e dor emocional.Problemas como crises 
        econômicas, polarização social, emergências de saúde pública e humanitárias 
        generalizadas, deslocamento forçado e a crescente crise climáticas expõe 
        circunstâncias como pobreza, violência e desigualdade como principal elemento de 
        risco ao sofrimentos de problemas de saúde mental.Portanto, nos da Mind, assim 
        como os Objetivos da ODS, temos o compromisso de influenciar no debate sobre 
        saúde mental e disponibilizar um ambiente acolhedor para o bem-estar social. 
        Tendo assim a ciência popular que a sáude psicológica é valida e é um direito de 
        todos.
        <br><br>
        Recomendamos a leitura de artigos aprofundados sobre o assunto:
        <br><br>`,
        ref: "https://www.who.int/teams/mental-health-and-substance-use/world-mental-health-report",
        },
        {
            artigo: `Os principais numeros de emergência e serviços publicos do brasil: <br>
            Polícia Militar: 190 <br>
            Bombeiros: 193 <br>
            Polícia Civil: 197 <br>
            Disque Denúncia: 118 <br>
            Guarda Municipal: 153 <br>
            Polícia Rodoviária Federal: 191 <br>
            Polícia Rodoviária Estadual: 198 <br>
            Defesa Civil 199: <br>
            Samu: 192`,
            ref: "",
            },
    ]
    let ref_text = ''
    if (artigos[n].ref != ''){
        ref_text = `<a href="${artigos[n].ref}">${artigos[n].ref}</a>`
    }

    return artigos[n].artigo + ref_text
}


function getArtigo(own, n){
    let text = ''
    text += loadArtigos(n)
    own.nextElementSibling.classList.toggle('artigo-texto-inside')
    own.nextElementSibling.innerHTML = text;
}

