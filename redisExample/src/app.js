import express from 'express'
import {Client} from "redis-om"
import {personRepo} from "../schema/todo.js"
import { router as personRouter } from '../router/person-router.js'


const app = express()
app.use(express.json())


app.use('/person', personRouter)

app.get("/persons", async(req,res) => {
    const readPersons = await personRepo.search().return.all()
    res.send(readPersons)
})


app.listen(3000)