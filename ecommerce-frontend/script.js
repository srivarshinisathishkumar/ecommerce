function showSection(sectionId) {
  ["home","products","about","contact"].forEach(id => {
    document.getElementById(id).style.display =
      id === sectionId ? "block" : "none";
  });
}

const container = document.getElementById("product-container");

fetch("products.json")
  .then(res => res.json())
  .then(products => {
    products.forEach(product => {
      const card = document.createElement("div");
      card.className = "product-card";

      card.innerHTML = `
        <img src="${product.image}" alt="${product.title}">
        <h3>${product.title}</h3>
        <p>₹${product.price}</p>
      `;

      card.onclick = () => {
        window.location.href = `product.html?id=${product.id}`;
      };

      container.appendChild(card);
    });
  });



  function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  cart.push({
    id: product.id,
    title: product.title,
    price: product.price,
    image: product.image,
    quantity: 1
  });

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  alert("Added to cart");
}
function updateCartCount() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  document.getElementById("cart-count").innerText = cart.length;
}
document.addEventListener("DOMContentLoaded", updateCartCount);
function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const selectedColor = document.getElementById("selectedColor")?.innerText || "Default";

  const existingItem = cart.find(
    item => item.id === product.id && item.color === selectedColor
  );

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      color: selectedColor,
      quantity: 1
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  alert("Item added to cart!");
}
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  document.getElementById("cart-count").innerText = totalItems;
}
updateCartCount();





