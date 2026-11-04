let btnMenu = document.getElementById('btn-menu')
let menu = document.getElementById('menu-mobile')
let overlay = document.getElementById('overlay-menu')

btnMenu.addEventListener('click', ()=>{
    menu.classList.add('abrir-menu')
})

menu.addEventListener('click', ()=>{
    menu.classList.remove('abrir-menu')
})

overlay.addEventListener('click', ()=>{
    menu.classList.remove('abrir-menu')
})

// SCROLL TOP
let btnScrollTop = document.getElementById('scroll-top')

window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
        btnScrollTop.classList.add('show')
    } else {
        btnScrollTop.classList.remove('show')
    }
})

btnScrollTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    })
})

// REVEAL SECTIONS
const reveals = document.querySelectorAll('.reveal');

const revealOnScroll = () => {
    reveals.forEach(reveal => {
        const windowHeight = window.innerHeight;
        const revealTop = reveal.getBoundingClientRect().top;
        const revealPoint = 150;

        if (revealTop < windowHeight - revealPoint) {
            reveal.classList.add('active');
        }
    });
};

window.addEventListener('scroll', revealOnScroll);
revealOnScroll(); // Run once on load


document.addEventListener('DOMContentLoaded', () => {
    const track = document.getElementById('portfolio-track');
    const btnEsquerda = document.getElementById('seta-esquerda');
    const btnDireita = document.getElementById('seta-direita');

    if (!track || !btnEsquerda || !btnDireita) return;

    // Guarda os projetos originais (funciona com 4, 5, 10... quantos forem colocados no HTML)
    const projetos = Array.from(track.children);
    let paginaAtual = 0;

    // Define quantos projetos aparecem por "grelha" conforme o tamanho do ecrã
    function projetosPorPagina() {
        const largura = window.innerWidth;
        if (largura <= 700) return 1;
        if (largura <= 1020) return 2;
        return 4;
    }

    // Agrupa os projetos em páginas de X itens e monta o carrossel
    function montarCarrossel() {
        const porPagina = projetosPorPagina();
        const totalPaginas = Math.ceil(projetos.length / porPagina);

        track.innerHTML = '';

        for (let i = 0; i < totalPaginas; i++) {
            const pagina = document.createElement('div');
            pagina.classList.add('portfolio-pagina');

            const grupo = projetos.slice(i * porPagina, i * porPagina + porPagina);
            grupo.forEach(item => pagina.appendChild(item));

            track.appendChild(pagina);
        }

        if (paginaAtual > totalPaginas - 1) paginaAtual = totalPaginas - 1;
        if (paginaAtual < 0) paginaAtual = 0;

        atualizarPosicao(totalPaginas);
    }

    // Desliza o carrossel para a página atual e ativa/desativa as setas
    function atualizarPosicao(totalPaginas) {
        track.style.transform = `translateX(-${paginaAtual * 100}%)`;

        const semNavegacao = totalPaginas <= 1;

        btnEsquerda.style.display = semNavegacao ? 'none' : 'flex';
        btnDireita.style.display = semNavegacao ? 'none' : 'flex';

        btnEsquerda.classList.toggle('desativado', paginaAtual === 0);
        btnDireita.classList.toggle('desativado', paginaAtual === totalPaginas - 1);
    }

    btnDireita.addEventListener('click', () => {
        const totalPaginas = track.children.length;
        if (paginaAtual < totalPaginas - 1) {
            paginaAtual++;
            atualizarPosicao(totalPaginas);
        }
    });

    btnEsquerda.addEventListener('click', () => {
        const totalPaginas = track.children.length;
        if (paginaAtual > 0) {
            paginaAtual--;
            atualizarPosicao(totalPaginas);
        }
    });

    montarCarrossel();

    // Reagrupa o carrossel quando o utilizador redimensiona a janela
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(montarCarrossel, 200);
    });
});