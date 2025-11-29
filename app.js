function login() {
  window.location.href = "home.html";
}
//coupon stuff
let selectedCoupon = "";

function openPopup(name) {
  selectedCoupon = name;

  const titleEl = document.getElementById("popup-title");
  const overlayEl = document.getElementById("overlay");

  if (titleEl) titleEl.innerText = name;
  if (overlayEl) overlayEl.style.display = "flex";
}

function closePopup() {
  const overlayEl = document.getElementById("overlay");
  if (overlayEl) overlayEl.style.display = "none";
}

function saveCoupon() {
  let saved = JSON.parse(localStorage.getItem("coupons")) || [];

  if (!saved.includes(selectedCoupon)) {
    saved.push(selectedCoupon);
  }

  localStorage.setItem("coupons", JSON.stringify(saved));

  closePopup();

  // go to coupons page after saving
  window.location.href = "coupons.html";
}

function loadCoupons() {
  const list = document.getElementById("saved-coupons");
  if (!list) return; // not on coupons page

  let saved = JSON.parse(localStorage.getItem("coupons")) || [];
  list.innerHTML = "";

  saved.forEach(coupon => {
    const li = document.createElement("li");
    li.classList.add("coupon-item");

    // coupon text
    const span = document.createElement("span");
    span.textContent = coupon;

    // REMOVE BUTTON
    const removeBtn = document.createElement("button");
    removeBtn.classList.add("remove-btn");
    removeBtn.textContent = "✖";

    removeBtn.addEventListener("click", () => {
      deleteCoupon(coupon);
    });

    li.appendChild(span);
    li.appendChild(removeBtn);
    list.appendChild(li);
  });
}
function deleteCoupon(name) {
  let saved = JSON.parse(localStorage.getItem("coupons")) || [];

  saved = saved.filter(c => c !== name);

  localStorage.setItem("coupons", JSON.stringify(saved));
  loadCoupons(); // refresh the screen instantly
}

// run when page loads
document.addEventListener("DOMContentLoaded", loadCoupons);


//products stuff
let allProducts = [];
const selectedProducts = [];
let listToDelete = null;

const productContainerElement = document.getElementById('product-container');
const productList = document.getElementById('product-list');
const searchInput = document.getElementById('search-input');

if (!productContainerElement) console.error('Missing #product-container element');
if (!productList) console.error('Missing #product-list element');
if (!searchInput) console.error('Missing #search-input element');

fetch('data.json')
  .then(response => response.json())
  .then(data => {
    allProducts = data.products || [];
    console.log('Loaded products:', allProducts.length);
    renderProducts(allProducts);
  })
  .catch(error => {
    console.error('Error fetching data.json:', error);
  });

function renderProducts(productsToRender, highlight = '') {
  productContainerElement.innerHTML = '';

  if (!productsToRender || productsToRender.length === 0) {
    const emptyMsg = document.createElement('p');
    emptyMsg.textContent = 'No products to show.';
    productContainerElement.appendChild(emptyMsg);
    return;
  }

  productsToRender.forEach(product => {
    const productCard = document.createElement('div');
    productCard.classList.add('product-card');

    const productImage = document.createElement('div');
    productImage.classList.add('product-image');

    const productImageElement = document.createElement('img');
    productImageElement.src = product.image;
    productImageElement.alt = product.name;

    productImage.appendChild(productImageElement);

    const productName = document.createElement('h3');
    if (highlight) {
      const nameLower = product.name.toLowerCase();
      const q = highlight.toLowerCase();
      const idx = nameLower.indexOf(q);
      if (idx !== -1) {
        const before = product.name.substring(0, idx);
        const match = product.name.substring(idx, idx + q.length);
        const after = product.name.substring(idx + q.length);
        productName.innerHTML = `${escapeHtml(before)}<span class="highlight">${escapeHtml(match)}</span>${escapeHtml(after)}`;
      } else {
        productName.textContent = product.name;
      }
    } else {
      productName.textContent = product.name;
    }

    const productPrice = document.createElement('p');
    productPrice.textContent = '$' + product.price;

    const addToListButton = document.createElement('button');
    addToListButton.textContent = 'Add to List';      
    addToListButton.addEventListener('click', () => {
        openListPopup(product);
        selectedProducts.push(product);
        refreshSelectedList();
    });

    const viewItemButton = document.createElement('button');
    viewItemButton.textContent = 'View Item';
    viewItemButton.addEventListener('click', () => {
        window.location.href = `product-view.html?name=${encodeURIComponent(product.name)}`;
      });      

    productCard.appendChild(productImage);
    productCard.appendChild(productName);
    productCard.appendChild(productPrice);
    productCard.appendChild(addToListButton);
    productCard.appendChild(viewItemButton);

    productContainerElement.appendChild(productCard);
  });
}

