const params = new URLSearchParams(window.location.search);
const listName = params.get("list");
let removeIndex = null;

document.getElementById("list-title").textContent = listName;
let allLists = JSON.parse(localStorage.getItem("userLists")) || {};
let items = allLists[listName] || [];
const container = document.getElementById("list-items");

function renderList() {
  let allLists = JSON.parse(localStorage.getItem("userLists")) || {};
  items = allLists[listName] || [];
  container.innerHTML = "";

  if (items.length === 0) {
    container.innerHTML = "<p>This list is empty.</p>";
    return;
  }

  items.forEach((product, index) => {
    const card = document.createElement("div");
    card.classList.add("list-item-card");

    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>$${product.price}</p>

      <div class="quantity-controls">
        <button class="qty-btn" onclick="updateQuantity(${index}, -1)">–</button>

        <span class="qty-display" data-index="${index}">
          ${product.quantity || 1}
        </span>

        <button class="qty-btn" onclick="updateQuantity(${index}, 1)">+</button>
      </div>

      <button class="remove-item-btn" onclick="openRemovePopup(${index})">Remove</button>
    `;

    container.appendChild(card);
  });
}

function removeItem(index) {
    items.splice(index, 1);
    allLists[listName] = items;
    localStorage.setItem("userLists", JSON.stringify(allLists));
  
    renderList();
}  

function goBack() {
  window.location.href = "lists.html";
}

renderList();

function openRemovePopup(index) {
  removeIndex = index;
  const popup = document.getElementById("remove-popup");
  popup.style.display = "flex";
}

function closeRemovePopup() {
  removeIndex = null;
  const popup = document.getElementById("remove-popup");
  popup.style.display = "none";
}

function confirmRemove() {
  if (removeIndex !== null) {
    items.splice(removeIndex, 1);
    allLists[listName] = items;
    localStorage.setItem("userLists", JSON.stringify(allLists));

    renderList();
  }

  closeRemovePopup();
}

const deleteListBtn = document.getElementById('delete-list-btn');
const deleteListPopup = document.getElementById('delete-list-popup');
const confirmDeleteListBtn = document.getElementById('confirm-delete-list-btn');
const cancelDeleteListBtn = document.getElementById('cancel-delete-list-btn');

function openDeleteListPopup() {
  if (!listName) return;
  deleteListPopup.style.display = 'flex';
}

function closeDeleteListPopup() {
  deleteListPopup.style.display = 'none';
}

function confirmDeleteList() {
  if (!listName) {
    closeDeleteListPopup();
    return;
  }

  let allLists = JSON.parse(localStorage.getItem('userLists')) || {};

  if (!allLists[listName]) {
    closeDeleteListPopup();
    window.location.href = 'lists.html';
    return;
  }

  delete allLists[listName];
  localStorage.setItem('userLists', JSON.stringify(allLists));

  closeDeleteListPopup();

  window.location.href = 'lists.html';
}

if (deleteListBtn) deleteListBtn.addEventListener('click', openDeleteListPopup);
if (confirmDeleteListBtn) confirmDeleteListBtn.addEventListener('click', confirmDeleteList);
if (cancelDeleteListBtn) cancelDeleteListBtn.addEventListener('click', closeDeleteListPopup);

const checkoutBtn = document.getElementById("checkout-btn");

if (checkoutBtn) {
  checkoutBtn.addEventListener("click", () => {
    let allLists = JSON.parse(localStorage.getItem("userLists")) || {};
    let items = allLists[listName] || [];

    localStorage.setItem("cart", JSON.stringify(items));
    window.location.href = "checkout.html";
  });
}

function updateQuantity(index, change) {
  let allLists = JSON.parse(localStorage.getItem("userLists")) || {};
  let items = allLists[listName] || [];
  const item = items[index];
  if (!item) return;

  if (change < 0 && item.quantity + change <= 0) {
    removeIndex = index;
    document.getElementById("remove-popup").style.display = "flex";
    return;
  }

  item.quantity += change;
  allLists[listName] = items;
  localStorage.setItem("userLists", JSON.stringify(allLists));

  renderList();

  setTimeout(() => {
    const qtyElement = document.querySelector(
      `.qty-display[data-index="${index}"]`
    );

    if (qtyElement) {
      const className = change > 0 ? "qty-animate-plus" : "qty-animate-minus";
      qtyElement.classList.add(className);

      setTimeout(() => qtyElement.classList.remove(className), 200);
    }
  }, 10);
}