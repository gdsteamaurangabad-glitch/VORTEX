// Product Database (Expanded)
const products = [
    { id: 1, name: "Vortex Chrono V1", price: 299.99, category: "electronics", badge: "HOT", 
    image: "https://images.unsplash.com/photo-1523275335684-
    37898b6baf30?auto=format&fit=crop&w=600&q=80" },
    { id: 2, name: "Shadow Stealth Pack", price: 149.50, category: "fashion", badge: "NEW", 
    image: 
    "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=600&q=80" 
    },
    { id: 3, name: "Apex Lens 50mm", price: 899.00, category: "electronics", badge: "ELITE", 
    image: "https://images.unsplash.com/photo-1516035069371-
    29a1b244cc32?auto=format&fit=crop&w=600&q=80" },
    { id: 4, name: "Onyx Bomber", price: 199.99, category: "fashion", badge: "LIMITED", image: 
    "https://images.unsplash.com/photo-1576905341935-
    40d1be1ec94e?auto=format&fit=crop&w=600&q=80" },
    { id: 5, name: "Titan Desk Beam", price: 75.00, category: "accessories", badge: "TRENDING", 
    image: "https://images.unsplash.com/photo-1534073828943-
    f801091bb18c?auto=format&fit=crop&w=600&q=80" },
    { id: 6, name: "Neural Buds Pro", price: 249.00, category: "electronics", badge: "HOT", 
    image: "https://images.unsplash.com/photo-1505740420928-
    5e560c06d30e?auto=format&fit=crop&w=600&q=80" },
    { id: 7, name: "Void Visors", price: 120.00, category: "accessories", badge: "NEW", image: 
    "https://images.unsplash.com/photo-1572635196237-
    14b3f281503f?auto=format&fit=crop&w=600&q=80" },
    { id: 8, name: "Cyber Brew Elite", price: 450.00, category: "electronics", badge: "SALE", 
    image: "https://images.unsplash.com/photo-1517668808822-
    9ebb02f2a0e6?auto=format&fit=crop&w=600&q=80" }
];

// State Management
let cart = JSON.parse(localStorage.getItem('vortex_cart')) || [];
let wishlist = JSON.parse(localStorage.getItem('vortex_wishlist')) || [];
let currentTheme = localStorage.getItem('vortex_theme') || 'light';

// Selectors
const productList = document.getElementById('product-list');
const trendingList = document.getElementById('trending-list');
const cartSidebar = document.getElementById('cart-sidebar');
const wishlistSidebar = document.getElementById('wishlist-sidebar');
const searchModal = document.getElementById('search-modal');
const overlay = document.getElementById('overlay');
const themeToggle = document.getElementById('theme-toggle');
const scrollProgress = document.getElementById('scroll-progress');

// Initialize
function init() {
    document.body.setAttribute('data-theme', currentTheme);
    updateThemeIcon();
    renderProducts(products, productList);
    renderProducts(products.slice(0, 2), trendingList, true);
    updateCartUI();
    updateWishlistUI();
    setupEventListeners();
    handleReveal();
}

// Rendering
function renderProducts(items, container, isTrending = false) {
    if (!container) return;
    container.innerHTML = '';
    items.forEach(product => {
        const div = document.createElement('div');
        div.className = isTrending ? 'trending-card reveal' : 'product-card reveal';
        
        const content = isTrending ? `
            <div class="trending-img"><img src="${product.image}" alt=""></div>
            <div class="trending-info">
                <span class="badge">${product.badge}</span>
                <h3>${product.name}</h3>
                <p class="price">$${product.price}</p>
                <button class="btn primary add-to-cart" data-id="${product.id}">Add to 
    Vault</button>
            </div>
        ` : `
            <span class="badge">${product.badge}</span>
            <div class="product-img">
                <img src="${product.image}" alt="">
                <div class="product-actions">
                    <div class="action-btn add-to-wishlist ${isInWishlist(product.id) ? 'active'
     : ''}" data-id="${product.id}">
                        <i class="fa-solid fa-heart"></i>
                    </div>
                    <div class="action-btn add-to-cart" data-id="${product.id}">
                        <i class="fa-solid fa-cart-plus"></i>
                    </div>
                </div>
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p class="price">$${product.price.toFixed(2)}</p>
            </div>
        `;
        div.innerHTML = content;
        container.appendChild(div);
    });
    setTimeout(handleReveal, 100);
}

// Theme Toggle
function toggleTheme() {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.body.setAttribute('data-theme', currentTheme);
    localStorage.setItem('vortex_theme', currentTheme);
    updateThemeIcon();
}

function updateThemeIcon() {
    themeToggle.className = currentTheme === 'light' ? 'fa-solid fa-moon theme-toggle' : 'fa-
    solid fa-sun theme-toggle';
}

// Cart Logic
function addToCart(id) {
    const product = products.find(p => p.id === id);
    const item = cart.find(i => i.id === id);
    if (item) item.quantity++;
    else cart.push({ ...product, quantity: 1 });
    saveAndUpdateCart();
    openSidebar(cartSidebar);
}

function removeFromCart(id) {
    cart = cart.filter(i => i.id !== id);
    saveAndUpdateCart();
}

function saveAndUpdateCart() {
    localStorage.setItem('vortex_cart', JSON.stringify(cart));
    updateCartUI();
}

function updateCartUI() {
    const container = document.getElementById('cart-items');
    if (!container) return;
    container.innerHTML = cart.length === 0 ? '<p class="empty-msg">Your vault is empty.</p>' : '';
    let total = 0;
    cart.forEach(item => {
        total += item.price * item.quantity;
        const div = document.createElement('div');
        div.className = 'sidebar-item';
        div.innerHTML = `
            <img src="${item.image}" alt="">
            <div class="sidebar-item-info">
                <h4>${item.name}</h4>
                <p class="price">$${item.price} x ${item.quantity}</p>
                <span class="remove-btn" onclick="removeFromCart(${item.id})">Remove</span>
            </div>
        `;
        container.appendChild(div);
    });
    document.getElementById('cart-total-val').innerText = `$${total.toFixed(2)}`;
    document.querySelector('.cart-badge').innerText = cart.reduce((a, b) => a + b.quantity, 0);
}

// Wishlist Logic
function toggleWishlist(id) {
    const index = wishlist.findIndex(i => i.id === id);
    if (index > -1) wishlist.splice(index, 1);
    else wishlist.push(products.find(p => p.id === id));
    localStorage.setItem('vortex_wishlist', JSON.stringify(wishlist));
    updateWishlistUI();
    renderProducts(products, productList); // Refresh to update icons
}

function isInWishlist(id) { return wishlist.some(i => i.id === id); }

function updateWishlistUI() {
    const container = document.getElementById('wishlist-items');
    if (!container) return;
    container.innerHTML = wishlist.length === 0 ? '<p class="empty-msg">No favorites yet.</p>' : '';
    wishlist.forEach(item => {
        const div = document.createElement('div');
        div.className = 'sidebar-item';
        div.innerHTML = `
            <img src="${item.image}" alt="">
            <div class="sidebar-item-info">
                <h4>${item.name}</h4>
                <p class="price">$${item.price}</p>
                <span class="remove-btn" onclick="toggleWishlist(${item.id})">Remove</span>
            </div>
        `;
        container.appendChild(div);
    });
    document.querySelector('.wishlist-badge').innerText = wishlist.length;
}

// Utilities
function openSidebar(el) { el.classList.add('active'); overlay.classList.add('active'); }
function closeAll() { 
    [cartSidebar, wishlistSidebar, searchModal, overlay].forEach(el => {
        if(el) el.classList.remove('active');
    });
}

// Event Listeners
function setupEventListeners() {
    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - 
    document.documentElement.clientHeight;
        scrollProgress.style.width = (winScroll / height) * 100 + "%";
        document.getElementById('main-header').classList.toggle('scrolled', winScroll > 50);
        handleReveal();
    });

    themeToggle.addEventListener('click', toggleTheme);
    document.getElementById('cart-btn').addEventListener('click', () => openSidebar(cartSidebar));
    document.getElementById('wishlist-btn').addEventListener('click', () => 
    openSidebar(wishlistSidebar));
    document.getElementById('open-search').addEventListener('click', () => { 
    searchModal.classList.add('active'); overlay.classList.add('active'); });
    
    document.querySelectorAll('.close-sidebar, .close-search, .overlay').forEach(el => {
        el.addEventListener('click', closeAll);
    });

    document.addEventListener('click', e => {
        const id = parseInt(e.target.closest('[data-id]')?.dataset.id);
        if (e.target.closest('.add-to-cart')) addToCart(id);
        if (e.target.closest('.add-to-wishlist')) toggleWishlist(id);
        if (e.target.closest('.faq-question')) {
            e.target.closest('.faq-item').classList.toggle('active');
        }
    });

    // Search Logic
    document.getElementById('search-input').addEventListener('input', e => {
        const term = e.target.value.toLowerCase();
        const results = products.filter(p => p.name.toLowerCase().includes(term));
        const container = document.getElementById('search-results');
        container.innerHTML = term ? '' : '<p>Start typing to search...</p>';
        if (term) {
            results.forEach(p => {
                const div = document.createElement('div');
                div.className = 'sidebar-item';
                div.innerHTML = `<img src="${p.image}" style="width:50px;height:50px;object-
    fit:cover;border-radius:4px;margin-right:15px"> 
    <div><h4>${p.name}</h4><p>$${p.price}</p></div>`;
                container.appendChild(div);
            });
        }
    });
}

function handleReveal() {
    document.querySelectorAll('.reveal').forEach(el => {
        if (el.getBoundingClientRect().top < window.innerHeight - 100) el.classList.add('active');
    });
}

window.addEventListener('DOMContentLoaded', init);
 
