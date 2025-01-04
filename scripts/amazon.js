import { products } from "../data/products.js"
import { cart } from "../data/cart.js";

let productContainer = document.querySelector('.main');

let matchingItem;
let cartQuantity = 0;
let productHTML = '';
products.forEach((product) => {
  const html = `
  <div class="product-container">
    <div class="product-image-container">
      <img class="product-image" src="${product.productImg}"/>
    </div>
    <div class="product-title">
      <p>${product.productName}</p>
    </div>
    <div class="product-stars-container">
      <img class="product-stars" src="${product.rating.stars}"><span class="rating-number">${product.rating.number}</span>
    </div>
    <div class="product-price">
      <p>$${(product.productPrice / 100).toFixed(2)}</p>
    </div>
    <div>
      <select class="select-option">
        <option>1</option>
        <option>2</option>
        <option>3</option>
        <option>4</option>
      </select>
    </div>
    <button class="add-to-cart js-add-to-cart" data-product-id="${product.productId}">Add to Cart</button>
  </div>
  `;
  productHTML += html;

});
productContainer.innerHTML = productHTML;

let cartCounter = 0;


function addToCart() {
  let cartButton = document.querySelectorAll('.js-add-to-cart');
  cartButton.forEach((button) => {
    button.addEventListener('click', (event) => {
      const productId = event.target.getAttribute('data-product-id');
      
      cartQuantity += 1;
      matchingItem = cart.find((cartItem) => {
        return cartItem.productId === productId;
      })
      if(matchingItem) {
        matchingItem.quantity += 1;
      } else {
        cart.push({
          productId: productId,
          quantity: 1
        });
      }
      cartCounter += 1;
      document.querySelector('.cart-counter').innerHTML = cartCounter;

      console.log(cart);
      })
    })
}

addToCart();