# Rejoiner Node.js client wrapper

## Install

````bash
yarn add rejoiner
````

or

````bash
npm install rejoiner --save
````

## Use

````js
var Rejoiner = require('rejoiner')

var apiClient = new Rejoiner({
  siteId: '527bcca942bd247ca1816847',
  domain: '173.203.96.102',
  apiKey: '63cab4a5e1c44fcbbe260daa3f0bc55d',
  apiSecret: 'cb015c09a3b54688a247470b462082b3',
})
````

## Endpoints

### Convert Lead

````js
apiClient.lead.convert({
  email: 'foo2@bar.com',
  cart_data: {
    cart_value: 79996,
    cart_item_count: 2,
  },
  cart_items: [{
    'name': 'Item Name',
    'product_id': 'ITM1',
    'price': 19999,
    'product_url': 'http://yoursite.com/productpage',
    'category': ['televisions', 'smart_tv'],
    'item_qty': 2,
    'qty_price': 39998,
    'image_url': 'http://yoursite.com/path/to/image.jpg'
  }, {
    'name': 'Item Name2',
    'product_id': 'ITM2',
    'price': 19999,
    'product_url': 'http://yoursite.com/productpage2',
    'category': ['televisions'],
    'item_qty': 2,
    'qty_price': 39998,
    'image_url': 'http://yoursite.com/path/to/image2.jpg'
  }],
})
  .then(...)
  .catch(...)
````

### Cancellation

````js
apiClient.lead.cancel('foo@bar.com')
  .then(...)
  .catch(...)
````

### Adding Contact to List

````js
apiClient.contact.add({
  email: 'foo@bar.com',
  list_id: '5706374ae6ec520d3370e368',
  first_name: 'Tom',
})
  .then(...)
  .catch(...)
````

### Unsubscribe Contact

````js
apiClient.lead.unsubscribe('foo@bar.com')
  .then(...)
  .catch(...)
````

### Retrieve Lists

````js
apiClient.lists.get()
  .then(...)
  .catch(...)
````

### Record Contact Opt In

````js
apiClient.lead.optIn('foo@bar.com')
  .then(...)
  .catch(...)
````
