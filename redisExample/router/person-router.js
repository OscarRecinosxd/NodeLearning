import { Router } from 'express'
import { personRepo } from '../schema/todo.js'

export const router = Router()

router.put('/', async (req, res) => {
    console.log("Llegaste!");
    const person = await personRepo.createAndSave(req.body)
    res.send(person)
})

router.get("/:id", async(req,res) => {
    console.log("id",req.params.id);
    const readPerson = await personRepo.fetch(req.params.id)
    res.send(readPerson)
})


router.post("/:id", async(req,res) => {

    const editPerson = await personRepo.fetch(req.params.id)
    editPerson.name = req.body.name ?? null
    editPerson.age = req.body.age ?? null
    await personRepo.save(editPerson)
    res.send(editPerson)
})

router.delete("/:id", async(req,res) => {
    await personRepo.remove(req.params.id)
    res.send({endityId : req.params.id})

})