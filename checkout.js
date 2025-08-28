// checkout.js
/*
function getUser() {
  return JSON.parse(localStorage.getItem("currentuser")) || null;
}

function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function clearCart() {
  localStorage.removeItem("cart");
}

// Place order function
function confirmOrder() {
  const user = getUser();
  if (!user) {
    alert("⚠ Please log in to place an order.");
    return;
  }

  const cart = getCart();
  if (cart.length === 0) {
    alert("⚠ Your cart is empty.");
    return;
  }

  const order = {
    id: Date.now(),
    status: "Pending",
    items: cart,
    total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    date: new Date().toLocaleString()
  };

  // Fetch existing orders for this user
  let orders = JSON.parse(localStorage.getItem(user.email)) || [];
  orders.push(order);

  // Save back to localStorage
  localStorage.setItem(user.email, JSON.stringify(orders));

  clearCart();

  alert("✅ Order placed successfully!");
  window.location.href = "order.html";
}

// Run when checkout page loads
document.addEventListener("DOMContentLoaded", () => {
  const confirmBtn = document.getElementById("confirmOrderBtn");
  if (confirmBtn) confirmBtn.addEventListener("click", confirmOrder);
});
*/



function renderCheckoutSummary() {
  const cart = getCart();
  const box = document.getElementById("checkoutSummary");

  if (cart.length === 0) {
    box.innerHTML = `<p>⚠ Your cart is empty. <a href="index.html">Shop now</a></p>`;
    document.getElementById("checkoutForm").style.display = "none";
    return;
  }

  let total = 0;
  box.innerHTML = `
    <h3>Order Summary</h3>
    <ul>
      ${cart.map(it => {
        const sub = it.price * it.quantity;
        total += sub;
        return `<li>${it.name} (x${it.quantity}) — $${sub.toFixed(2)}</li>`;
      }).join("")}
    </ul>
    <h2>Total: $${total.toFixed(2)}</h2>
  `;
}

document.getElementById("checkoutForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("fullName").value.trim();
  const address = document.getElementById("address").value.trim();
  const payment = document.getElementById("paymentMethod").value;

  const cart = getCart();
  if (cart.length === 0) {
    alert("⚠ Your cart is empty!");
    return;
  }

  const total = cart.reduce((s, it) => s + it.price * it.quantity, 0);

  // ✅ Create new order
  const order = {
    id: Date.now(),
    name,
    address,
    payment,
    items: cart,
    total,
    date: new Date().toLocaleString(),
    status: "Pending"
  };

  // ✅ Save under the logged-in user's orders
  const key = getUserKey("order"); // makes sure each user has separate orders
  const orders = JSON.parse(localStorage.getItem(key)) || [];
  orders.push(order);
  localStorage.setItem(key, JSON.stringify(orders));

  // ✅ Clear cart
  setCart([]);
  updateCartCount();

  // ✅ Redirect
  alert("✅ Order placed successfully!");
  window.location.href = "order.html";
});

renderCheckoutSummary();


/*
function renderCheckoutSummary() {
  const cart = getCart();
  const box = document.getElementById("checkoutSummary");

  if (cart.length === 0) {
    box.innerHTML = `<p>⚠ Your cart is empty. <a href="index.html">Shop now</a></p>`;
    document.getElementById("checkoutForm").style.display = "none";
    return;
  }

  let total = 0;
  box.innerHTML = `
    <h3>Order Summary</h3>
    <ul>
      ${cart.map(it => {
        const sub = it.price * it.quantity;
        total += sub;
        return `<li>${it.name} (x${it.quantity}) — $${sub.toFixed(2)}</li>`;
      }).join("")}
    </ul>
    <h2>Total: $${total.toFixed(2)}</h2>
  `;
}


document.getElementById("checkoutForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("fullName").value.trim();
  const address = document.getElementById("address").value.trim();
  const payment = document.getElementById("paymentMethod").value;

  const cart = getCart();
  const total = cart.reduce((s, it) => s + it.price * it.quantity, 0);

  const order = {
    id: Date.now(),
    name, address, payment,
    items: cart,
    total,
    date: new Date().toLocaleString(),
    status: "Pending"
  };

  const key = getUserKey("orders");
  const orders = JSON.parse(localStorage.getItem(key)) || [];
  orders.push(order);
  localStorage.setItem(key, JSON.stringify(orders));

  setCart([]); // clear
  updateCartCount();

  alert("✅ Order placed! Redirecting to orders...");
  location.href = "order.html";
});

renderCheckoutSummary();
*/






/*
document.getElementById("checkout-form").addEventListener("submit", function (e) {
    e.preventDefault();

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    // Create a new order object
    let newOrder = {
        id: Date.now(),
        items: cart,
        date: new Date().toLocaleString(),
        total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
    };

    // Get previous orders
    let orders = JSON.parse(localStorage.getItem("orders")) || [];
    orders.push(newOrder);

    // Save updated orders
    localStorage.setItem("orders", JSON.stringify(orders));

    // Clear cart
    localStorage.removeItem("cart");

    alert("✅ Order placed successfully!");
    location.href = "order.html"; // redirect to orders page
});
*/




/*
function renderCheckoutSummary() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const box = document.getElementById("checkoutSummary");

  if (cart.length === 0) {
    box.innerHTML = `<p>Your cart is empty. <a href="index.html">Shop now</a></p>`;
    document.getElementById("checkoutForm").style.display = "none";
    return;
  }

  let total = 0;
  box.innerHTML = `
    <h2>Order Summary</h2>
    <ul>
      ${cart.map(it => {
        const sub = it.price * it.quantity;
        total += sub;
        return `<li>${it.name} (${it.quantity}) - $${sub.toFixed(2)}</li>`;
      }).join("")}
    </ul>
    <h3>Total: $${total.toFixed(2)}</h3>
  `;
}

// Place order
document.getElementById("checkoutForm").addEventListener("submit", function (e) {
  e.preventDefault();

  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  // Customer info
  const name = document.getElementById("name").value;
  const address = document.getElementById("address").value;

  // New order object
  let newOrder = {
    id: Date.now(),
    name,
    address,
    items: cart,
    total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    status: "Pending"
  };

  // Save to orders
  let orders = JSON.parse(localStorage.getItem("orders")) || [];
  orders.push(newOrder);
  localStorage.setItem("orders", JSON.stringify(orders));

  // Clear cart
  localStorage.removeItem("cart");

  alert("✅ Order placed successfully!");
  location.href = "order.html"; // go to orders page
});

renderCheckoutSummary();
*/