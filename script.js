// script.js
const slides = document.querySelectorAll(".slide");
let currentSlide = 0;

setInterval(function () {
    slides[currentSlide].classList.remove("active");
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add("active");
}, 3000);

const musicBtn = document.getElementById("musicBtn");
const bgMusic = document.getElementById("bgMusic");
let isPlaying = false;

musicBtn.onclick = function() {
    if (isPlaying) {
        bgMusic.pause();
        musicBtn.innerHTML = "🎵 Play Music";
    } else {
        bgMusic.play();
        musicBtn.innerHTML = "⏸️ Pause Music";
    }
    isPlaying = !isPlaying;
};

document.getElementById("continueBtn").onclick = function (e) {
    e.preventDefault(); 
    document.body.classList.add("fade-out-page"); 
    
    setTimeout(() => {
        window.location.href = "part2.html";
    }, 700);
};