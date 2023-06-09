
const express = require("express")
const bodyParser = require("body-parser")
const expressHbs = require("express-handlebars")
const app = express()

const path = require("path")
app.set("view engine", "ejs")
app.set("views","views") 

const adminRoutes = require("./routes/admin")
const shopRoutes = require("./routes/shop")

const error = require("./controllers/error")


app.use(bodyParser.urlencoded({extended:false}))
app.use(express.static(path.join(__dirname,"public")))

app.use("/admin",adminRoutes)
app.use(shopRoutes)



app.use(error.get404)

app.listen(3000)

