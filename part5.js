/* --- ENVELOPE OPENING & FALLING ALPHABETS SCRIPT --- */
const envelopeContainer = document.getElementById("envelopeContainer");
const letterContainer = document.getElementById("letterContainer");
const openBtn = document.getElementById("openBtn");
const fallingContainer = document.getElementById("fallingContainer");

function triggerFallingAlphabets() {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    const count = 35; // Number of falling characters

    for (let i = 0; i < count; i++) {
        const span = document.createElement("span");
        span.classList.add("falling-alphabet");
        span.innerText = characters.charAt(Math.floor(Math.random() * characters.length));
        
        // Random positioning and animation duration
        span.style.left = Math.random() * 100 + "vw";
        span.style.animationDuration = (Math.random() * 2 + 1.5) + "s";
        span.style.animationDelay = (Math.random() * 0.5) + "s";
        span.style.fontSize = (Math.random() * 16 + 16) + "px";

        fallingContainer.appendChild(span);

        // Clean up element after animation finishes
        setTimeout(() => {
            span.remove();
        }, 3500);
    }
}

openBtn.addEventListener("click", () => {
    envelopeContainer.classList.add("hidden");
    letterContainer.classList.add("visible");
    triggerFallingAlphabets();
});


/* --- AMBIENT COSMIC BACKGROUND ANIMATION --- */
const canvas = document.getElementById("spaceCanvas");
const ctx = canvas.getContext("2d");

let width = (canvas.width = window.innerWidth);
let height = (canvas.height = window.innerHeight);

window.addEventListener("resize", () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    initParticles();
});

const PARTICLE_COUNT = 150;
let particles = [];

function initParticles() {
    particles = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            radius: Math.random() * 1.5 + 0.3,
            alpha: Math.random() * 0.6 + 0.1,
            speed: Math.random() * 0.15 + 0.02
        });
    }
}
initParticles();

function renderBackground() {
    ctx.fillStyle = "#0f0c1b";
    ctx.fillRect(0, 0, width, height);

    particles.forEach((p) => {
        p.y -= p.speed;
        if (p.y < 0) p.y = height;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`;
        ctx.fill();
    });

    requestAnimationFrame(renderBackground);
}

renderBackground();