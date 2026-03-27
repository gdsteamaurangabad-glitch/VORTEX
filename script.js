const products = [
    { id: 1, name: "Vortex Chrono V1", price: 299.99, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600" },
    { id: 2, name: "Shadow Stealth Pack", price: 149.50, image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600" },
    { id: 3, name: "Apex Lens 50mm", price: 899.00, image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600" },
    { id: 4, name: "Neural Buds Pro", price: 249.00, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600" }
];

let cart = [];

function init() {
    const productList = document.getElementById('product-list');
    
    // Render Products
    products.forEach(p => {
        productList.innerHTML += `
            <div class="product-card reveal">
                <img src="${p.image}" alt="${p.name}">
                <h3>${p.name}</h3>
                <p>$${p.price.toFixed(2)}</p>
                <button class="btn" onclick="addToCart(${p.id})">Add to Vault</button>
            </div>`;
    });

    // Theme Switcher
    document.getElementById('theme-toggle').onclick = () => {
        const body = document.body;
        const isDark = body.getAttribute('data-theme') === 'dark';
        body.setAttribute('data-theme', isDark ? 'light' : 'dark');
        document.getElementById('theme-toggle').className = isDark ? 'fa-solid fa-moon' : 'fa-solid fa-sun';
    };

    // Sidebar Logic
    const cartBtn = document.getElementById('cart-btn');
    const closeBtn = document.getElementById('close-cart');
    const sidebar = document.getElementById('cart-sidebar');
    const overlay = document.getElementById('overlay');

    const toggleCart = () => {
        sidebar.classList.toggle('active');
        overlay.classList.toggle('active');
    };

    cartBtn.onclick = toggleCart;
    closeBtn.onclick = toggleCart;
    overlay.onclick = toggleCart;

    // Reveal on scroll
    const handleReveal = () => {
        document.querySelectorAll('.reveal').forEach(el => {
            if (el.getBoundingClientRect().top < window.innerHeight - 50) {
                el.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', handleReveal);
    handleReveal(); // Run once on load
}

window.addToCart = (id) => {
    const product = products.find(p => p.id === id);
    cart.push(product);
    document.querySelector('.cart-badge').innerText = cart.length;
    
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    document.getElementById('cart-total-val').innerText = `$${total.toFixed(2)}`;
    
    const itemsContainer = document.getElementById('cart-items');
    itemsContainer.innerHTML += `<div style="padding:10px; border-bottom:1px solid #ddd; display:flex; justify-content:space-between">
        <span>${product.name}</span> <span>$${product.price}</span>
    </div>`;
};

document.addEventListener('DOMContentLoaded', init);
