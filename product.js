document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("productContainer");

  const params = new URLSearchParams(window.location.search);
  const productId = parseInt(params.get("id"));

  const res = await fetch("products.json");
  const products = await res.json();

  const product = products.find(p => p.id === productId);
  if (!product) {
    container.innerHTML = "<p>Product not found</p>";
    return;
  }

  let qty = 1;
  let selectedColor = product.colors ? product.colors[0].name : "";
  let selectedImage = product.image;

  function updateTotal() {
    document.getElementById("totalPrice").innerText = product.price * qty;
    document.getElementById("qty").innerText = qty;
    document.getElementById("selectedColor").innerText = selectedColor;
  }

  window.changeQty = (val) => {
    qty += val;
    if (qty < 1) qty = 1;
    updateTotal();
  };

  window.selectColor = (name, img) => {
    selectedColor = name;
    document.getElementById("mainImage").src = img;
    updateTotal();
  };

  window.addToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push({
      id: product.id,
      title: product.title,
      price: product.price,
      image: selectedImage,
      color: selectedColor,
      quantity: qty
    });
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Added to cart");
  };

  container.innerHTML = `
    <div class="product-page">

      <div class="product-image" >
        <img id="mainImage" src="${selectedImage}" loading="lazy">
      </div>

      <div class="product-details">
        <h1>${product.title}</h1>
        <h2>₹${product.price}</h2>

        ${product.colors ? `
          <p><b>Color:</b></p>
          <div class="color-list">
            ${product.colors.map(c => `
              <img src="${c.image}" onclick="selectColor('${c.name}', '${c.image}')" loading="lazy">
            `).join("")}
          </div>
          <p>Selected Color: <span id="selectedColor">${selectedColor}</span></p>
        ` : ""}

        <div class="qty-box">
          <button onclick="changeQty(-1)">−</button>
          <span id="qty">1</span>
          <button onclick="changeQty(1)">+</button>
        </div>

        <p class="total">Total: ₹<span id="totalPrice">${product.price}</span></p>

        <button class="add-cart" onclick="addToCart()">Add to Cart</button>
      </div>

    </div>
  `;

  updateTotal();
});
