// --- User session UI ---
const userSection = document.getElementById("userSection");

function updateUserUI() {
  if (!userSection) return;
  const user = localStorage.getItem("loggedInUser");
  if (user) {
    userSection.innerHTML = `
      👋 ${user}
      <button class="mm-btn" onclick="logout()">Logout</button>
    `;
  } else {
    userSection.innerHTML = `<a class="mm-btn primary" href="login.html">Login</a>`;
  }
}

function logout() {
  localStorage.removeItem("loggedInUser");
  location.reload();
}

// --- Per-user storage keys ---
function getUserKey(key) {
  const user = localStorage.getItem("loggedInUser") || "guest";
  return `${user}_${key}`;
}

// --- Cart helpers ---
function getCart() {
  return JSON.parse(localStorage.getItem(getUserKey("cart"))) || [];
}
function setCart(cart) {
  localStorage.setItem(getUserKey("cart"), JSON.stringify(cart));
}
function updateCartCount() {
  const el = document.getElementById("cartCount");
  if (!el) return;
  const count = getCart().reduce((n, i) => n + (i.quantity || 1), 0);
  el.textContent = count;
}

// --- Wishlist helpers ---
function getWishlist() {
  return JSON.parse(localStorage.getItem(getUserKey("wishlist"))) || [];
}
function setWishlist(w) {
  localStorage.setItem(getUserKey("wishlist"), JSON.stringify(w));
}
function updateWishlistCount() {
  const el = document.getElementById("wishlistCount");
  if (!el) return;
  el.textContent = getWishlist().length;
}

// --- Toasts (global) ---
function showToast(message) {
  const container = document.getElementById("toast-container") || (function(){
    const d = document.createElement('div');
    d.id = 'toast-container';
    document.body.appendChild(d);
    return d;
  })();
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 3800);
}

// Init counts + user UI on every page
updateCartCount();
updateWishlistCount();
updateUserUI();
