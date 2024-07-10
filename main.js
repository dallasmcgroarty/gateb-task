// the initial product data
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

/**
 * sets up the popup modal functionality
 */
const setupPopup = () => {
  const modal = document.querySelector('.modal');
  const overlay = document.querySelector('.overlay');
  const btnCloseModal = document.querySelector('.close-modal');

  const closeModal = () => {
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
    document.body.classList.remove('no-scroll');
  }

  const openModal = () => {
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    document.body.classList.add('no-scroll');
  }

  $('body').on('click', '.add-new-product', openModal);

  btnCloseModal.addEventListener('click', closeModal);

  overlay.addEventListener('click', closeModal);

  document.querySelector('body').addEventListener('keydown', function(e) {
      if (!modal.classList.contains('hidden')) {
          if (e.key == 'Escape') {
              closeModal();
          }
      }
  });
}

/**
 * sets up localstorage
 */
const setupLocalStorage = () => {
  if (localStorage.length === 0) {
    // empty localstorage
    data.forEach(product => {
      localStorage.setItem(product.sku, JSON.stringify(product));
    })

    localStorage.setItem('cart', '0');
  }
}

/**
 * gets item from localstorage and parses it
 * 
 * @param {String} key the string to access localstorage data at specified key
 * @return {Object} The parsed product object
 */
const getItemFromLocalStorage = (key) => {
  return JSON.parse(localStorage.getItem(key))
}

/**
 * gets the cart count from localstorage and updates the cart-count element
 */
const setCartCount = () => {
  if (localStorage.getItem('cart') !== null) {
    let cartCount = Number(localStorage.getItem('cart'));
    document.getElementById('cart-count').textContent = cartCount;
  }
}

/**
 * gets the current product sku from url
 * 
 * @return {String} the products sku
 */
const getProductSku = () => {
  const sku = window.location.hash.slice(1);

  if (sku) {
    return sku;
  }

  return null;
}

/**
 * loads a product by sku, gets product data from localstorage and renders product html
 */
const loadProduct = () => {
  let sku = getProductSku()

  // if no sku or bad sku set default sku and set url
  if (sku === null || getItemFromLocalStorage(sku) === null) {
    sku = data[0].sku;
    location.href = `${window.location.pathname}#${sku}`;
  }

  let product = getItemFromLocalStorage(sku);

  if (product) {
    renderProductImages(product.images)
    renderProductDetails(product)
  }
}

/**
 * renders product images with html
 * 
 * @param {Array} images the array of images to render
 */
const renderProductImages = (images) => {
  let html = `<div class="product-images">`;

  for (img of images) {
    let image;
    if (img.includes('upload')) {
      image = localStorage.getItem(img);
      html += `<img class="product-image" src="${image}" />`;
    } else {
      html += `<img class="product-image" src="images/${img}" />`;
    }
  }

  html += `</div>`;

  if (document.getElementsByClassName('product-images').length > 0) {
    document.querySelector('.product-images').remove();
    document.querySelector('.product').insertAdjacentHTML('afterbegin', html);
   } else {
    document.querySelector('.product').insertAdjacentHTML('afterbegin', html);
   }

   // reset the slider
   setupSlider();
   $('.product-images').slick('resize');
}

/**
 * renders the product details with html
 * 
 * @param {Object} product - the product object to render
 */
const renderProductDetails = (product) => {
  html = 
  `<div class="product-details">
    <h1 class="product-name">${product.name}</h1>
    <span class="product-price">$${product.price}</span>
    <p class="product-desc">${product.description}</p>
    <span class="product-category">Category: ${product.category}</span>
    <span class="product-sku">SKU: ${product.sku}</span>
    <div class="cta-buttons">
      <button class="add-to-cart-button">Add to Cart</button>
      <button class="add-new-product">Add a New Product</button>
    </div>
   </div>`;

   if (document.getElementsByClassName('product-details').length > 0) {
    document.querySelector('.product-details').remove();
    document.querySelector('.product').insertAdjacentHTML('beforeend', html);
   } else {
    document.querySelector('.product').insertAdjacentHTML('beforeend', html);
   }
}

/**
 * sets up the add to cart event listener and updates cart value
 */
