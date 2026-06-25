// ==================== 
// Bankstarsky - JavaScript
// E-Commerce Funktionalität
// ====================

// Produkte Datenbank
const products = [
    {
        id: 1,
        name: "Exklusive Rose",
        description: "Handverlesen in Dunkelrot",
        price: 49.99,
        emoji: "🌹"
    },
    {
        id: 2,
        name: "Luxus Parfum",
        description: "Elegante Duftnote mit Rosenessenz",
        price: 129.99,
        emoji: "💐"
    },
    {
        id: 3,
        name: "Gold Schmuck",
        description: "Elegantes Armband in 18K Gold",
        price: 299.99,
        emoji: "💍"
    },
    {
        id: 4,
        name: "Seide Schal",
        description: "Premium Qualität mit Rose-Muster",
        price: 89.99,
        emoji: "🧣"
    },
    {
        id: 5,
        name: "Champagne Premium",
        description: "Edles Getränk für besondere Anlässe",
        price: 159.99,
        emoji: "🍾"
    },
    {
        id: 6,
        name: "Rosenöl",
        description: "100% reines ätherisches Rosenöl",
        price: 39.99,
        emoji: "🧴"
    }
];

// Warenkorb
let cart = [];

// DOM Elemente
const productsGrid = document.getElementById('productsGrid');
const cartIcon = document.querySelector('.cart-icon');
const cartModal = document.getElementById('cartModal');
const closeBtn = document.querySelector('.close');
const cartItemsContainer = document.getElementById('cartItems');
const totalPriceElement = document.getElementById('totalPrice');
const cartCount = document.querySelector('.cart-count');

// ==================== Produkte rendern ====================
function renderProducts() {
    productsGrid.innerHTML = '';
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-image">${product.emoji}</div>
            <div class="product-info">
                <div class="product-name">${product.name}</div>
                <div class="product-description">${product.description}</div>
                <div class="product-price">${product.price.toFixed(2)}€</div>
                <div class="product-actions">
                    <button class="btn-add" onclick="addToCart(${product.id})">
                        🛒 Hinzufügen
                    </button>
                </div>
            </div>
        `;
        productsGrid.appendChild(productCard);
    });
}

// ==================== In den Warenkorb hinzufügen ====================
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    updateCart();
    showNotification(`${product.name} wurde hinzugefügt!`);
}

// ==================== Warenkorb aktualisieren ====================
function updateCart() {
    // Anzahl aktualisieren
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;

    // Warenkorb-Modal rendern
    renderCartItems();
}

// ==================== Warenkorb-Items rendern ====================
function renderCartItems() {
    cartItemsContainer.innerHTML = '';

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p style="text-align: center; color: #999;">Dein Warenkorb ist leer</p>';
        totalPriceElement.textContent = '0.00';
        return;
    }

    let total = 0;
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div>
                <span>${item.name}</span><br>
                <small>${item.quantity}x @ ${item.price.toFixed(2)}€</small>
            </div>
            <div style="text-align: right;">
                <div>${itemTotal.toFixed(2)}€</div>
                <button onclick="removeFromCart(${item.id})" 
                        style="background: none; border: none; color: #C41E3A; cursor: pointer; font-weight: bold;">
                    ✕
                </button>
            </div>
        `;
        cartItemsContainer.appendChild(cartItem);
    });

    totalPriceElement.textContent = total.toFixed(2);
}

// ==================== Aus Warenkorb entfernen ====================
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

// ==================== Zur Kasse ====================
function checkout() {
    if (cart.length === 0) {
        alert('Dein Warenkorb ist leer!');
        return;
    }

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    alert(`
    🎉 Bestellung aufgegeben!
    
    Gesamtbetrag: ${total.toFixed(2)}€
    
    Vielen Dank für deinen Einkauf bei Bankstarsky!
    
    (Dies ist eine Demo - kein echte Zahlung)
    `);

    cart = [];
    updateCart();
    cartModal.style.display = 'none';
}

// ==================== Modal Funktionalität ====================
cartIcon.addEventListener('click', () => {
    cartModal.style.display = cartModal.style.display === 'block' ? 'none' : 'block';
    renderCartItems();
});

closeBtn.addEventListener('click', () => {
    cartModal.style.display = 'none';
});

window.addEventListener('click', (event) => {
    if (event.target === cartModal) {
        cartModal.style.display = 'none';
    }
});

// ==================== Benachrichtigung anzeigen ====================
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        background: #8B0000;
        color: #FFD700;
        padding: 15px 25px;
        border-radius: 8px;
        font-weight: bold;
        z-index: 999;
        animation: slideIn 0.3s ease;
        box-shadow: 0 4px 15px rgba(255, 215, 0, 0.2);
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 2000);
}

// ==================== Smooth Scrolling ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ==================== Initialisierung ====================
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
});

// CSS für Animationen
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);