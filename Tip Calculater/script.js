document.addEventListener("DOMContentLoaded", function () {
    // grabing elements from html
    const bill = document.getElementById("bill")
    const tip = document.getElementById("tip")
    const calculate = document.getElementById("calculate")
    const total = document.getElementById("total")
    
    
    calculate.addEventListener("click", (e) => {
        e.preventDefault()

        // inputs values and make them num
        const billAmount = parseFloat(bill.value)
        const tipAmount = parseFloat(tip.value)
        
        const totalAmount = (billAmount * tipAmount) / 100
        total.textContent = totalAmount
    })
    
})