const setUpAddToCartEvent = () => {
  $('body').on('click','.add-to-cart-button', (e) => {
    let cartCount = Number(localStorage.getItem('cart'));
    cartCount += 1
    localStorage.setItem('cart', String(cartCount));
    document.getElementById('cart-count').textContent = cartCount;
  })
}

/**
 * renders recommended products, which is currently all available products
 */
const renderRecommendedProducts = () => {
  let html = '';
  let products = []
  let keys = Object.keys(localStorage);

  // get all keys from localstorage exluding ones we don't want
  keys.forEach(key => {
    if (key !== 'cart' && key !== 'loglevel' && !key.includes('upload')) {
      products.push(getItemFromLocalStorage(key));
    }
  });

  products.forEach(product => {
    let link = `${window.location.pathname}#${product.sku}`;
    let image;

    // handle case where images were uploaded to localstroage
    if (product.images[0].includes('upload')) {
      image = localStorage.getItem(product.images[0]);
    } else {
      image = `images/${product.images[0]}`;
    }

    html += `
      <div class="recommended-products__product">
        <a href="${link}" data-sku="${product.sku}" class="recommended-products__product-link">
          <img class="recommended-products__product-image" src="${image}" />
          <div class="recommended-products__product-product-info">
            <span class="recommended-products__product-name">${product.name}</span>
            <span class="recommended-products__product-price">$${product.price}</span>
          </div>
        </a>
      </div>
    `;
  });

  if (document.getElementsByClassName('recommended-products').length > 0) {
    document.querySelector('.recommended-products').innerHTML = '';
    document.querySelector('.recommended-products').insertAdjacentHTML('afterbegin', html);
   } else {
    document.querySelector('.recommended-products').insertAdjacentHTML('afterbegin', html);
   }

  setUpRecommendedProductsEvent();
}

/**
 * sets up recommended products event listeners
 *  - workaround for linking to new product pages, without having a separate page
 */
const setUpRecommendedProductsEvent = () => {
  document.querySelectorAll('.recommended-products__product-link').forEach(el => {
    el.addEventListener('click', (ev) => {
      ev.preventDefault();

      if (window.location.hash.slice(1) !== el.dataset.sku) {
        location.href = el.href;
        loadProduct();
        handleScroll();
      }
    });
  });
}

/**
 * sets up the slick slider
 */
const setupSlider = () => {
  $('.product-images').slick({
    arrows: false,
    dots: true,
    adaptiveHeight: true
  });
}

/**
 * sets up product form event listener and saves new product to localstorage
 */
const newProductFormHandler =() => {
  document.querySelector('#new-product-form').addEventListener('submit', (ev) => {
    ev.preventDefault();

    const formData = new FormData(document.querySelector('#new-product-form'),document.querySelector('#product-form-submit'));
    
    // assign uploaded to use as a possible reference
    let product = {
      uploaded: true
    }

    // store formData in new product object
    for (const [key, value] of formData) {
      if (key !== 'images') {
        product[key] = value;
      }
    }

    let images = ev.target.images.files;
    product['images'] = []

    // loop through image files
    for (let i = 0; i < images.length; i++) {
      let reader = new FileReader();

      // read file into localstorage with key
      reader.addEventListener("load", () =>{  
        localStorage.setItem(`upload-${product.sku}-image${i}`,reader.result)
      })

      // save the image keys for reference
      product['images'].push(`upload-${product.sku}-image${i}`);
      reader.readAsDataURL(images[i]);
    }

    // save to localstorage
    localStorage.setItem(product.sku, JSON.stringify(product));

    // close modal
    document.querySelector('.close-modal').click();

    // set url
    location.href = `${window.location.pathname}#${product.sku}`;
    
    // reset form fields
    document.querySelector('#new-product-form').reset();

    // wait a little to load products
    setTimeout(() => {
      loadProduct();
      renderRecommendedProducts();
    }, 500);
  })
}

/**
 * scrolls to top of page 
 */
const handleScroll = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

/**
 * initialize application
 */
const init = () => {
  setupLocalStorage();
  loadProduct();
  setCartCount();
  setUpAddToCartEvent();
  renderRecommendedProducts();
  setupPopup();
  newProductFormHandler();
}

init();
