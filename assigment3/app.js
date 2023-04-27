const express = require("express")
const path = require("path")
const bodyParser = require("body-parser")

const userRouter = require("./routes/users")



const app = express()
app.use(express.static(path.join(__dirname,"public")))


app.use(userRouter)

app.get("/",(req,res) => {
    res.send("<h1>Main page </h1>")
})


app.listen(3000)