function login() {
    window.location.href = "home.html";
}
function openPopup(couponName) {
    document.getElementById("popup-title").innerText = couponName;
    document.getElementById("overlay").style.display = "flex";
  }

  function closePopup() {
    document.getElementById("overlay").style.display = "none";
  }

  function saveCoupon() {
    alert("Coupon saved! (you can connect this to localStorage later)");
    closePopup();
  }

  // Fetch the data
fetch('data.json')
.then(response => response.json())
.then(data => {
  // Create a container for the products
  const productContainer = document.createElement('div');
  productContainer.classList.add('product-container');

  // Create an empty array to store the selected products
  const selectedProducts = [];

  // Loop through the data and create a product card for each item
  data.products.forEach(product => {
    const productCard = document.createElement('div');
    productCard.classList.add('product-card');

    const productImage = document.createElement('div');
    productImage.classList.add('product-image');

    const productImageElement = document.createElement('img');
    productImageElement.src = product.image;
    productImageElement.alt = product.name;

    productImage.appendChild(productImageElement);

    const productName = document.createElement('h3');
    productName.textContent = product.name;

    const productPrice = document.createElement('p');
    productPrice.textContent = '$' + product.price;

    const addToListButton = document.createElement('button');
    addToListButton.textContent = 'Add to List';

    const viewItemButton = document.createElement('button');
    viewItemButton.textContent = 'View Item';

    // Add a click event listener to the button
    addToListButton.addEventListener('click', () => {
      // Add the product to the selectedProducts array
      selectedProducts.push(product);

      // Display the selected products in a list
      const productList = document.getElementById('product-list');
      productList.innerHTML = '';
      selectedProducts.forEach(product => {
        const listItem = document.createElement('li');
        listItem.textContent = product.name;
        productList.appendChild(listItem);
      });
    });

    productCard.appendChild(productImage);
    productCard.appendChild(productName);
    productCard.appendChild(productPrice);
    productCard.appendChild(addToListButton);
    productCard.appendChild(viewItemButton);

    // Add the product card to the container
    productContainer.appendChild(productCard);
  });

  // Add the product container to the page
  const productContainerElement = document.getElementById('product-container');
  productContainerElement.appendChild(productContainer);
})

.catch(error => console.error('Error fetching data:', error));

let selectedCoupon = "";

function openPopup(name) {
  selectedCoupon = name;
  document.getElementById('popup-title').innerText = name;
  document.getElementById('overlay').style.display = 'flex';
}

function closePopup() {
  document.getElementById('overlay').style.display = 'none';
}

function saveCoupon() {
    let saved = JSON.parse(localStorage.getItem("coupons")) || [];
  
    if (!saved.includes(selectedCoupon)) {
      saved.push(selectedCoupon);
    }
  
    localStorage.setItem("coupons", JSON.stringify(saved));
  
    // close the popup
    closePopup();
  
    // redirect to coupons page
    window.location.href = "coupons.html";
  }
  
  function loadCoupons() {
    let saved = JSON.parse(localStorage.getItem("coupons")) || [];
    const list = document.getElementById("saved-coupons");
  
    if (!list) return;
  
    list.innerHTML = ""; 
  
    saved.forEach((coupon, index) => {
      let li = document.createElement("li");
      li.classList.add("coupon-item");
  
      li.innerHTML = `
        ${coupon}
        <button class="remove-btn" onclick="removeCoupon(${index})">✖</button>
      `;
  
      list.appendChild(li);
    });
  }
  
  // load automatically IF we are on coupons page
  document.addEventListener("DOMContentLoaded", loadCoupons);
 
  function removeCoupon(index) {
    let saved = JSON.parse(localStorage.getItem("coupons")) || [];
  
    saved.splice(index, 1);
    localStorage.setItem("coupons", JSON.stringify(saved));
  
    loadCoupons();
  }
