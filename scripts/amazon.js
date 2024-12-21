import { products } from "../data/products.js"
import { cart } from "../data/cart.js";

let productContainer = document.querySelector('.main');

let matchingItem;
let cartQuantity = 0;
let productHTML = '';
products.forEach((product) => {
  const html = `
  <div class="product-container">
    <img class="product-image" src="${product.productImg}"/>
    <p class="product-title">${product.productName}</p>
    <p>${product.rating.number}</p>
    <p>${product.productPrice / 100}</p>
    <select class="select-option">
      <option>1</option>
      <option>2</option>
      <option>3</option>
      <option>4</option>
    </select>
    <button class="add-to-cart" data-product-id="${product.productId}">Add to Cart</button>
  </div>
  `;
  productHTML += html;

});
productContainer.innerHTML = productHTML;

let cartCounter = 0;


function addToCart() {
  let cartButton = document.querySelectorAll('.add-to-cart');
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