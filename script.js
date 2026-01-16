
// ==========================================
// WHATSAPP NUMBER - ALREADY ADDED!
// ==========================================
var WHATSAPP_NUMBER = '923442089665';
// ==========================================

// Cart variables
var cartCount = 0;
var cartItems = [];

// Add to cart function
function addToCart(itemName, itemPrice) {
    cartCount = cartCount + 1;
    cartItems.push({ name: itemName, price: itemPrice });
    
    var cartCountElement = document.querySelector('.cart-count');
    if (cartCountElement) {
        cartCountElement.textContent = cartCount;
    }
    
    var cartIcon = document.querySelector('.cart-icon');
    if (cartIcon) {
        cartIcon.style.transform = 'scale(1.3)';
        setTimeout(function() {
            cartIcon.style.transform = 'scale(1)';
        }, 200);
    }
    
    showNotification(itemName + ' added to cart!');
}

// Show notification
function showNotification(message) {
    var existingNotif = document.querySelector('.cart-notification');
    if (existingNotif) {
        existingNotif.remove();
    }
    
    var notification = document.createElement('div');
    notification.className = 'cart-notification';
    notification.textContent = '✓ ' + message;
    notification.style.cssText = 'position: fixed; top: 100px; right: 30px; background: linear-gradient(135deg, #DAA520, #FFD700); color: #000; padding: 20px 40px; border-radius: 50px; font-weight: bold; z-index: 10000; animation: slideIn 0.5s ease; box-shadow: 0 10px 30px rgba(218, 165, 32, 0.5); font-size: 16px; letter-spacing: 1px;';
    
    document.body.appendChild(notification);
    
    setTimeout(function() {
        notification.style.animation = 'slideOut 0.5s ease';
        setTimeout(function() {
            notification.remove();
        }, 500);
    }, 2000);
}

// Calculate total price
function calculateTotal() {
    var total = 0;
    for (var i = 0; i < cartItems.length; i++) {
        total = total + cartItems[i].price;
    }
    return total;
}

