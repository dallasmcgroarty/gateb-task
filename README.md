# gateb-task

gateb task

## Features

Product Detail Page

- only one page is used

  - javascript is used to get the sku from the url and load that product

- header
  - contains a title
  - contains cart icon and cart count
- product info

  - product name, description, price, category, SKU, and images
  - product images slider with dots
  - add to cart button that updates cart count
  - add new product button
    - opens a modal with a form to upload a new product

- recommended products

  - recommended products title
  - displays all available products from localstorage, including newly added products
  - each product block is a link to that product
  - product block shows product name and price

- add new product form modal

  - popup containing the form
  - closes on clicking outside of popup or by clicking the X icon
  - the form has fields: name, description, price, category, sku and images
  - file upload accepts multiple files, use images please
  - submit form button
  - redirect to the newly created product after submitting
  - all fields are required to submit the form

- localstorage is used to retreive and save all products

- handling special cases
  - no sku entered/base url
    - the first product from the initial data is used
  - sku does not exist in localstorage
    - the first product from the initial data is used
  - submitting no form data
    - all fields are required
  - submitting non image files
    - file input only accepts .jpg,.jpeg,.png, and .gif
  - duplicate sku used
    - will override the current data in localstroge associated with that key
