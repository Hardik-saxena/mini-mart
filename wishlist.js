function renderWishlist() {
  const w = getWishlist();
  const container = document.getElementById("wishlistItems");
  if (w.length === 0) {
    container.innerHTML = `<div class="mm-card">Your wishlist is empty ❤️</div>`;
    return;
  }

  container.innerHTML = w.map((item, i) => `
    <div class="mm-card">
      <div style="display:flex; gap:12px; align-items:center;">
        <img src="${item.image || 'https://via.placeholder.com/120x90?text=Wish'}" style="width:100px;height:80px;object-fit:cover;border-radius:8px"/>
        <div style="flex:1">
          <h3 style="margin:0 0 4px">${item.name}</h3>
          <p style="margin:0 0 8px">$${item.price}</p>
          <div style="display:flex; gap:8px;">
            <button class="mm-btn primary" onclick='moveToCart(${JSON.stringify(item)})'>🛒 Move to Cart</button>
            <button class="mm-btn-cancel" onclick="removeFromWishlist(${i})">❌ Remove</button>
          </div>
        </div>
      </div>
    </div>
  `).join("");
}

function moveToCart(item) {
  const cart = getCart();
  const idx = cart.findIndex(i => i._id === item._id);
  if (idx >= 0) cart[idx].quantity += 1;
  else cart.push({ _id: item._id, name: item.name, price: item.price, image: item.image, quantity: 1 });
  setCart(cart);
  updateCartCount();

  // remove from wishlist
  let w = getWishlist();
  w = w.filter(x => x._id !== item._id);
  setWishlist(w);
  updateWishlistCount();
  renderWishlist();
  showToast("Moved to cart");
}

function removeFromWishlist(index) {
  let w = getWishlist();
  w.splice(index, 1);
  setWishlist(w);
  updateWishlistCount();
  renderWishlist();
}

renderWishlist();
