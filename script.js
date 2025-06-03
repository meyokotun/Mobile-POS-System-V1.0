const products = [
  { id: 1, name: "Coca-Cola", price: 1500 },
  { id: 2, name: "Pepsi", price: 1300 },
  { id: 3, name: "Sprite", price: 1400 },
  { id: 4, name: "Water", price: 500 }
];

let cart = [];

function renderProducts() {
  const container = document.querySelector(".product-list");
  container.innerHTML = "";
  products.forEach(product => {
    const el = document.createElement("div");
    el.className = "product";
    el.textContent = `${product.name} - ${product.price} MMK`;
    el.onclick = () => addToCart(product);
    container.appendChild(el);
  });
}

function addToCart(product) {
  const found = cart.find(p => p.id === product.id);
  if (found) {
    found.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }
  renderCart();
}

function renderCart() {
  const list = document.getElementById("cart-items");
  const totalEl = document.getElementById("total");
  list.innerHTML = "";
  let total = 0;

  cart.forEach(item => {
    total += item.qty * item.price;
    const li = document.createElement("li");
    li.textContent = `${item.name} x ${item.qty}`;
    list.appendChild(li);
  });

  totalEl.textContent = total;
}

function checkout() {
  alert("Order placed!");
  cart = [];
  renderCart();
}

renderProducts();

const API_URL = 'https://script.google.com/macros/s/AKfycbyfAMs_yi0c2n9CYLplJirODccrIS-13XkXxljOxvTERTL8BOfTz5d6nwaNY1cz1yUAjw/exec'; // Replace with your actual URL

function checkout() {
  if (cart.length === 0) {
    alert("Cart is empty!");
    return;
  }

  fetch(API_URL, {
    method: 'POST',
    body: JSON.stringify({ cart }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(res => res.json())
  .then(data => {
    if (data.result === 'success') {
      alert("Order saved to Google Sheets!");
      cart = [];
      renderCart();
    } else {
      alert("Error: " + data.message);
    }
  })
  .catch(err => {
    console.error(err);
    alert("Failed to connect to server.");
  });
}
