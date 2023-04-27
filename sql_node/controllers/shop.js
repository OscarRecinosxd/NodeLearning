const Product = require('../models/product');
const Order = require('../models/order');

exports.getProducts = (req, res) => {
  Product.findAll()
  .then( products => {
    console.log(products)
    res.render("shop/index",{
      prods: products,
      pageTitle : "shop",
      path : "/"
    })
  })
  .catch(err => 
    console.log(err)
  )
};

exports.getProduct = (req, res) => {
  const prodId = req.params.productId;

  // Product.findAll({where : {id :prodId}}).then(product =>{
  //   res.render("shop/product-detail",{
  //     product: product[0],
  //     pageTitle : "shop",
  //     path : "/products"
  //   })}).catch()

  Product.findByPk(prodId).then( product =>{
    res.render("shop/product-detail",{
      product: product,
      pageTitle : "shop",
      path : "/products"
    })
  }
  ).catch()
};

exports.getIndex = (req, res) => {
  Product.findAll()
  .then( products => {
    console.log(products)
    res.render("shop/index",{
      prods: products,
      pageTitle : "shop",
      path : "/"
    })
  }
    )
  .catch(err => 
    console.log(err)
  )
};

exports.getCart = (req, res) => {
  req.user.getCart().then(cart => {
    return cart.getProducts()
  })
  .then(products => {
    console.log(products);
    res.render('shop/cart', {
      path: '/cart',
      pageTitle: 'Your Cart',
      products: products
    });
  })

  // Cart.getCart(cart => {
  //   Product.fetchAll(products => {
  //     const cartProducts = [];
  //     for (product of products) {
  //       const cartProductData = cart.products.find(
  //         prod => prod.id === product.id
  //       );
  //       if (cartProductData) {
  //         cartProducts.push({ productData: product, qty: cartProductData.qty });
  //       }
  //     }
  //     res.render('shop/cart', {
  //       path: '/cart',
  //       pageTitle: 'Your Cart',
  //       products: cartProducts
  //     });
  //   });
  // });
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  let fetchedCart
  let newQuantity = 1
  req.user
  .getCart()
  .then(cart => {
    fetchedCart = cart
    return cart.getProducts({where : {id : prodId}
    })})
  .then(products => {
    let product
    if(products.length > 0){
      product = products[0]
    }
    if(product){
      const oldQuantity = product.cartItem.quantity
      newQuantity = oldQuantity + 1
      return product
    }
    return Product.findByPk(prodId)})

    .then(product =>{
      return fetchedCart.addProduct(product, {
        through : {quantity : newQuantity}
      })
    })
    .then(() =>{
      res.redirect("/cart")
    })
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  req.user.getCart()
  .then( cart => {
      return cart.getProducts({where : {id : prodId}})
    })
  .then(products => {
    products[0].cartItem.destroy()
  .then(result => {
    console.log("Borrao")
    res.redirect("/")
  })
    
    }
  )
};


exports.getOrders = (req, res, next) => {
  req.user.getOrders({include : ["prodducts"]}).then(orders => {
    res.render('shop/orders', {
      path: '/orders',
      pageTitle: 'Your Orders',
      orders : orders
    });
  })
};


exports.postCreateOrder = (req, res, next) => {
  let fetchedCart ;
  req.user.getCart().then(cart => {
    fetchedCart = cart
    return cart.getProducts()
  }).then(products => {
    console.log(products);
    return req.user.createOrder().then(order => {
      return order.addProducts(products.map(product => {
        product.orderItem = {quantity : product.cartItem.quantity}
        return product
      }))
    })
  })
  .then(result => {
    return fetchedCart.setProducts(null)
    
  }).then(result => {
    res.redirect("/orders")
  })
  .catch()
}
