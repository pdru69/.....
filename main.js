// 1. Menu Mobile
const mobileMenu = document.getElementById('mobileMenu');
const navLinks = document.getElementById('navLinks');

mobileMenu.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// 2. Carrossel de Depoimentos
const track = document.getElementById('carouselTrack');
const slides = Array.from(track.children);
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');
const dotsNav = document.getElementById('carouselDots');

let currentIndex = 0;
let autoPlay;

// Criar dots
slides.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => moveToSlide(index));
    dotsNav.appendChild(dot);
});

const dots = Array.from(dotsNav.children);

function updateDots(index) {
    dots.forEach(dot => dot.classList.remove('active'));
    dots[index].classList.add('active');
}

function moveToSlide(index) {
    if (index < 0) index = slides.length - 1;
    if (index >= slides.length) index = 0;
    track.style.transform = `translateX(-${index * 100}%)`;
    currentIndex = index;
    updateDots(index);
}

nextBtn.addEventListener('click', () => moveToSlide(currentIndex + 1));
prevBtn.addEventListener('click', () => moveToSlide(currentIndex - 1));

// Autoplay
function startAutoPlay() {
    autoPlay = setInterval(() => moveToSlide(currentIndex + 1), 5000);
}
function stopAutoPlay() {
    clearInterval(autoPlay);
}

track.addEventListener('mouseenter', stopAutoPlay);
track.addEventListener('mouseleave', startAutoPlay);
startAutoPlay();

// 3. Voltar ao Topo e Header Sticky
const backToTop = document.getElementById('backToTop');
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTop.style.display = 'flex';
        header.style.padding = '10px 0';
    } else {
        backToTop.style.display = 'none';
        header.style.padding = '15px 0';
    }
    reveal();
});

backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// 4. Animações ao Rolar
function reveal() {
    var reveals = document.querySelectorAll(".reveal");
    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisible = 150;
        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add("active");
        }
    }
}

// Inicializar reveal para elementos já na tela
window.addEventListener("load", reveal);
