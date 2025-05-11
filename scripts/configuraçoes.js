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