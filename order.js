/*
function renderOrders() {
  const key = getUserKey("order");
  let orders = JSON.parse(localStorage.getItem(key)) || [];
  const box = document.getElementById("ordersList");

  if (orders.length === 0) {
    box.innerHTML = `<p>⚠ No orders found. <a href="web.html">Shop now</a></p>`;
    return;
  }

  box.innerHTML = orders.map(order => `
    <div class="order-card" data-id="${order.id}">
      <h2>Order #${order.id}</h2>
      <p><strong>Date:</strong> ${order.date}</p>
      <p><strong>Name:</strong> ${order.name}</p>
      <p><strong>Address:</strong> ${order.address}</p>
      <p><strong>Payment:</strong> ${order.payment}</p>
      <ul>
        ${order.items.map(it => 
          `<li>${it.name} (x${it.quantity}) — $${(it.price * it.quantity).toFixed(2)}</li>`
        ).join("")}
      </ul>
      <h3>Total: $${order.total.toFixed(2)}</h3>
      
      <label><strong>Status:</strong></label>
      <select class="statusSelect" data-id="${order.id}">
        <option value="Pending" ${order.status==="Pending"?"selected":""}>Pending</option>
        <option value="Shipped" ${order.status==="Shipped"?"selected":""}>Shipped</option>
        <option value="Delivered" ${order.status==="Delivered"?"selected":""}>Delivered</option>
      </select>
    </div>
  `).join("");

  // 🔄 Add event listener to each status dropdown
  document.querySelectorAll(".statusSelect").forEach(sel => {
    sel.addEventListener("change", (e) => {
      const id = parseInt(e.target.dataset.id);
      const newStatus = e.target.value;

      // update in localStorage
      orders = orders.map(o => o.id === id ? {...o, status: newStatus} : o);
      localStorage.setItem(key, JSON.stringify(orders));

      alert(`✅ Order #${id} updated to "${newStatus}"`);
    });
  });
}

renderOrders();
*/


/*
function getParam(name) {
  const params = new URLSearchParams(window.location.search);
  return params.get(name);
}

function renderOrders(filter = "All") {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const box = document.getElementById("orderList");

  if (!user) {
    box.innerHTML = `<p>⚠ Please <a href="login.html">log in</a> to view your orders.</p>`;
    return;
  }

  const key = getUserKey("orders");
  let orders = JSON.parse(localStorage.getItem(key)) || [];

  // 🔑 only show orders of this logged-in user
  orders = orders.filter(o => o.userEmail === user.email);

  if (filter !== "All") {
    orders = orders.filter(o => o.status === filter);
  }

  if (orders.length === 0) {
    box.innerHTML = `<p>⚠ No orders found for <b>${filter}</b>.</p>`;
    return;
  }
*/

// ✅ Helper: get storage key for current user
// order.js

function getUser() {
  return JSON.parse(localStorage.getItem("currentuser")) || null;
}

function renderOrders(filter = "All") {
  const user = getUser();
  const box = document.getElementById("orderlist");

  if (!user) {
    box.innerHTML = '<p>⚠ Please log in to view your orders.</p>';
    return;
  }

  const orders = JSON.parse(localStorage.getItem(user.email)) || [];

  if (orders.length === 0) {
    box.innerHTML = `<p>🛒 No orders yet. <a href="index.html">Shop now</a></p>`;
    return;
  }

  const filtered = filter === "All" ? orders : orders.filter(o => o.status === filter);

  if (filtered.length === 0) {
    box.innerHTML = `<p>⚠ No orders with status <b>${filter}</b>.</p>`;
    return;
  }

  box.innerHTML = filtered.map(o => `
    <div class="order-card">
      <p><b>Order ID:</b> ${o.id}</p>
      <p><b>Status:</b> ${o.status}</p>
      <p><b>Date:</b> ${o.date}</p>
      <p><b>Items:</b> ${o.items.map(it => `${it.name} (x${it.quantity})`).join(", ")}</p>
      <p><b>Total:</b> $${o.total.toFixed(2)}</p>
    </div>
  `).join("");
}

// Event listener for filter dropdown
document.addEventListener("DOMContentLoaded", () => {
  const filterSelect = document.getElementById("statusFilter");
  if (filterSelect) {
    filterSelect.addEventListener("change", (e) => renderOrders(e.target.value));
  }
  renderOrders(); // show all orders on page load
});




/*
function getParam(name) {
  const params = new URLSearchParams(window.location.search);
  return params.get(name);
}

function renderOrders(filter = "All") {
  const key = getUserKey("orders");
  let orders = JSON.parse(localStorage.getItem(key)) || [];
  const box = document.getElementById("orderList");

  if (filter !== "All") {
    orders = orders.filter(o => o.status === filter);
  }

  if (orders.length === 0) {
    box.innerHTML = `<p>⚠ No orders found for <b>${filter}</b>.</p>`;
    return;
  }

  box.innerHTML = orders.map(order => `
    <div class="order-card ${order.id == getParam("orderId") ? "highlight" : ""}" data-id="${order.id}">
      <h2>Order #${order.id}</h2>
      <p><strong>Name:</strong> ${order.name}</p>
      <p><strong>Address:</strong> ${order.address}</p>
      <p><strong>Date:</strong> ${order.date}</p>
      <ul>
        ${order.items.map(it => `
          <li>${it.name} (x${it.quantity}) — $${(it.price * it.quantity).toFixed(2)}</li>
        `).join("")}
      </ul>
      <h4>Total: $${order.total.toFixed(2)}</h4>
      <label>Status:
        <select class="statusSelect" data-id="${order.id}">
          <option value="Pending" ${order.status === "Pending" ? "selected" : ""}>Pending</option>
          <option value="Shipped" ${order.status === "Shipped" ? "selected" : ""}>Shipped</option>
          <option value="Delivered" ${order.status === "Delivered" ? "selected" : ""}>Delivered</option>
        </select>
      </label>
    </div>
  `).join("");

  // Add listeners for status change
  document.querySelectorAll(".statusSelect").forEach(sel => {
    sel.addEventListener("change", (e) => {
      const id = parseInt(e.target.dataset.id);
      const newStatus = e.target.value;
      let orders = JSON.parse(localStorage.getItem(key)) || [];
      orders = orders.map(o => o.id === id ? { ...o, status: newStatus } : o);
      localStorage.setItem(key, JSON.stringify(orders));
      alert(`✅ Order #${id} updated to "${newStatus}"`);
      renderOrders(document.getElementById("statusFilter").value); // refresh
    });
  });
}

// Filter dropdown listener
document.getElementById("statusFilter").addEventListener("change", (e) => {
  renderOrders(e.target.value);
});

// ✅ Show success message if redirected from checkout
window.addEventListener("DOMContentLoaded", () => {
  const success = getParam("success");
  const orderId = getParam("orderId");
  if (success && orderId) {
    const msg = document.createElement("div");
    msg.className = "success-message";
    msg.innerHTML = `<h2>🎉 Your order #${orderId} has been placed successfully!</h2>`;
    document.body.prepend(msg);
  }
  renderOrders();
});
*/