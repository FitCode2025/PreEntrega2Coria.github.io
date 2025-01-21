const cartItemsList = document.getElementById('cartItems');
const cartTotalSpan = document.getElementById('cartTotal');
const CART_KEY = 'cartItems';
const cartMessage = document.getElementById('cart-message');

let cart = JSON.parse(localStorage.getItem(CART_KEY)) || [];
updateCartDisplay();

function addToCart(button) {
   const productDiv = button.parentNode;
   const productName = productDiv.dataset.name;
   const productPriceText = productDiv.querySelector('p').textContent;
   const productPrice = parseFloat(productPriceText.replace(/\D/g, ''));
   const productQty = parseInt(productDiv.querySelector('input[type="number"]').value);

   let existingProductIndex = cart.findIndex(item => item.name === productName);

   existingProductIndex !== -1
      ? cart[existingProductIndex].quantity += productQty
      : cart.push({ name: productName, price: productPrice, quantity: productQty });

   saveCart();
   updateCartDisplay();
}

function updateCartDisplay() {
   cartItemsList.innerHTML = '';
   let total = 0;

   cart.forEach(item => {
      const li = document.createElement('li');
        li.textContent = `${item.name} x ${item.quantity} - $${item.price * item.quantity}`;
      cartItemsList.appendChild(li);
      total += item.price * item.quantity;
   });

   cartTotalSpan.textContent = total;
}

function clearCart() {
   cart = [];
   saveCart();
   updateCartDisplay();
}

function finalizePurchase() {
   cart.length === 0
      ? showMessage("El carrito está vacío. Agrega productos para finalizar la compra.", "error")
      : (showMessage("Gracias por su compra!", "success"), clearCart());
}

function showMessage(message, type) {
   cartMessage.textContent = message;
   cartMessage.className = `cart-message ${type}`;
   setTimeout(() => {
      cartMessage.textContent = "";
      cartMessage.className = "cart-message";
   }, 3000);
}

function saveCart() {
   localStorage.setItem(CART_KEY, JSON.stringify(cart));
}