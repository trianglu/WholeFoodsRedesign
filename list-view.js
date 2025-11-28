// Get ?list=NAME from the URL
const params = new URLSearchParams(window.location.search);
const listName = params.get("list");
let removeIndex = null;

// Update the title
document.getElementById("list-title").textContent = listName;

// Load all saved lists
let allLists = JSON.parse(localStorage.getItem("userLists")) || {};

// This list’s items
let items = allLists[listName] || [];

// Where products will show
const container = document.getElementById("list-items");

// Render each product
function renderList() {
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
      <button class="remove-item-btn" onclick="openRemovePopup(${index})">Remove</button>
    `;
  
    container.appendChild(card);
  });  
}

function removeItem(index) {
    items.splice(index, 1);
  
    // Update localStorage
    allLists[listName] = items;
    localStorage.setItem("userLists", JSON.stringify(allLists));
  
    // Re-render list
    renderList();
}  

// Allow user to go back
function goBack() {
  window.location.href = "lists.html";
}

renderList();

// Open the confirmation popup
function openRemovePopup(index) {
  removeIndex = index;
  const popup = document.getElementById("remove-popup");
  popup.style.display = "flex";
}

// Close popup without removing
function closeRemovePopup() {
  removeIndex = null;
  const popup = document.getElementById("remove-popup");
  popup.style.display = "none";
}

// Confirm removal
function confirmRemove() {
  if (removeIndex !== null) {
    // Remove the item
    items.splice(removeIndex, 1);

    // Save updated list
    allLists[listName] = items;
    localStorage.setItem("userLists", JSON.stringify(allLists));

    // Refresh the list UI
    renderList();
  }

  closeRemovePopup();
}
