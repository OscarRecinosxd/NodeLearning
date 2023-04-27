const Product = require("../models/products")


exports.addProductGet = (req,res) => {
    console.log("add product")
    res.render("add-product", {pageTitle : "Add product"})
}

exports.addProductPost = (req,res) => {
    const product = new Product(req.body.title)
    product.save()
    res.redirect("/")
}

exports.getAllProducts = (req,res) => {
    const products = Product.fetchAll()
    res.render("shop", {prods : products, pageTitle : "Ma Shop",hasProducts : products.length>0})
}



