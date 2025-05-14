function addToCart(productName, colorId, quantityId) {
    // Get selected color and quantity
    let selectedColor = document.getElementById(colorId).value;
    let quantityValue = document.getElementById(quantityId).value;

    // Base price per liter
    let pricePerLiter = 200;
    let quantityInLiters = 0;

    // Convert quantity to liters
    switch (quantityValue) {
        case "250ml": quantityInLiters = 0.25; break;
        case "500ml": quantityInLiters = 0.5; break;
        case "1L": quantityInLiters = 1; break;
        case "2L": quantityInLiters = 2; break;
        case "5L": quantityInLiters = 5; break;
        case "10L": quantityInLiters = 10; break;
        default: quantityInLiters = 1;
    }

    let totalPrice = quantityInLiters * pricePerLiter;

    // Save to localStorage
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push({ name: productName, color: selectedColor, quantity: quantityValue, price: totalPrice,});
    localStorage.setItem("cart", JSON.stringify(cart));

    alert(`${productName} added to cart!`);
    window.location.href = "cart.html";
}

// Load Cart Items in Cart Page
function loadCart() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let cartList = document.getElementById("cart-items");
    let cartContainer = document.getElementById("cart");
    let totalPrice = 0;

    if (cart.length === 0) {
        cartContainer.innerHTML = "<p>Your cart is empty.</p>";
        return;
    }

    cartList.innerHTML = "";
    cart.forEach((item, index) => {
        totalPrice += item.price;

        let listItem = document.createElement("li");
        listItem.innerHTML = `
            <strong>${item.name}</strong> <br>
            Color: <span style="background-color:${item.color}; width:20px; height:20px; display:inline-block; border:1px solid #000;"></span> ${item.color} <br>
            Quantity: ${item.quantity} <br>
            Price: ₹${item.price.toFixed(2)} <br>
            <button onclick="removeItem(${index})">Remove</button>
            <hr>
        `;
        cartList.appendChild(listItem);
    });

    let totalDisplay = document.createElement("h3");
    totalDisplay.innerText = `Total Price: ₹${totalPrice.toFixed(2)}`;
    cartContainer.appendChild(totalDisplay);
}

// Remove an item from cart
function removeItem(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
}

// Clear Cart
function clearCart() {
    localStorage.removeItem("cart");
    loadCart();
}

// Load cart on page load
window.onload = loadCart;
