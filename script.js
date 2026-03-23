// =============================================
//  ANA CAROLINE — script.js
//  Funcionalidades:
//  1. Menu mobile (hamburguer)
//  2. Nav link ativo conforme scroll
//  3. Animação de entrada nos elementos (scroll reveal)
//  4. Botão copiar e-mail com toast
//  5. Scroll suave com offset para o header fixo
// =============================================


// ---- 1. MENU MOBILE ----
const menuToggle = document.getElementById('menu-toggle');
const navMenu    = document.getElementById('nav-menu');

menuToggle.addEventListener('click', () => {
  const isOpen = navMenu.classList.toggle('nav-open');
  menuToggle.classList.toggle('active', isOpen);
  menuToggle.setAttribute('aria-expanded', isOpen);
});

// Fechar menu ao clicar em um link
navMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('nav-open');
    menuToggle.classList.remove('active');
  });
});

// Fechar menu ao clicar fora
document.addEventListener('click', (e) => {
  if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
    navMenu.classList.remove('nav-open');
    menuToggle.classList.remove('active');
  }
});


// ---- 2. NAV LINK ATIVO NO SCROLL ----
const sections  = document.querySelectorAll('section[id], .sobre[id]');
const navLinks  = document.querySelectorAll('nav a');

const observerNav = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => link.classList.remove('nav-active'));
      const active = document.querySelector(`nav a[href="#${entry.target.id}"]`);
      if (active) active.classList.add('nav-active');
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(sec => observerNav.observe(sec));


// ---- 3. SCROLL REVEAL (animação de entrada) ----
const reveals = document.querySelectorAll('[data-reveal]');

const observerReveal = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      observerReveal.unobserve(entry.target); // anima só uma vez
    }
  });
}, { threshold: 0.12 });

reveals.forEach(el => observerReveal.observe(el));


// ---- 4. BOTÃO COPIAR EMAIL com toast ----
const toast = document.getElementById('toast');

function showToast(msg, success = true) {
  toast.textContent = msg;
  toast.className = 'toast ' + (success ? 'toast-success' : 'toast-error') + ' toast-show';
  setTimeout(() => toast.classList.remove('toast-show'), 2800);
}

document.querySelectorAll('.btn-copy').forEach(btn => {
  btn.addEventListener('click', async () => {
    const text = btn.dataset.copy;
    try {
      await navigator.clipboard.writeText(text);
      btn.textContent = '✅';
      showToast('E-mail copiado para a área de transferência!');
      setTimeout(() => btn.textContent = '📋', 2000);
    } catch {
      // fallback para navegadores mais antigos
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.focus(); ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      btn.textContent = '✅';
      showToast('E-mail copiado!');
      setTimeout(() => btn.textContent = '📋', 2000);
    }
  });
});


// ---- 5. SCROLL SUAVE com offset para o header fixo ----
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const headerH = document.querySelector('header').offsetHeight;
    const top = target.getBoundingClientRect().top + window.scrollY - headerH - 16;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});
