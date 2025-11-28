const frunt = document.querySelector('.frunt');

window.addEventListener('mousemove', e => {
    frunt.style.setProperty('--x', e.clientX + 'px');
    frunt.style.setProperty('--y', e.clientY + 'px');
});


const p = document.querySelector('p');
const text = p.innerText;
let itraction = 0;
let intervalId = null;

let charectors = "abcdefghijklmnopqrstuvwxyz"

let str = "";

function randomText() {
    str = text.split('').map((char, index) => {
        if(index < itraction) {
            return char;
        }
        return charectors[Math.floor(Math.random() * charectors.length)];
    }).join('');
    p.innerText = str;
    itraction += 0.2;
    console.log("hello");
    
    if (str === text) {
        clearInterval(intervalId);
    }
}

const textEl = document.querySelector('.txt');
textEl.addEventListener('mouseover', () => {
    intervalId = setInterval(randomText, 100);
})