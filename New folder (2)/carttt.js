


function addToCart(productName, price) {
    let cart = JSON.parse(localStorage.getItem("cart")) || []; 
    cart.push({ name: productName, price: price }); 
    localStorage.setItem("cart", JSON.stringify(cart)); 
    window.location.href = "cart.html"; 
}
function loadCart() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let cartDiv = document.getElementById("cart");
    if (cart.length === 0) {
        cartDiv.innerHTML = "<p>Your cart is empty.</p>";
        return;
    }
    let cartItems = "<ul>";
    cart.forEach((item, index) => {
        cartItems += `<li>${item.name} - $${item.price} 
        <button onclick="removeItem(${index})">Remove</button></li>`;
    });
    cartItems += "</ul>";
    cartDiv.innerHTML = cartItems;
}
function removeItem(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1); 
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart(); 
}
function clearCart() {
    localStorage.removeItem("cart");
    loadCart();
}
window.onload = loadCart;