// script.js

// Menu items with prices
const menuItems = [
  { name: 'eg', file: 'eg.jpeg', price: 2500 },
  { name: 'egu', file: 'egu.jpeg', price: 2000 },
  { name: 'egus', file: 'egus.jpeg', price: 3000 },
  { name: 'egusi', file: 'egusi.jpeg', price: 2200 },
  { name: 'so', file: 'so.jpeg', price: 1800 },
  { name: 'sou', file: 'sou.jpeg', price: 1900 },
  { name: 'soup', file: 'soup.jpeg', price: 2100 },
  { name: 'chi', file: 'chi.jpeg', price: 2500 },
  { name: 'chid', file: 'chid.jpeg', price: 2600 },
  { name: 'chidi', file: 'chidi.jpeg', price: 2700 },
  { name: 'chidim', file: 'chidim.jpeg', price: 2800 },
  { name: 'chidima', file: 'chidima.jpeg', price: 2900 }
];

const gallery = document.getElementById('gallery');

// Create gallery images
menuItems.forEach(item => {
  const img = document.createElement('img');
  img.src = `assets/images/${item.file}`;
  img.alt = item.name;
  img.classList.add('gallery-item');
  img.addEventListener('click', () => openModal(item));
  gallery.appendChild(img);
});

// Modal logic
const modal = document.getElementById('modal');
const modalPhoto = document.getElementById('modal-photo');
const modalTitle = document.getElementById('modal-title');

// Add price element
let modalPrice = document.createElement('p');
modalPrice.id = 'modal-price';
modalPrice.style.fontWeight = 'bold';
modalPrice.style.marginTop = '5px';
modalTitle.insertAdjacentElement('afterend', modalPrice);

// Add to Cart button
let addToCartBtn = document.createElement('button');
addToCartBtn.textContent = 'Add to Cart';
addToCartBtn.style.marginTop = '10px';
addToCartBtn.style.padding = '8px 15px';
addToCartBtn.style.backgroundColor = '#ff6600';
addToCartBtn.style.color = '#fff';
addToCartBtn.style.border = 'none';
addToCartBtn.style.cursor = 'pointer';
modalPrice.insertAdjacentElement('afterend', addToCartBtn);

let currentItem = null;
let cart = [];
let cartCount = 0;

// Open modal with item info
function openModal(item) {
  currentItem = item;
  modalPhoto.src = `assets/images/${item.file}`;
  modalTitle.textContent = item.name;
  modalPrice.textContent = `₦${item.price.toLocaleString()}`;
  modal.classList.remove('hidden');
}

// Close modal
document.getElementById('modal-close').addEventListener('click', () => {
  modal.classList.add('hidden');
});

// Add to cart logic
addToCartBtn.addEventListener('click', () => {
  if (currentItem) {
    cart.push(currentItem);
    cartCount++;
    updateCartDisplay();
    alert(`${currentItem.name} added to cart!`);
  }
});

// Update cart count display
function updateCartDisplay() {
  let cartDisplay = document.getElementById('cart-count');
  if (!cartDisplay) {
    // Create if doesn't exist
    cartDisplay = document.createElement('span');
    cartDisplay.id = 'cart-count';
    cartDisplay.style.marginLeft = '8px';
    cartDisplay.style.background = 'red';
    cartDisplay.style.color = 'white';
    cartDisplay.style.padding = '2px 6px';
    cartDisplay.style.borderRadius = '50%';
    let nav = document.querySelector('nav ul');
    let cartItem = document.createElement('li');
    cartItem.innerHTML = `Cart `;
    cartItem.appendChild(cartDisplay);
    nav.appendChild(cartItem);
  }
  document.getElementById('cart-count').textContent = cartCount;
}

// Smooth scrolling for nav links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();
