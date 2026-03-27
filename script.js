const products = [
    { id: 1, name: "Vortex Chrono V1", price: 299, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600" },
    { id: 2, name: "Shadow Stealth Pack", price: 150, image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600" },
    { id: 3, name: "Apex Lens 50mm", price: 899, image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600" },
    { id: 4, name: "Neural Buds Pro", price: 249, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600" }
];

let cart = [];

function init() {
    const list = document.getElementById('product-list');
    products.forEach(p => {
        list.innerHTML += `
            <div class="product-card reveal">
                <img src="${p.image}" alt="${p.name}">
                <h3>${p.name}</h3>
                <p>$${p.price}</p>
                <button class="btn" onclick="addToCart(${p.id})">Add to Vault</button>
            </div>`;
    });

    // Theme Toggle
    document.getElementById('theme-toggle').onclick = () => {
        const body = document.body;
        const theme = body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        body.setAttribute('data-theme', theme);
    };

    // Sidebar Toggles
    const sidebar = document.getElementById('cart-sidebar');
    const overlay = document.getElementById('overlay');
    document.getElementById('cart-btn').onclick = () => { sidebar.classList.add('active'); overlay.classList.add('active'); };
    document.getElementById('close-cart').onclick = () => { sidebar.classList.remove('active'); overlay.classList.remove('active'); };

    // Reveal Animation on Scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('active'); });
    });
    document.querySelectorAll('.reveal').forEach(r => observer.observe(r));
}

window.addToCart = (id) => {
    const product = products.find(p => p.id === id);
    cart.push(product);
    updateUI();
};

function updateUI() {
    document.querySelector('.cart-badge').innerText = cart.length;
    const items = document.getElementById('cart-items');
    items.innerHTML = '';
    let total = 0;
    cart.forEach(c => {
        total += c.price;
        items.innerHTML += `<div style="padding:10px; border-bottom:1px solid #eee; display:flex; justify-content:space-between"><span>${c.name}</span><span>$${c.price}</span></div>`;
    });
    document.getElementById('cart-total-val').innerText = `$${total}`;
}

// Order Finalization
window.processOrder = () => {
    if(cart.length === 0) return alert("Vault is empty!");
    document.getElementById('success-screen').classList.add('active');
    cart = [];
    updateUI();
    document.getElementById('cart-sidebar').classList.remove('active');
    document.getElementById('overlay').classList.remove('active');
};

window.closeSuccess = () => {
    document.getElementById('success-screen').classList.remove('active');
};

document.addEventListener('DOMContentLoaded', init);
