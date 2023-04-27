import { Client } from 'redis-om'

/* pulls the Redis URL from .env */
const url = ""

/* create and open the Redis OM Client */
const client = new Client()
await client.open(url)

export default client