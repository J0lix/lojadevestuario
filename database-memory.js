import { randomUUID } from "crypto"

export class DatabaseMemory{
#camisetas = new Map()

list(search){
    return Array.from(this.#camisetas.entries()).map((camisetasArray) => {
        const id = camisetasArray[0]
        const data = camisetasArray[1]

        return{
            id,
            ...data
        }
       
    })
    .filter(camiseta => {
        if(search){
            return camiseta.titulo.includes(search)
        }
        return true
    })
}
create(camiseta){
    const camisetaId = randomUUID()
    this.#camisetas.set(camisetaId, camiseta)
}
update(id, camiseta){
    this.#camisetas.set(id, camiseta)
}
delete(id, camiseta){
    this.#camisetas.delete(id, camiseta)
}
}