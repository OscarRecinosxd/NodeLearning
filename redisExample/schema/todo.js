import { Entity, Schema } from 'redis-om'
import client from '../src/client.js'


class Person extends Entity {}

export const personSchema = new Schema(Person,{
    name: { type : "string"},
    age : {type : "number"}
})

export const personRepo = client.fetchRepository(personSchema)

/* create the index for Person */
await personRepo.createIndex()