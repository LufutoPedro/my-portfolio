/**
 * Carrossel de Especialidades
 * Controla a navegação por páginas na secção de especialidades.
 */
(function () {
    'use strict';

    const track = document.getElementById('especialidades-track');
    const btnEsq = document.getElementById('seta-esp-esquerda');
    const btnDir = document.getElementById('seta-esp-direita');

    if (!track || !btnEsq || !btnDir) return;

    const paginas = Array.from(track.querySelectorAll('.especialidades-pagina'));
    const total = paginas.length;
    let paginaAtual = 0;

    function atualizar() {
        track.style.transform = 'translateX(-' + paginaAtual * 100 + '%)';
        btnEsq.classList.toggle('desativado', paginaAtual === 0);
        btnDir.classList.toggle('desativado', paginaAtual === total - 1);
    }

    btnEsq.addEventListener('click', function () {
        if (paginaAtual > 0) {
            paginaAtual--;
            atualizar();
        }
    });

    btnDir.addEventListener('click', function () {
        if (paginaAtual < total - 1) {
            paginaAtual++;
            atualizar();
        }
    });

    // Estado inicial
    atualizar();
})();
