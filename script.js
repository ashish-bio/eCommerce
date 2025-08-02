document.addEventListener("DOMContentLoaded", () => {
  const products = [
    { id: 1, name: "Product 1", Price: 49.99 },
    { id: 2, name: "Product 2", Price: 29.99 },
    { id: 3, name: "Product 3", Price: 79.99 },
  ];

  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const productList = document.getElementById("product-list");
  const cartItems = document.getElementById("cart-items");
  const emptyCartMessage = document.getElementById("empty-cart");
  const cartTotalMassage = document.getElementById("cart-total");
  const totalPriceDisplay = document.getElementById("total-price");
  const checkoutBtn = document.getElementById("checkout-btn");

  //Dsiplay all product
  products.forEach((product) => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("product");
    productDiv.innerHTML = `
    <span>${product.name} - $${product.Price.toFixed(2)}</span>
    <button data-id="${product.id}">Add to cart</button>
    `;
    productList.appendChild(productDiv);
  });

  //add to cart
  productList.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      const productId = parseInt(e.target.getAttribute("data-id"));
      const product = products.find((p) => p.id === productId);
      addToCart(product);
    }
  });

  function addToCart(product) {
    cart.push(product);
    saveCart();
    renderCart();
  }

  function renderCart() {
    cartItems.innerHTML = "";
    let totalPrice = 0;
    if (cart.length > 0) {
      emptyCartMessage.classList.add("hidden");
      cartTotalMassage.classList.remove("hidden");
      cart.forEach((item, index) => {
        totalPrice += item.Price;
        const cartItem = document.createElement("li");
        cartItem.innerHTML = `
        ${item.name} - $${item.Price.toFixed(2)}
        <button data-index="${index}">Delete</button>
        `;
        cartItems.appendChild(cartItem);
        totalPriceDisplay.textContent = `$${totalPrice.toFixed(2)}`;
      });
    } else {
      emptyCartMessage.classList.remove("hidden");
      totalPriceDisplay.textContent = `$0.00`;
      cartTotalMassage.classList.add("hidden");
    }
  }

  //remove from cart
  cartItems.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      const index = parseInt(e.target.getAttribute("data-index"));
      if (!isNaN(index)) {
        cart.splice(index, 1);
      }
      saveCart();
      renderCart();
    }
  });

  function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  checkoutBtn.addEventListener("click", () => {
    cart.length = 0;
    alert("Cheakout Successfully");
    renderCart();
    saveCart();
  });
  renderCart();
});
