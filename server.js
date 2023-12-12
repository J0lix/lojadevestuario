import {fastify} from 'fastify'
import { DatabaseMemory } from './database-memory.js'

const database = new DatabaseMemory()
const server = fastify()

server.get('/', () => {
    return 'Rota padrão'
})

server.post('/camiseta', (request, reply) => {
    const {titulo, tamanho, tipo, cor} = request.body
   // console.log(body)
   // return 'cadastrar'
    database.create({
        titulo: titulo,
        tamanho: tamanho,
        tipo: tipo,
        cor: cor
    })

    return reply.status(201).send
})

server.get('/camiseta', (request) => {
    const search = request.query.search
    console.log(search)
    const camisetas = database.list(search)
   // console.log(camisetas)
    return camisetas
})

server.put('/camisetas/:id', (request, reply) => {
    const camisetaId = request.params.id
    const {titulo, tamanho, tipo, cor} = request.body
    const camiseta = database.update(camisetaId, {
        titulo: titulo,
        tamanho: tamanho,
        tipo: tipo,
        cor: cor
    })
    return reply.status(204).send()
})

server.delete("/camisetas/:id", (request, reply) => {
    const camisetaId = request.params.id

    database.delete(camisetaId)

    return reply.status(204).send()
})
server.listen({
    port: 3333,
})