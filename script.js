
const popup = document.getElementById("popup");

// ABRIR POPUP
function openPopup() {

    popup.style.display = "flex";

}

// FECHAR POPUP
function closePopup() {

    popup.style.display = "none";

}

// ABRIR AUTOMATICAMENTE
setTimeout(() => {

    popup.style.display = "flex";

}, 10000);

// FECHAR CLICANDO FORA
popup.addEventListener("click", function(e){

    if(e.target === popup){

        closePopup();

    }

});

// PRELOAD IFRAME
window.addEventListener("load", () => {

    const iframe = document.querySelector(".cassino-frame");

    if(iframe){

        iframe.style.opacity = "1";

    }

});

// DETECTAR MOBILE
function isMobile(){

    return /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

}

// ANALYTICS EVENTOS
function trackClick(nome){

    if(typeof gtag !== "undefined"){

        gtag('event', 'click_site', {

            event_category: 'engajamento',
            event_label: nome

        });

    }

}

// BOTÕES FOOTER
document.querySelectorAll(".footer-btn").forEach(btn => {

    btn.addEventListener("click", () => {

        trackClick(btn.innerText);

    });

});

// SEO DINÂMICO
document.addEventListener("DOMContentLoaded", () => {

    // TÍTULO DINÂMICO
    const titulos = [

        "Banca Brasileira Oficial",
        "Cassino Online com Bônus",
        "Slots e Cassino ao Vivo",
        "Banca Brasileira Bet"

    ];

    let index = 0;

    setInterval(() => {

        document.title = titulos[index];

        index++;

        if(index >= titulos.length){

            index = 0;

        }

    }, 4000);

});

// DESABILITAR CLIQUE DIREITO
document.addEventListener("contextmenu", e => {

    e.preventDefault();

});

// DESABILITAR F12
document.addEventListener("keydown", function(e){

    if(e.key === "F12"){

        e.preventDefault();

    }

});

// DETECTAR ONLINE/OFFLINE
window.addEventListener("offline", () => {

    alert("Você está sem internet.");

});

window.addEventListener("online", () => {

    console.log("Internet restaurada.");

});

// INSTALAÇÃO PWA
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {

    e.preventDefault();

    deferredPrompt = e;

});

// PERFORMANCE
window.addEventListener("load", () => {

    document.body.classList.add("loaded");

});

console.log("Banca Brasileira carregada com sucesso.");
