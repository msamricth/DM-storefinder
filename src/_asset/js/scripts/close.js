document.querySelector(".close-alert").addEventListener("click", closeAlrt);

function closeAlrt(){
    const alertCNTR = document.querySelector(".fade-map-elements");
    alertCNTR.classList.remove('show');
}