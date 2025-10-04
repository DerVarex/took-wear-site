// Beispiel: animierter Willkommenstext
const title = document.querySelector("h1");
let i = 0;
const text = "Willkommen auf TOOK WEAR!";
title.textContent = "";

function typeEffect() {
  if (i < text.length) {
    title.textContent += text.charAt(i);
    i++;
    setTimeout(typeEffect, 80);
  }
}
typeEffect();