// Show cart summary with checkout option
function showCart() {
    if (cartItems.length === 0) {
        showNotification('Your cart is empty!');
        return;
    }
    
    var modal = document.createElement('div');
    modal.className = 'cart-modal';
    modal.style.cssText = 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.9); z-index: 10000; display: flex; justify-content: center; align-items: center; animation: fadeIn 0.3s ease;';
    
    var total = calculateTotal();
    var deliveryFee = total >= 2000 ? 0 : 200;
    var finalTotal = total + deliveryFee;
    
    var cartHTML = '<div style="background: linear-gradient(145deg, #1a1a1a, #0f0f0f); padding: 50px; border-radius: 30px; max-width: 600px; width: 90%; max-height: 80vh; overflow-y: auto; border: 3px solid #DAA520; box-shadow: 0 30px 90px rgba(218, 165, 32, 0.5);">';
    cartHTML += '<div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px;">';
    cartHTML += '<h2 style="color: #FFD700; font-size: 36px; margin: 0;">Your Cart</h2>';
    cartHTML += '<button onclick="closeCartModal()" style="background: none; border: none; color: #FFD700; font-size: 40px; cursor: pointer; line-height: 1;">&times;</button>';
    cartHTML += '</div>';
    
    cartHTML += '<div style="margin-bottom: 30px;">';
    for (var i = 0; i < cartItems.length; i++) {
        cartHTML += '<div style="display: flex; justify-content: space-between; padding: 15px; background: rgba(218, 165, 32, 0.1); margin-bottom: 10px; border-radius: 15px; border-left: 4px solid #DAA520;">';
        cartHTML += '<span style="color: #F4E4C1; font-size: 18px;">' + cartItems[i].name + '</span>';
        cartHTML += '<span style="color: #FFD700; font-weight: bold; font-size: 18px;">Rs. ' + cartItems[i].price + '</span>';
        cartHTML += '</div>';
    }
    cartHTML += '</div>';
    
    cartHTML += '<div style="border-top: 2px solid rgba(218, 165, 32, 0.3); padding-top: 20px; margin-bottom: 25px;">';
    cartHTML += '<div style="display: flex; justify-content: space-between; margin-bottom: 10px;">';
    cartHTML += '<span style="color: #c0c0c0; font-size: 18px;">Subtotal:</span>';
    cartHTML += '<span style="color: #F4E4C1; font-size: 18px;">Rs. ' + total + '</span>';
    cartHTML += '</div>';
    cartHTML += '<div style="display: flex; justify-content: space-between; margin-bottom: 15px;">';
    cartHTML += '<span style="color: #c0c0c0; font-size: 18px;">Delivery:</span>';
    if (deliveryFee === 0) {
        cartHTML += '<span style="color: #FFD700; font-weight: bold; font-size: 18px;">FREE ✨</span>';
    } else {
        cartHTML += '<span style="color: #F4E4C1; font-size: 18px;">Rs. ' + deliveryFee + '</span>';
    }
    cartHTML += '</div>';
    cartHTML += '<div style="display: flex; justify-content: space-between; padding-top: 15px; border-top: 2px solid rgba(218, 165, 32, 0.5);">';
    cartHTML += '<span style="color: #FFD700; font-size: 24px; font-weight: bold;">Total:</span>';
    cartHTML += '<span style="color: #FFD700; font-size: 28px; font-weight: bold;">Rs. ' + finalTotal + '</span>';
    cartHTML += '</div>';
    cartHTML += '</div>';
    
    if (total < 2000) {
        var remaining = 2000 - total;
        cartHTML += '<div style="background: rgba(218, 165, 32, 0.15); padding: 15px; border-radius: 15px; margin-bottom: 25px; text-align: center; border: 2px solid rgba(218, 165, 32, 0.4);">';
        cartHTML += '<p style="color: #FFD700; margin: 0; font-size: 16px;">Add Rs. ' + remaining + ' more for FREE DELIVERY! 🚚</p>';
        cartHTML += '</div>';
    }
    
    cartHTML += '<div style="display: flex; gap: 15px; margin-top: 25px;">';
    cartHTML += '<button onclick="clearCart()" style="flex: 1; padding: 18px; background: rgba(255, 0, 0, 0.2); color: #ff6b6b; border: 2px solid #ff6b6b; border-radius: 50px; font-size: 16px; font-weight: bold; cursor: pointer; letter-spacing: 2px; text-transform: uppercase; transition: all 0.3s;">Clear Cart</button>';
    cartHTML += '<button onclick="proceedToCheckout()" style="flex: 2; padding: 18px; background: linear-gradient(135deg, #DAA520, #B8860B); color: #000; border: none; border-radius: 50px; font-size: 16px; font-weight: bold; cursor: pointer; letter-spacing: 2px; text-transform: uppercase; box-shadow: 0 10px 30px rgba(218, 165, 32, 0.5); transition: all 0.3s;">Checkout 🛒</button>';
    cartHTML += '</div>';
    
    cartHTML += '</div>';
    
    modal.innerHTML = cartHTML;
    document.body.appendChild(modal);
}

// Close cart modal
function closeCartModal() {
    var modal = document.querySelector('.cart-modal');
    if (modal) {
        modal.style.animation = 'fadeOut 0.3s ease';
        setTimeout(function() {
            modal.remove();
        }, 300);
    }
}

// Clear cart
function clearCart() {
    if (confirm('Are you sure you want to clear your cart?')) {
        cartCount = 0;
        cartItems = [];
        var cartCountElement = document.querySelector('.cart-count');
        if (cartCountElement) {
            cartCountElement.textContent = '0';
        }
        closeCartModal();
        showNotification('Cart cleared!');
    }
}

