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
