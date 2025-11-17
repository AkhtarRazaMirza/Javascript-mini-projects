document.addEventListener("DOMContentLoaded", () => {

    // graping element using id
    const input = document.getElementById("input");
    const clearAll = document.getElementById("clear");
    const persent = document.getElementById("parsent");
    const clear = document.getElementById("remove");
    const divide = document.getElementById("divid");
    const seven = document.getElementById("seven");
    const eaght = document.getElementById("eight");
    const nine = document.getElementById("nine");
    const multiply = document.getElementById("multiply");
    const foure = document.getElementById("four");
    const five = document.getElementById("five");
    const six = document.getElementById("six");
    const supract = document.getElementById("supract");
    const one = document.getElementById("one");
    const two = document.getElementById("two");
    const three = document.getElementById("three");
    const add = document.getElementById("add");
    const dZero = document.getElementById("dZero");
    const zero = document.getElementById("zero");
    const dot = document.getElementById("dot");
    const equal = document.getElementById("equal");

    // clear the input
    clearAll.addEventListener("click", (e) => {
        e.stopPropagation()
        if (input.value === "") return
        input.value = "";
    });

    // fint parsent
    persent.addEventListener("click", (e) => {
        e.stopPropagation()
        if (input.value === "") return
        input.value += `%`;
    });

    // rempve one letter
    clear.addEventListener("click", (e) => {
        e.stopPropagation()
        if (input.value === "") return
        input.value = input.value.slice(0, -1);
    });

    divide.addEventListener("click", (e) => {
        e.stopPropagation()
        if (input.value === "") return
        input.value += `/`;
    })

    seven.addEventListener("click", (e) => {
        e.stopPropagation()
        input.value += `7`;
    })

    eaght.addEventListener("click", (e) => {
        e.stopPropagation()
        input.value += `8`;
    })

    nine.addEventListener("click", (e) => {
        e.stopPropagation()
        input.value += `9`;
    })

    multiply.addEventListener("click", (e) => {
        e.stopPropagation()       
        if (input.value === "") return
        input.value += `*`;
    })

    foure.addEventListener("click", (e) => {
        e.stopPropagation()
        input.value += `4`;
    })

    five.addEventListener("click", (e) => {
        e.stopPropagation()
        input.value += `5`;
    })

    six.addEventListener("click", (e) => {
        e.stopPropagation()
        input.value += `6`;
    })

    supract.addEventListener("click", (e) => {
        e.stopPropagation()
        if (input.value === "") return
        input.value += `-`;
    })

    one.addEventListener("click", (e) => {
        e.stopPropagation()
        input.value += `1`;
    })

    two.addEventListener("click", (e) => {
        e.stopPropagation()
        input.value += `2`;
    })
    three.addEventListener("click", (e) => {
        e.stopPropagation()
        input.value += `3`;
    })

    add.addEventListener("click", (e) => {
        e.stopPropagation()
        input.value += `+`;
    })

    dZero.addEventListener("click", (e) => {
        e.stopPropagation()
        input.value += `00`;
    })
    
    zero.addEventListener("click", (e) => {
        e.stopPropagation()
        input.value += `0`;
    })

    dot.addEventListener("click", (e) => {
        e.stopPropagation()
        input.value += `.`;
    })

    equal.addEventListener("click", (e) => {
        e.stopPropagation()
        if (input.value === "") return
        const text = input.value.trim()
        if (text.includes("%")) {
            const pars = input.value.split("%");
            const numBefore = pars[0];
            const numAfter = pars.length > 1 ? pars[1] : "";
            const result = (numBefore * numAfter) / 100
            input.value = result
        }

        if (text.includes("/")) {
            const divid = input.value.split("/");
            const numBefore = divid[0];
            const numAfter = divid.length > 1 ? divid[1] : "";
            const result = numBefore / numAfter
            input.value = result
        }

        if (text.includes("*")) {
            const mult = input.value.split("*");
            const numBefore = mult[0];
            const numAfter = mult.length > 1 ? mult[1] : "";
            const result = numBefore * numAfter
            input.value = result
        }

        if (text.includes("-")) {
            const sup = input.value.split("-");
            const numBefore = sup[0];
            const numAfter = sup.length > 1 ? sup[1] : "";
            const result = numBefore - numAfter
            input.value = result
        }

        if (text.includes("+")) {
            const add = input.value.split("+");
            const numBefore = add[0];
            const numAfter = add.length > 1 ? add[1] : "";
            const result = Number.parseInt(numBefore) + Number.parseInt(numAfter)
            input.value = result
        }
    })
    
    
});