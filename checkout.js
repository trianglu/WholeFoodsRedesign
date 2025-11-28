// Load cart from localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

const container = document.getElementById("cart-items");
const subtotalElement = document.getElementById("subtotal");

function renderCart() {
  container.innerHTML = "";

  if (cart.length === 0) {
    container.innerHTML = "<p>Your cart is empty.</p>";
    subtotalElement.textContent = "";
    return;
  }

  let subtotal = 0;

  cart.forEach(product => {
    const item = document.createElement("div");
    item.classList.add("cart-item");

    item.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>$${product.price.toFixed(2)}</p>
    `;

    subtotal += Number(product.price);

    container.appendChild(item);
  });

  subtotalElement.textContent = "Subtotal: $" + subtotal.toFixed(2);
}

// Clear cart after checkout
function clearCart() {
  localStorage.removeItem("cart");
  alert("Order placed successfully!");
  window.location.href = "home.html";
}

renderCart();
