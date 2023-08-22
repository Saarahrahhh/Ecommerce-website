// define an empty cart array to store items
let cart = [];

// add item to cart
function addItemToCart(item) {
  // check if item already exists in cart
  const existingItem = cart.find(cartItem => cartItem.id === item.id);
  if (existingItem) {
    // if item already exists, increase the quantity by 1
    existingItem.quantity++;
  } else {
    // if item doesn't exist, add it to the cart with a quantity of 1
    cart.push({ id: item.id, name: item.name, price: item.price, quantity: 1 });
  }
  // update the cart display
  displayCart();
}

// remove item from cart
function removeItemFromCart(itemId) {
  // find the index of the item in the cart array
  const itemIndex = cart.findIndex(cartItem => cartItem.id === itemId);
  // remove the item from the cart array
  cart.splice(itemIndex, 1);
  // update the cart display
  displayCart();
}

// update item quantity in cart
function updateItemQuantity(itemId, quantity) {
  // find the item in the cart array
  const item = cart.find(cartItem => cartItem.id === itemId);
  // update the item quantity
  item.quantity = quantity;
  // update the cart display
  displayCart();
}

// calculate total price of items in cart
function calculateTotalPrice() {
  // reduce the cart array to a total price
  const totalPrice = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  return totalPrice.toFixed(2); // return total price with 2 decimal places
}

// display the items in the cart and total price
function displayCart() {
  const cartContainer = document.getElementById('cart-container');
  // clear the existing cart items
  cartContainer.innerHTML = '';
  // loop through the cart array and create HTML elements for each item
  cart.forEach(item => {
    const itemContainer = document.createElement('div');
    itemContainer.classList.add('cart-item');
    itemContainer.innerHTML = `
      <div class="item-info">
        <span class="item-name">${item.name}</span>
        <span class="item-price">$${item.price.toFixed(2)}</span>
      </div>
      <div class="item-actions">
        <button class="remove-btn" onclick="removeItemFromCart(${item.id})">Remove</button>
        <input type="number" class="quantity-input" value="${item.quantity}" onchange="updateItemQuantity(${item.id}, this.value)">
      </div>
    `;
    cartContainer.appendChild(itemContainer);
  });
  // display the total price
  const totalPriceContainer = document.getElementById('total-price');
  totalPriceContainer.textContent = `$${calculateTotalPrice()}`;
}

// add item to cart when "Add to Cart" button is clicked
const addToCartButton = document.getElementById('add-to-cart');
addToCartButton.addEventListener('click', () => {
  const itemToAdd = { id: 1, name: 'Product 1', price: 10 };
  addItemToCart(itemToAdd);
});
