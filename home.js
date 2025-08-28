const API_URL = "http://localhost:3000/api/products";

const productsDiv = document.getElementById("products");
const errorDiv = document.getElementById("productsError");
const searchBox = document.getElementById("searchBox");
const sortSelect = document.getElementById("sortSelect");

let allProducts = [];

async function loadProducts() {
  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error("Failed to fetch products");
    const data = await res.json();
    allProducts = data;
    renderProducts(allProducts);
  } catch (err) {
    errorDiv.textContent = "⚠ " + err.message;
  }
}

function renderProducts(list) {
  productsDiv.innerHTML = list.map(p => `
    <div class="mm-card product-card">
      <img src="${p.image || 'https://via.placeholder.com/300x200?text=Product'}" alt="${p.name}"/>
      <h3>${p.name}</h3>
      <p>$${p.price}</p>
      <div style="display:flex; gap:8px;">
        <button class="mm-btn primary" onclick='addToCart(${JSON.stringify(p)})'>Add to Cart</button>
        <button class="mm-btn" onclick='addToWishlist(${JSON.stringify(p)})'>❤️ Wishlist</button>
      </div>
    </div>
  `).join("");
}

function addToCart(product) {
  const cart = getCart();
  const idx = cart.findIndex(i => i._id === product._id);
  if (idx >= 0) cart[idx].quantity += 1;
  else cart.push({ _id: product._id, name: product.name, price: product.price, image: product.image, quantity: 1 });
  setCart(cart);
  updateCartCount();
  showToast("✅ Added to cart");
}

function addToWishlist(product) {
  const w = getWishlist();
  if (w.find(i => i._id === product._id)) { showToast("⚠ Already in wishlist"); return; }
  w.push({ _id: product._id, name: product.name, price: product.price, image: product.image });
  setWishlist(w);
  updateWishlistCount();
  showToast("❤️ Added to wishlist");
}

// Search & sort
searchBox?.addEventListener("input", () => {
  const q = searchBox.value.toLowerCase();
  const filtered = allProducts.filter(p => p.name.toLowerCase().includes(q));
  renderProducts(filtered);
});
sortSelect?.addEventListener("change", () => {
  let list = [...(searchBox.value ? allProducts.filter(p => p.name.toLowerCase().includes(searchBox.value.toLowerCase())) : allProducts)];
  switch (sortSelect.value) {
    case "priceAsc": list.sort((a,b)=>a.price-b.price); break;
    case "priceDesc": list.sort((a,b)=>b.price-a.price); break;
    case "nameAsc": list.sort((a,b)=>a.name.localeCompare(b.name)); break;
    default: /* do nothing */ ;
  }
  renderProducts(list);
});

loadProducts();
