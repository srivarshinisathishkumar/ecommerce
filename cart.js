const cartContainer = document.getElementById("cart-container");
const totalPriceEl = document.getElementById("totalPrice");

// Load cart from localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function renderCart() {
  cartContainer.innerHTML = "";
  let total = 0;

  if (cart.length === 0) {
    cartContainer.innerHTML = "<p style='text-align:center'>Cart is empty</p>";
    totalPriceEl.innerText = 0;
    return;
  }

  cart.forEach((item, index) => {
    total += item.price * item.quantity;

    const div = document.createElement("div");
    div.className = "cart-item";

    div.innerHTML = `
      <img src="${item.image}" width="100" alt="${item.title}">
      <div>
        <h4>${item.title}</h4>
        <p>Color: ${item.color || "Default"}</p>
        <p>₹${item.price}</p>

        <button onclick="changeQty(${index}, -1)">−</button>
        <span>${item.quantity}</span>
        <button onclick="changeQty(${index}, 1)">+</button>

        <br><br>
        <button onclick="removeItem(${index})">Remove</button>
      </div>
    `;

    cartContainer.appendChild(div);
  });

  totalPriceEl.innerText = total;
}

function changeQty(index, value) {
  cart[index].quantity += value;

  if (cart[index].quantity < 1) {
    cart[index].quantity = 1;
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

function continueShopping() {
  window.location.href = "index.html#products";
}

// Initial render
renderCart();