function refreshSelectedList() {
  if (!productList) return;
  productList.innerHTML = '';
  selectedProducts.forEach(product => {
    const li = document.createElement('li');
    li.textContent = product.name;
    productList.appendChild(li);
  });
}

searchInput.addEventListener('input', (e) => {
  const query = e.target.value.trim();
  if (query === '') {
    renderProducts(allProducts);
    return;
  }

  const filtered = allProducts.filter(p => p.name.toLowerCase().includes(query.toLowerCase()));
  renderProducts(filtered, query);
});

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

let currentProduct = null;

const availableLists = ["Favorites", "Most Recurring"];

function openListPopup(product) {
  currentProduct = product;

  const listOptions = document.getElementById("list-options");
  listOptions.innerHTML = "";

  availableLists.forEach(listName => {
    const btn = document.createElement("button");
    btn.classList.add("list-btn");
    btn.textContent = listName;
    btn.onclick = () => addProductToList(listName);
    listOptions.appendChild(btn);
  });

  document.getElementById("list-popup").style.display = "flex";
}

function closeListPopup() {
  document.getElementById("list-popup").style.display = "none";
}

function addProductToList(listName) {
  let lists = JSON.parse(localStorage.getItem("userLists")) || {};

  if (!lists[listName]) {
    lists[listName] = [];
  }

  lists[listName].push(currentProduct);
  localStorage.setItem("userLists", JSON.stringify(lists));

  closeListPopup();
  openConfirmPopup(listName);
}

function openConfirmPopup(listName) {
  document.getElementById("confirm-message").textContent =
    `Added to "${listName}"!`;
  document.getElementById("confirm-popup").style.display = "flex";
}

function closeConfirmPopup() {
  document.getElementById("confirm-popup").style.display = "none";
}

const defaultLists = ["Favorites", "Most Recurring"];

function openList(listName) {
    window.location.href = `list-view.html?list=${encodeURIComponent(listName)}`;
}

function openAddListPopup() {
    document.getElementById("add-list-popup").style.display = "flex";
}
  
function closeAddListPopup() {
    document.getElementById("add-list-popup").style.display = "none";
    document.getElementById("new-list-name").value = "";
}
  
  function createNewList() {
    const nameInput = document.getElementById("new-list-name");
    const newListName = nameInput.value.trim();
  
    if (newListName === "") {
      alert("List name cannot be empty.");
      return;
    }
  
    let allLists = JSON.parse(localStorage.getItem("userLists")) || {};
  
    if (allLists[newListName]) {
      alert("A list with that name already exists.");
      return;
    }

    allLists[newListName] = [];
    localStorage.setItem("userLists", JSON.stringify(allLists));
    addListButtonToPage(newListName);
    closeAddListPopup();
}
  
function addListButtonToPage(listName) {
    const container = document.querySelector(".list-buttons");
  
    const button = document.createElement("button");
    button.textContent = listName;
    button.onclick = () => openList(listName);
  
    container.insertBefore(button, container.lastElementChild);
}

function renderLists() {
  let container = document.getElementById("lists-container");
  let allLists = JSON.parse(localStorage.getItem("userLists")) || {};

  container.innerHTML = "";

  Object.keys(allLists).forEach(listName => {
    const row = document.createElement("div");
    row.classList.add("list-row");

    const openBtn = document.createElement("button");
    openBtn.className = "list-btn";
    openBtn.textContent = listName;
    openBtn.addEventListener("click", () => openList(listName));

    row.appendChild(openBtn);

    if (!defaultLists.includes(listName)) {
      const delBtn = document.createElement("button");
      delBtn.className = "delete-list-btn";
      delBtn.textContent = "🗑";
      delBtn.addEventListener("click", () => openDeleteListPopup(listName));

      row.appendChild(delBtn);
    }

    container.appendChild(row);
  });
}

