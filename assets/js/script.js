// script.js — gallery, modal, cart (mock) using your filenames

// === configuration: filenames you gave ===
const imageFiles = [
    "eg.jpeg","egu.jpeg","egus.jpeg","egusi.jpeg",
    "so.jpeg","sou.jpeg","soup.jpeg",
    "chi.jpeg","chid.jpeg","chidi.jpeg","chidim.jpeg","chidima.jpeg"
  ];
  
  // fill gallery
  const galleryEl = document.getElementById("gallery");
  imageFiles.forEach((fn) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="images/${fn}" alt="${fn}">
      <div class="card-body">
        <h3>${prettyName(fn)}</h3>
        <p class="muted">Tap to view & order</p>
        <div class="actions">
          <button class="buy">Order</button>
          <button class="info secondary">Details</button>
        </div>
      </div>
    `;
    // click handlers
    card.querySelector(".buy").addEventListener("click", () => openModal(fn));
    card.querySelector("img").addEventListener("click", () => openModal(fn));
    galleryEl.appendChild(card);
  });
  
  function prettyName(filename){
    const base = filename.replace(/\.(jpg|jpeg|png|gif)$/i,"");
    return base.charAt(0).toUpperCase() + base.slice(1).replace(/[-_]/g," ");
  }
  
  // modal elements
  const modal = document.getElementById("modal");
  const modalTitle = document.getElementById("modal-title");
  const modalPhoto = document.getElementById("modal-photo");
  const orderForm = document.getElementById("order-form");
  const modalClose = document.getElementById("modal-close");
  const addCartBtn = document.getElementById("add-cart");
  const cartCountEl = document.getElementById("cart-count");
  const cartBtn = document.getElementById("cart-btn");
  const downloadLogBtn = document.getElementById("download-log");
  
  // cart in localStorage
  const CART_KEY = "fesochi_cart_v1";
  const ORDERS_KEY = "fesochi_orders_v1";
  let currentItem = null;
  
  function getCart(){ return JSON.parse(localStorage.getItem(CART_KEY) || "[]");}
  function setCart(c){ localStorage.setItem(CART_KEY, JSON.stringify(c)); updateCartCount(); }
  function getOrders(){ return JSON.parse(localStorage.getItem(ORDERS_KEY) || "[]"); }
  function setOrders(o){ localStorage.setItem(ORDERS_KEY, JSON.stringify(o)); }
  
  function updateCartCount(){
    const c = getCart();
    cartCountEl.textContent = c.reduce((s,i)=>s + (i.qty||1),0);
  }
  
  // open modal for filename
  function openModal(fn){
    currentItem = fn;
    modalTitle.textContent = prettyName(fn);
    modalPhoto.src = `images/${fn}`;
    modalPhoto.alt = prettyName(fn);
    modal.classList.remove("hidden");
    modal.setAttribute("aria-hidden","false");
  }
  
  // close
  modalClose.addEventListener("click", closeModal);
  modal.addEventListener("click",(e)=>{ if(e.target===modal) closeModal(); });
  function closeModal(){
    modal.classList.add("hidden");
    modal.setAttribute("aria-hidden","true");
    orderForm.reset();
  }
  
  // add to cart (mock)
  addCartBtn.addEventListener("click",()=>{
    const qty = parseInt(document.getElementById("order-qty").value || "1",10);
    const cart = getCart();
    const existing = cart.find(i=>i.file===currentItem);
    if(existing) existing.qty += qty;
    else cart.push({file:currentItem, qty:qty, name: prettyName(currentItem)});
    setCart(cart);
    alert("Added to cart (mock)");
  });
  
  // place order (mock) — records order to localStorage orders log
  orderForm.addEventListener("submit", (e)=>{
    e.preventDefault();
    const name = document.getElementById("order-name").value.trim();
    const contact = document.getElementById("order-contact").value.trim();
    const qty = parseInt(document.getElementById("order-qty").value||"1",10);
    const notes = document.getElementById("order-notes").value.trim();
  
    const order = {
      id: "ORD-" + Date.now(),
      item: prettyName(currentItem),
      file: currentItem,
      qty, name, contact, notes,
      createdAt: new Date().toISOString()
    };
  
    const orders = getOrders();
    orders.push(order);
    setOrders(orders);
    // store also in cart (optional)
    setCart([]);
    updateCartCount();
    closeModal();
    alert("Thank you! Your order was placed (mock). Check README for next steps.");
  });
  
  // download orders as a log (so you can attach to assignment)
  downloadLogBtn.addEventListener("click",()=>{
    const orders = getOrders();
    const text = orders.length ? JSON.stringify(orders, null, 2) : "[]";
    const blob = new Blob([text], {type: "application/json"});
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `fesochirelish-orders-${new Date().toISOString().slice(0,10)}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  });
  
  // set year
  document.getElementById("year").textContent = new Date().getFullYear();
  
  // initialize cart count on load
  updateCartCount();
  

