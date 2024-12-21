import { cart } from "../data/cart.js";
import { products } from "../data/products.js";

let orderSummary = '';
let matchingItem;
cart.forEach((cartItem) => {
  products.forEach((product) => {
    if(cartItem.productId === product.productId) {
      matchingItem = product;
    }
  });
  document.querySelector('.js-order-summary').innerHTML += `
  <div class="order-checkout-container">
    <div class="product-checkout-options">
      <p>Delivery Date: <span>Wednesday 26 July</span></p>
      <div>
        <img class="product-checkout-image" src="${matchingItem.productImg}">
      </div>
      <div>
        <p>${matchingItem.productName}</p>
        <p>${matchingItem.productPrice}</p>
        <p>Quantity: ${cartItem.quantity}<span>Update</span><span>Delete</span></p>
      </div>
    </div>
    <div class="delivery-options">
      <p>Choose delivery option</p>
      <input type="radio" name="name1">

    </div>
  </div>


`;
})