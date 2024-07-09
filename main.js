let data = [
  {
    name: 'Wireless Earbuds',
    description: 'Experience unparalleled sound quality with our high-quality wireless earbuds. Featuring advanced noise cancellation technology and a long-lasting battery life, these earbuds are perfect for music lovers and professionals on the go. With a comfortable, ergonomic design, you can enjoy your favorite tunes or take calls with ease.',
    price: 59.99,
    category: 'Electronics',
    sku: 'WLB-001',
    images: [
      'WLB-001-01.webp',
      'WLB-001-02.webp',
      'WLB-001-03.webp',
      'WLB-001-04.webp'
    ]
  },
  {
    name: 'Yoga Mat',
    description: 'Enhance your yoga practice with our durable and eco-friendly yoga mat. Designed for all types of yoga and exercise routines, this mat provides superior grip and cushioning to support your movements. Made from sustainable materials, it ensures both comfort and environmental consciousness during your workout sessions.',
    price: 29.99,
    category: 'Fitness',
    sku: 'YM-002',
    images: [
      'YM-002-01.webp',
      'YM-002-02.webp',
      'YM-002-03.webp',
      'YM-002-04.webp'
    ]
  },
  {
    name: 'Coffee Maker',
    description: 'Start your mornings right with our programmable coffee maker. Featuring a 12-cup capacity and a built-in grinder, this coffee maker allows you to enjoy fresh, flavorful coffee at the touch of a button. Its sleek design and easy-to-use interface make it a perfect addition to any kitchen, catering to both coffee enthusiasts and casual drinkers.',
    price: 89.99,
    category: 'Home Goods',
    sku: 'CM-003',
    images: [
      `CM-003-01.webp`,
      'CM-003-02.webp',
      'CM-003-03.webp',
      'CM-003-04.webp'
    ]
  },
  {
    name: 'Hiking Backpack',
    description: 'Gear up for your outdoor adventures with our lightweight and water-resistant hiking backpack. Featuring multiple compartments and a built-in hydration bladder, this backpack is designed to keep you organized and hydrated on the go. Its robust construction and comfortable fit make it an ideal choice for hikers, campers, and travelers.',
    price: 79.99,
    category: 'Outdoors',
    sku: 'HB-004',
    images: [
      'HB-004-01.webp',
      'HB-004-02.webp',
      'HB-004-03.webp',
      'HB-004-04.webp'
    ]
  }
]

const id = window.location.hash.slice(1);
console.log(id)
// product url ==> /#{sku}

function setupLocalStorage() {
  if (localStorage.length === 0) {
    // empty localstorage
    data.forEach(product => {
      localStorage.setItem(product.sku, JSON.stringify(product));
    })

    localStorage.setItem('cart', '0');
  }
}

function getItemFromLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key))
}

function getProductSku() {
  const sku = window.location.hash.slice(1);

  if (sku) {
    return sku;
  }

  return null;
}

function loadProduct() {
  sku = getProductSku()

  product = getItemFromLocalStorage(sku);

  if (product) {
    renderProductImages(product.images)
    renderProductDetails(product)
  }

  console.log(product)
}

function renderProductImages(images) {
  html = `<div class="product-images">`;

  for (img of images) {
    html += `<img class="product-image" src="images/${img}" />`;
  }

  html += `</div>`;
  document.querySelector('.product').insertAdjacentHTML('afterbegin', html);
}

function renderProductDetails(product) {
  html = 
  `<div class="product-details">
    <h1 class="product-name">${product.name}</h1>
    <span class="product-price">$${product.price}</span>
    <p class="product-desc">${product.description}</p>
    <span class="product-category">${product.category}</span>
    <span class="product-sku">${product.sku}</span>
    <button class="add-to-cart-button">Add to Cart</button>
   </div>`;

   document.querySelector('.product').insertAdjacentHTML('beforeend', html);
}

function setUpAddToCartEvent() {
  document.querySelector('.add-to-cart-button').addEventListener('click', (e) => {
    cartCount = Number(localStorage.getItem('cart'));
    cartCount += 1
    localStorage.setItem('cart', String(cartCount));
    console.log(cartCount);
  })
}

function setupSlider() {
  $('.product-images').slick({
    arrows: false,
    dots: true,
    adaptiveHeight: true
  });
}

function init() {
  setupLocalStorage()
  loadProduct()
  setupSlider()
  setUpAddToCartEvent()
}

init()