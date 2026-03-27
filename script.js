const products = [
    { id: 1, name: "Vortex Chrono", price: 299, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500" },
    { id: 2, name: "Shadow Pack", price: 150, image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500" },
    { id: 3, name: "Neural Buds", price: 249, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500" },
    { id: 4, name: "Onyx Bomber", price: 199, image: "https://images.unsplash.com/photo-1576905341935-40d1be1ec94e?w=500" }
];

let cart = [];

function init() {
    const list = document.getElementById('product-list');
    products.forEach(p => {
        list.innerHTML += `
            <div class="product-card reveal">
                <img src="${p.image}">
                <h3>${p.name}</h3>
                <p>$${p.price}</p>
                <button class="btn" onclick="addToCart(${p.id})">Add to Vault</button>
            </div>`;
    });

    // Theme Toggle
    document.getElementById('theme-toggle').onclick = () => {
        document.body.setAttribute('data-theme', document.body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
    };

    // Sidebar
    const side = document.getElementById('cart-sidebar');
    const over = document.getElementById('overlay');
    document.getElementById('cart-btn').onclick = () => { side.classList.add('active'); over.classList.add('active'); };
    document.getElementById('close-cart').onclick = () => { side.classList.remove('active'); over.classList.remove('active'); };

    // Reveal
    const observer = new IntersectionObserver(entries => {
        entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('active'); });
    });
    document.querySelectorAll('.reveal').forEach(r => observer.observe(r));
}

window.addToCart = (id) => {
    cart.push(products.find(p => p.id === id));
    updateUI();
};

function updateUI() {
    document.querySelector('.cart-badge').innerText = cart.length;
    const items = document.getElementById('cart-items');
    items.innerHTML = '';
    let total = 0;
    cart.forEach(c => {
        total += c.price;
        items.innerHTML += `<div style="padding:10px; border-bottom:1px solid #ddd">${c.name} - $${c.price}</div>`;
    });
    document.getElementById('cart-total-val').innerText = `$${total}`;
}

// Order Logic
window.processOrder = () => {
    if (cart.length === 0) return alert("Your vault is empty!");
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