// Proceed to checkout
function proceedToCheckout() {
    closeCartModal();
    
    var modal = document.createElement('div');
    modal.className = 'checkout-modal';
    modal.style.cssText = 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.9); z-index: 10000; display: flex; justify-content: center; align-items: center; animation: fadeIn 0.3s ease; overflow-y: auto; padding: 20px;';
    
    var formHTML = '<div style="background: linear-gradient(145deg, #1a1a1a, #0f0f0f); padding: 50px; border-radius: 30px; max-width: 600px; width: 90%; border: 3px solid #DAA520; box-shadow: 0 30px 90px rgba(218, 165, 32, 0.5);">';
    formHTML += '<div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px;">';
    formHTML += '<h2 style="color: #FFD700; font-size: 36px; margin: 0;">Checkout</h2>';
    formHTML += '<button onclick="closeCheckoutModal()" style="background: none; border: none; color: #FFD700; font-size: 40px; cursor: pointer; line-height: 1;">&times;</button>';
    formHTML += '</div>';
    
    formHTML += '<form id="checkoutForm" onsubmit="sendOrderToWhatsApp(event)" style="margin-bottom: 0;">';
    
    formHTML += '<input type="text" id="customerName" placeholder="Your Name *" required style="width: 100%; padding: 18px; margin-bottom: 20px; background: rgba(0, 0, 0, 0.6); border: 2px solid rgba(218, 165, 32, 0.4); border-radius: 15px; color: #fff; font-size: 16px; font-family: Georgia, serif;">';
    
    formHTML += '<input type="tel" id="customerPhone" placeholder="Phone Number *" required style="width: 100%; padding: 18px; margin-bottom: 20px; background: rgba(0, 0, 0, 0.6); border: 2px solid rgba(218, 165, 32, 0.4); border-radius: 15px; color: #fff; font-size: 16px; font-family: Georgia, serif;">';
    
    formHTML += '<textarea id="customerAddress" placeholder="Delivery Address *" required rows="3" style="width: 100%; padding: 18px; margin-bottom: 20px; background: rgba(0, 0, 0, 0.6); border: 2px solid rgba(218, 165, 32, 0.4); border-radius: 15px; color: #fff; font-size: 16px; font-family: Georgia, serif; resize: none;"></textarea>';
    
    formHTML += '<textarea id="customerNotes" placeholder="Special Instructions (Optional)" rows="2" style="width: 100%; padding: 18px; margin-bottom: 25px; background: rgba(0, 0, 0, 0.6); border: 2px solid rgba(218, 165, 32, 0.4); border-radius: 15px; color: #fff; font-size: 16px; font-family: Georgia, serif; resize: none;"></textarea>';
    
    formHTML += '<button type="submit" style="width: 100%; padding: 20px; background: linear-gradient(135deg, #25D366, #128C7E); color: #fff; border: none; border-radius: 50px; font-size: 18px; font-weight: bold; cursor: pointer; letter-spacing: 2px; text-transform: uppercase; box-shadow: 0 10px 30px rgba(37, 211, 102, 0.5); transition: all 0.3s;">📱 Send Order via WhatsApp</button>';
    
    formHTML += '</form>';
    formHTML += '</div>';
    
    modal.innerHTML = formHTML;
    document.body.appendChild(modal);
}

// Close checkout modal
function closeCheckoutModal() {
    var modal = document.querySelector('.checkout-modal');
    if (modal) {
        modal.style.animation = 'fadeOut 0.3s ease';
        setTimeout(function() {
            modal.remove();
        }, 300);
    }
}

// Send order to WhatsApp
function sendOrderToWhatsApp(event) {
    event.preventDefault();
    
    var name = document.getElementById('customerName').value;
    var phone = document.getElementById('customerPhone').value;
    var address = document.getElementById('customerAddress').value;
    var notes = document.getElementById('customerNotes').value;
    
    if (cartItems.length === 0) {
        alert('Cart is empty!');
        return false;
    }
    
    var message = '🛍️ NEW ORDER FROM MAYBITE\n\n';
    message += '👤 Customer Details:\n';
    message += 'Name: ' + name + '\n';
    message += 'Phone: ' + phone + '\n';
    message += 'Address: ' + address + '\n\n';
    
    message += '📦 Order Items:\n';
    message += '━━━━━━━━━━━━━━━━\n';
    
    var total = 0;
    for (var i = 0; i < cartItems.length; i++) {
        total = total + cartItems[i].price;
        message += (i + 1) + '. ' + cartItems[i].name + '\n';
        message += '   Rs. ' + cartItems[i].price + '\n\n';
    }
    
    message += '━━━━━━━━━━━━━━━━\n';
    message += '💰 Subtotal: Rs. ' + total + '\n';
    
    var deliveryFee = total >= 2000 ? 0 : 200;
    if (deliveryFee === 0) {
        message += '🚚 Delivery: FREE ✨\n';
    } else {
        message += '🚚 Delivery: Rs. ' + deliveryFee + '\n';
    }
    
    var finalTotal = total + deliveryFee;
    message += '━━━━━━━━━━━━━━━━\n';
    message += '💵 TOTAL: Rs. ' + finalTotal + '\n\n';
    
    if (notes) {
        message += '📝 Special Instructions:\n' + notes + '\n\n';
    }
    
    message += '━━━━━━━━━━━━━━━━\n';
    message += '⏰ Order Time: ' + new Date().toLocaleString() + '\n';
    message += '━━━━━━━━━━━━━━━━';
    
    var whatsappURL = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(message);
    
    window.open(whatsappURL, '_blank');
    
    closeCheckoutModal();
    showNotification('Order sent to WhatsApp! ✅');
    
    setTimeout(function() {
        if (confirm('Order sent successfully! Clear cart?')) {
            clearCart();
        }
    }, 1500);
    
    return false;
}

