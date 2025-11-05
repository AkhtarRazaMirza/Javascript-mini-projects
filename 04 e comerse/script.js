document.addEventListener("DOMContentLoaded", () => {
  const products = [
    { id: Date.now(), name: "Product 1", price: 29.99 },
    { id: Date.now(), name: "Product 2", price: 19.99 },
    { id: Date.now(), name: "Product 3", price: 59.999 },
  ];

  const productList = document.getElementById("product-list");
  const cartItems = document.getElementById("cart-items");
  const emptyCartMessage = document.getElementById("empty-cart");
  const cartTotalMessage = document.getElementById("cart-total");
  const totalPriceDisplay = document.getElementById("total-price");
  const checkOutBtn = document.getElementById("checkout-btn");


  let cart = JSON.parse(localStorage.getItem("itom")) || [];
  cart.forEach(itom => renderCart(itom))


  products.forEach((product) => {
    const productDiv = document.createElement("div");
    productDiv.setAttribute("data-id", product.id)
    productDiv.classList.add("product");
    productDiv.innerHTML = `
    <span>${product.name} - $${product.price.toFixed(2)}</span>
    <button data-id="${product.id}">Add to cart</button>
    `;
    productList.appendChild(productDiv);
  });

  productList.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      const productId = parseInt(e.target.getAttribute("data-id"));
      const product = products.find((p) => p.id === productId);
      addToCart(product);
    }
  });

  function addToCart(product) {
    cart.push(product);
    renderCart();
  }

  function renderCart(iton) {
    cartItems.innerText = "";
    let totalPrice = 0;

    if (cart.length > 0) {
      emptyCartMessage.classList.add("hidden");
      cartTotalMessage.classList.remove("hidden");
      cart.forEach((item, index) => {
        totalPrice += item.price;
        const cartItem = document.createElement("div");
        cartItem.setAttribute("data-id", item.id)
        cartItem.innerHTML = `
        <span> z${item.name} - $${item.price.toFixed(2)} </span>
        <button>Remove to cart</button>
        `;
        cartItems.appendChild(cartItem);
        totalPriceDisplay.textContent = `${totalPrice.toFixed(2)}`;
        saveIton()
      });

      const removeButtons = cartItems.querySelectorAll("button");
      removeButtons.forEach(button => {
        button.addEventListener("click", (e) => {
          e.stopPropagation();
          const cartItemEl = e.target.parentElement;
          const index = Array.prototype.indexOf.call(cartItems.children, cartItemEl);
          if (index > -1) {
            cart.splice(index, 1);
            saveIton();
            renderCart();
          }
        });
      });
    } else {
      emptyCartMessage.classList.remove("hidden");
      totalPriceDisplay.textContent = `$0.00`;
    }
  }

  checkOutBtn.addEventListener("click", () => {
    cart.length = 0;
    alert("Checkout successfully");
    renderCart();
    localStorage.clear("itom")
  });

  function saveIton() {
    localStorage.setItem("itom", JSON.stringify(cart));
  }
});
