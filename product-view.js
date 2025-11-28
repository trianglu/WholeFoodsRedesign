const params = new URLSearchParams(window.location.search);
const productName = params.get("name");
const detailsContainer = document.getElementById("product-details");

fetch("data.json")
  .then(res => res.json())
  .then(data => {
    const product = data.products.find(p => p.name === productName);

    if (!product) {
      detailsContainer.innerHTML = "<p>Product not found.</p>";
      return;
    }

    renderProductDetails(product);
});

function renderProductDetails(product) {
    detailsContainer.innerHTML = `
      <div class="detail-card">
        <img src="${product.image}" class="detail-image" alt="${product.name}">
        
        <h1>${product.name}</h1>
        <p class="price"><strong>Price:</strong> $${product.price}</p>
  
        <p class="category"><strong>Category:</strong> ${product.category || "N/A"}</p>

        <p class="stock"><strong>Stock:</strong> ${product.stock ?? "N/A"}</p>
  
        <p class="description">${product.description || "No description available."}</p>
      </div>
    `;
  }
  

function goBack() {
  window.location.href = "products.html";
}

const productId = params.get("id");

let products = [];
let currentProduct = null;

fetch("data.json")
  .then(res => res.json())
  .then(data => {
    products = data;
    currentProduct = products.find(p => p.id == productId);
    renderProductDetails(currentProduct);
});

function openListPopup() {
    const popup = document.getElementById("list-popup");
    popup.style.display = "flex";
  
    loadListOptions();
}

function loadListOptions() {
    const container = document.getElementById("list-options");
    container.innerHTML = "";
  
    let allLists = JSON.parse(localStorage.getItem("userLists")) || {};
  
    if (Object.keys(allLists).length === 0) {
      container.innerHTML = "<p>No lists found. Create one first.</p>";
      return;
    }
  
    Object.keys(allLists).forEach(listName => {
      const btn = document.createElement("button");
      btn.textContent = listName;
      btn.classList.add("list-select-btn");
      btn.onclick = () => addProductToList(listName);
      container.appendChild(btn);
    });
}