// Filter products by category
function filterProducts(category) {
    var products = document.querySelectorAll('.product-card');
    var tabs = document.querySelectorAll('.tab-btn');
    
    for (var i = 0; i < tabs.length; i++) {
        tabs[i].classList.remove('active');
    }
    
    event.target.classList.add('active');
    
    for (var j = 0; j < products.length; j++) {
        var productCategory = products[j].getAttribute('data-category');
        
        if (category === 'all' || productCategory === category) {
            products[j].style.display = 'block';
            products[j].style.animation = 'fadeInUp 0.5s ease';
        } else {
            products[j].style.display = 'none';
        }
    }
}

// Submit contact form
function submitForm(event) {
    event.preventDefault();
    
    var nameField = document.getElementById('name');
    var emailField = document.getElementById('email');
    var phoneField = document.getElementById('phone');
    var messageField = document.getElementById('message');
    
    if (!nameField || !emailField || !phoneField || !messageField) {
        alert('Please fill all fields!');
        return false;
    }
    
    if (nameField.value === '' || emailField.value === '' || phoneField.value === '' || messageField.value === '') {
        alert('Please fill all fields!');
        return false;
    }
    
    var contactMessage = '📧 CONTACT FORM MESSAGE\n\n';
    contactMessage += 'Name: ' + nameField.value + '\n';
    contactMessage += 'Email: ' + emailField.value + '\n';
    contactMessage += 'Phone: ' + phoneField.value + '\n\n';
    contactMessage += 'Message:\n' + messageField.value;
    
    var whatsappURL = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(contactMessage);
    window.open(whatsappURL, '_blank');
    
    showNotification('Message sent via WhatsApp!');
    
    nameField.value = '';
    emailField.value = '';
    phoneField.value = '';
    messageField.value = '';
    
    return false;
}

// Smooth scroll function
function smoothScroll(target) {
    var element = document.querySelector(target);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// Initialize when page loads
window.addEventListener('DOMContentLoaded', function() {
    
    var style = document.createElement('style');
    style.textContent = '@keyframes slideIn { from { transform: translateX(400px); opacity: 0; } to { transform: translateX(0); opacity: 1; } } @keyframes slideOut { from { transform: translateX(0); opacity: 1; } to { transform: translateX(400px); opacity: 0; } } @keyframes fadeInUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } } @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } } @keyframes fadeOut { from { opacity: 1; } to { opacity: 0; } }';
    document.head.appendChild(style);
    
    var anchors = document.querySelectorAll('a[href^="#"]');
    for (var i = 0; i < anchors.length; i++) {
        anchors[i].addEventListener('click', function(e) {
            e.preventDefault();
            var targetId = this.getAttribute('href');
            smoothScroll(targetId);
        });
    }
    
    var products = document.querySelectorAll('.product-card');
    if (products.length > 0 && 'IntersectionObserver' in window) {
        var observer = new IntersectionObserver(function(entries) {
            for (var i = 0; i < entries.length; i++) {
                if (entries[i].isIntersecting) {
                    entries[i].target.style.animation = 'fadeInUp 0.6s ease forwards';
                    observer.unobserve(entries[i].target);
                }
            }
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        for (var j = 0; j < products.length; j++) {
            observer.observe(products[j]);
        }
    }
    
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('cart-modal') || e.target.classList.contains('checkout-modal')) {
            e.target.style.animation = 'fadeOut 0.3s ease';
            setTimeout(function() {
                e.target.remove();
            }, 300);
        }
    });
});