const products = [
    { id: 1, name: 'PinePhone Pro', price: 600.00, image: './img/pine-phone-pro.png' },
    { id: 2, name: 'Fairphone 4', price: 1399.00, image: './img/fairphone.jpg' },
    { id: 3, name: 'Google Pixel 4', price: 308.00, image: './img/pixel-4.jpg' }
  ];
  

  function displayProducts() {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';
  
    products.forEach(product => {
      const productElement = document.createElement('div');
      productElement.className = 'product';
  
      const imageElement = document.createElement('img');
      imageElement.src = product.image;
  
      const nameElement = document.createElement('span');
      nameElement.textContent = product.name;
  
      const priceElement = document.createElement('span');
      priceElement.textContent = `$${product.price.toFixed(2)}`;
  
      const addToCartButton = document.createElement('button');
      addToCartButton.className = 'add-to-cart-btn';
      addToCartButton.textContent = 'Add to Cart';
      addToCartButton.addEventListener('click', () => addToCart(product));
  
      productElement.appendChild(imageElement);
      productElement.appendChild(nameElement);
      productElement.appendChild(priceElement);
      productElement.appendChild(addToCartButton);
  
      productList.appendChild(productElement);
    });
  }
  
 
  function addToCart(product) {
    const cartItems = document.getElementById('cart-items');
    const totalElement = document.getElementById('total-price');
  
    const cartItem = document.createElement('li');
    cartItem.textContent = `${product.name} - $${product.price.toFixed(2)}`;
  
    const quantityInput = document.createElement('input');
    quantityInput.type = 'number';
    quantityInput.min = 1;
    quantityInput.value = 1;
    quantityInput.addEventListener('input', () => updateCartItemTotal(product, cartItem, quantityInput));
  
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => removeCartItem(product, cartItem));
  
    cartItem.appendChild(quantityInput);
    cartItem.appendChild(deleteButton);
    cartItems.appendChild(cartItem);
  
    updateTotalPrice();
  }
  

  function updateTotalPrice() {
    const cartItems = document.getElementById('cart-items');
    const totalElement = document.getElementById('total-price');
  
    let totalPrice = 0;
    for (let i = 0; i < cartItems.children.length; i++) {
      const cartItem = cartItems.children[i];
      const price = parseFloat(cartItem.textContent.match(/\$\d+\.\d+/)[0].slice(1));
      const quantity = parseInt(cartItem.querySelector('input').value);
      totalPrice += price * quantity;
    }
  
    totalElement.textContent = `Total Price: $${totalPrice.toFixed(2)}`;
  }
  

  function updateCartItemTotal(product, cartItem, quantityInput) {
    const price = parseFloat(cartItem.textContent.match(/\$\d+\.\d+/)[0].slice(1));
    const quantity = parseInt(quantityInput.value);
    const totalPrice = price * quantity;
    cartItem.textContent = `${product.name} - $${totalPrice.toFixed(2)}`;
  
    updateTotalPrice();
  }
  

  function removeCartItem(product, cartItem) {
    cartItem.remove();
    updateTotalPrice();
  }
  

  window.addEventListener('load', displayProducts);
  