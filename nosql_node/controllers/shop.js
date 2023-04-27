const Product = require("../models/product");

exports.getProducts = (req, res) => {
  Product.fetchAll()
    .then((products) => {
      res.render("shop/index", {
        prods: products,
        pageTitle: "shop",
        path: "/products",
      });
    })
    .catch((err) => console.log(err));
};

exports.getProduct = (req, res) => {
  const prodId = req.params.productId;
  Product.getProduct(prodId)
    .then((product) => {
      res.render("shop/product-detail", {
        product: product,
        pageTitle: product.title,
        path: "/products",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getIndex = (req, res) => {
  Product.fetchAll()
    .then((products) => {
      res.render("shop/index", {
        prods: products,
        pageTitle: "shop",
        path: "/",
      });
    })
    .catch((err) => console.log(err));
};

exports.getCart = (req, res) => {
  req.user.getCart().then((products) => {
    res.render("shop/cart", {
      path: "/cart",
      pageTitle: "Your Cart",
      products: products,
    });
  });
};

exports.postCart = (req, res, next) => {
  console.log("BODY", req.body);
  const prodId = req.body.productId;
  Product.getProduct(prodId)
    .then((product) => {
      return req.user.addToCart(product);
    })
    .then((result) => {
      console.log(result);
      res.redirect("/cart");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  req.user
    .deleteItemfromCart(prodId)
    .then((result) => {
      res.redirect("/cart");
    })
    .catch((err) => console.log(err));
};

exports.getOrders = (req, res, next) => {
  req.user
  .getOrders()
  .then(orders => {
    console.log(orders);
    res.render("shop/orders", {
      path: "/orders",
      pageTitle: "Your Orders",
      orders: orders,
    });
  }).catch(err => {
    console.log(err);
  });
};

exports.postCreateOrder = (req, res, next) => {
  let fetchedCart;
  req.user.addOrder().then((result) => {
    res.redirect("/cart");
  });
};
