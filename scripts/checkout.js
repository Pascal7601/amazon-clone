import { cart } from "../data/cart.js";
import { deliveryOptions } from "../data/deliveryOptions.js";
import { products } from "../data/products.js";

console.log(dayjs());


let orderSummary = '';
let matchingItem;
let orderSummaryContainer = document.querySelector('.js-order-summary');
function renderOrderSummary() {
  orderSummaryContainer.innerHTML = '';

  cart.forEach((cartItem) => {
    products.forEach((product) => {
      if(cartItem.productId === product.productId) {
        matchingItem = product;
      }
    });
    
    let deliveryOptionsHTML = '';
    deliveryOptions.forEach((deliveryOption) => {
      const today = dayjs();
      const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
      const dateString = deliveryDate.format('dddd, MMMM D');
  
      const deliveryPrice = deliveryOption.deliveryDays === 7 ? 'FREE' : (deliveryOption.deliveryPrice / 100)
        .toFixed(2);
  
      deliveryOptionsHTML += `
      <div class="radio-delivery">
            <input class="js-radio-button" type="radio" name="name-${matchingItem.productId}"
              value="${dateString}"
            >
            <div class="date-price-container">
              <div class="delivery-option-date">
                ${dateString}
              </div>
              <div class="delivery-option-price">
                ${deliveryPrice} - Shipping
              </div>
            </div>
      </div>
      `
    })
    orderSummaryContainer.innerHTML += `
    <div class="order-checkout-container">
      <div class="delivery-date">Delivery Date: <span class="order-date-${matchingItem.productId}">${dayjs().format('dddd, MMMM, DD')}</span></div>
      <div class="product-checkout">
        <div class="product-options-container">
          <div class="product-checkout-image-container">
            <img class="product-checkout-image" src="${matchingItem.productImg}">
          </div>
          <div class="product-checkout-options">
            <p class="product-checkout-name">${matchingItem.productName}</p>
            <p class="product-checkout-price">$${(matchingItem.productPrice / 100).toFixed(2)}</p>
            <p class="product-checkout-quantity">Quantity: ${cartItem.quantity}<span class="quantity-update">Update</span><span class="quantity-update js-delete-button" data-product-id="${matchingItem.productId}">Delete</span></p>
          </div>
        </div>
        <div class="delivery-options">
          <p>Choose delivery option</p>
          ${deliveryOptionsHTML}
        </div>
      </div>
    </div>
  
  
  `;
  })
}

function attachEventListeners() {
  const radios = document.querySelectorAll(".js-radio-button");
  radios.forEach((radio) => {
    radio.addEventListener('change', (event) => {
      if(event.target.checked) {
        const productId = event.target.name.split('-')[1];
        document.querySelector(`.order-date-${productId}`).innerHTML = event.target.value;
      }
    })
  });

  const deleteProductButton = document.querySelectorAll('.js-delete-button');
  deleteProductButton.forEach(btn => {
    btn.addEventListener('click', (event)=> {
      const productID = event.target.getAttribute('data-product-id');
      console.log(productID);
      const itemIndex = cart.findIndex((item) => item.productId === productID);

      if(itemIndex !== -1) {
        cart.splice(itemIndex, 1);
        renderOrderSummary();
      }
    })
  });
}

renderOrderSummary();
attachEventListeners();

const orderPriceSummary = document.querySelector('.js-checkout-page');
orderPriceSummary.innerHTML += `
  <div class="order-price-checkout">
    <p class="order-title">Order Summary</p>
    <p>Items (<span class="order-checkout-number-items">4</span>) <span>50.96</span></p>
  </div>
`;