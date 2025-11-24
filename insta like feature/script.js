const div = document.querySelector("div");
const p = document.querySelector("p");
const h1 = document.querySelector("h1");

div.addEventListener("dblclick", handleClick)

function handleClick() {
    p.classList.add("click")
    setTimeout(() => {
        h1.textContent= '❤️  The Nature'
    }, 2500);

}