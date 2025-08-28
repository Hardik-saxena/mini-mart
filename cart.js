function renderCart() {
  const cart = getCart();
  const container = document.getElementById("cartItems");
  const totalEl = document.getElementById("totalPrice");

  if (cart.length === 0) {
    container.innerHTML = `<div class="mm-card">Your cart is empty.</div>`;
    totalEl.textContent = "";
    return;
  }

  container.innerHTML = cart.map((item, i) => `
    <div class="mm-card">
      <div style="display:flex; gap:12px; align-items:center;">
        <img src="${item.image || 'https://via.placeholder.com/120x90?text=Item'}" style="width:100px;height:80px;object-fit:cover;border-radius:8px"/>
        <div style="flex:1">
          <h3 style="margin:0 0 4px">${item.name}</h3>
          <p style="margin:0 0 8px">$${item.price}</p>
          <div style="display:flex; gap:8px; align-items:center;">
            <button class="mm-btn" onclick="changeQty(${i}, -1)">−</button>
            <span>Qty: ${item.quantity}</span>
            <button class="mm-btn" onclick="changeQty(${i}, 1)">+</button>
            <button class="mm-btn-cancel" style="margin-left:auto" onclick="removeItem(${i})">Remove</button>
          </div>
        </div>
      </div>
    </div>
  `).join("");

  const total = cart.reduce((s, it) => s + it.price * it.quantity, 0);
  totalEl.textContent = `💰 Total: $${total.toFixed(2)}`;
}

function changeQty(index, delta) {
  const cart = getCart();
  cart[index].quantity = Math.max(1, (cart[index].quantity || 1) + delta);
  setCart(cart);
  updateCartCount();
  renderCart();
}

function removeItem(index) {
  const cart = getCart();
  cart.splice(index, 1);
  setCart(cart);
  updateCartCount();
  renderCart();
}

function goToCheckout() {
    window.location.href = "checkout.html";  // ✅ go to checkout first
}


renderCart();
