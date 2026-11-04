// CONTACTO FORM HANDLER
const form = document.getElementById('contacto-form');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const assunto = document.getElementById('assunto').value.trim();
    const mensagem = document.getElementById('mensagem').value.trim();

    // Log de debug
    console.log('📧 Enviando contacto:', { nome, email, assunto });

    // Desabilitar botão durante envio
    const btnEnviar = form.querySelector('.btn-enviar');
    const textoBotao = btnEnviar.textContent;
    btnEnviar.disabled = true;
    btnEnviar.textContent = 'A enviar...';

    try {
        // Enviar para script PHP no servidor
        console.log('🔄 Enviando requisição para processa-contacto.php...');
        
        const response = await fetch('processa-contacto.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nome: nome,
                email: email,
                assunto: assunto,
                mensagem: mensagem
            })
        });

        console.log('📡 Status da resposta:', response.status);

        const resultado = await response.json();
        console.log('📨 Resposta do servidor:', resultado);

        if (response.ok && resultado.success) {
            console.log('✅ Email enviado com sucesso!');
            showToast(resultado.message, 'success');
            form.reset();
        } else {
            console.warn('❌ Erro ao enviar:', resultado.message);
            showToast(resultado.message || 'Erro ao enviar a mensagem. Tente novamente.', 'error');
        }
    } catch (error) {
        console.error('🚨 Erro de conexão:', error);
        
        // Verificar tipo de erro
        if (error instanceof TypeError) {
            console.error('⚠️ Erro de rede - Verifique se o arquivo processa-contacto.php existe e está acessível');
            showToast('Erro de conexão: O servidor não respondeu. Verifique sua conexão ou contacte o administrador.', 'error');
        } else {
            showToast('Erro de conexão. Verifique sua internet e tente novamente.', 'error');
        }
    } finally {
        // Restaurar botão
        btnEnviar.disabled = false;
        btnEnviar.textContent = textoBotao;
    }
});

// FUNÇÃO PARA MOSTRAR TOAST NOTIFICATION
function showToast(message, type) {
    const toastContainer = document.getElementById('toast-container');
    
    // Criar elemento do toast
    const toastElement = document.createElement('div');
    toastElement.className = `toast-notification ${type}`;
    
    // Definir o ícone baseado no tipo
    const iconHTML = type === 'success' 
        ? '<i class="bi bi-check-circle-fill"></i>' 
        : '<i class="bi bi-exclamation-circle-fill"></i>';
    
    toastElement.innerHTML = `
        <div class="toast-icon">${iconHTML}</div>
        <div class="toast-content">${message}</div>
        <button class="toast-close" onclick="this.parentElement.remove()">
            <i class="bi bi-x"></i>
        </button>
    `;
    
    // Adicionar ao container
    toastContainer.appendChild(toastElement);
    
    // Remover automaticamente após 5 segundos
    setTimeout(() => {
        toastElement.classList.add('removing');
        setTimeout(() => {
            toastElement.remove();
        }, 300);
    }, 5000);
}



// MENU MOBILE (replicado para esta página)
let btnMenu = document.getElementById('btn-menu');
let menu = document.getElementById('menu-mobile');
let overlay = document.getElementById('overlay-menu');

btnMenu.addEventListener('click', () => {
    menu.classList.add('abrir-menu');
});

menu.addEventListener('click', () => {
    menu.classList.remove('abrir-menu');
});

overlay.addEventListener('click', () => {
    menu.classList.remove('abrir-menu');
});

// SCROLL TOP
let btnScrollTop = document.getElementById('scroll-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
        btnScrollTop.classList.add('show');
    } else {
        btnScrollTop.classList.remove('show');
    }
});

btnScrollTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

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
