const express = require("express")

const app = express()


app.use("/users", (req,res,next) => {
    res.send("<h1>Some dummy data</h1>")
})

app.use("/", (req,res,next) => {
    res.send("<h1>Main page</h1>")
})



/*app.use((req,res,next) => {
    console.log("First middleware");
    next();
})

app.use((req,res,next) => {
    console.log("Second middleware");
    next()
})


app.use((req,res,next) => {
    console.log("Third middleware");
    res.send("<h1>Last middleware</h1>")
})*/


app.listen(3000)