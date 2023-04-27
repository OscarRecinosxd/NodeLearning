const Product = require("../models/product");
const User = require("../models/user");
const mongodb = require("mongodb");

exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product({
    title: title,
    price: price,
    description: description,
    imageUrl: imageUrl,
    userId : req.user._id
  });

  product
    .save()
    .then((result) => {
      console.log(result);
      res.redirect("/admin/products");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getEditProduct = (req, res, next) => {
  const prodId = req.params.productId;
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }
  Product.findById(prodId).then((product) => {
    if (!product) {
      return res.redirect("/");
    }
    res.render("admin/edit-product", {
      pageTitle: "Edit Product",
      path: "/admin/edit-product",
      editing: editMode,
      product: product,
    });
  });
};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body._id;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;



  Product.findById(prodId)
    .then((product) => {
      product.title = updatedTitle
      product.price = updatedPrice
      product.imageUrl = updatedImageUrl
      product.description = updatedDesc
      
      product.save()

      console.log("UPDATED");
      res.redirect("/admin/products");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getProducts = (req, res, next) => {
  Product.find()
  // -id excludes
  //.select("title price -_id")
  // get name
  //.populate("userId", "name")
    .then((products) => {
      console.log(products);
      res.render("admin/products", {
        pageTitle: "Add Product",
        path: "/admin/products",
        editing: false,
        prods: products,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body._id;

  Product.findByIdAndRemove(prodId)
    .then(() => {
      console.log("Borrao");
      res.redirect("/admin/products");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.putAddUser = (req, res, next) => {
  const username = req.body.username;
  const email = req.body.email;
  const user = new User(username, email);
  user
    .save()
    .then((result) => {
      console.log("Usuario agregao");
      return res.sendStatus(200);
    })
    .catch((err) => {
      console.log(err);
    });
};
