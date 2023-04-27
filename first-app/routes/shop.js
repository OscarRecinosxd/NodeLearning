const express = require("express")
const path = require("path")

const rooDir = require("../util/path")
const adminData = require("./admin")
const router = express.Router();

const productsController = require("../controllers/products")

router.get("/", productsController.getAllProducts);


module.exports =  router 