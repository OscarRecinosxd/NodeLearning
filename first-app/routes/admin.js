const express = require("express")
const path = require("path")

const rooDir = require("../util/path")
const router = express.Router();

const productsController = require("../controllers/products")



router.get("/add-product", productsController.addProductGet)

router.post("/add-product" , productsController.addProductPost)

module.exports = router