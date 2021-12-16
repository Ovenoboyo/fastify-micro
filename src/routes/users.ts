import { FastifyInstance } from "fastify"
import { database } from "@/initializer"

export function addUserRoute(server: FastifyInstance) {
    server.post('/user/add', async (_, reply) => {
        const user = reply.request.body as User
        if (user) {
            if (user.id && user.name && user.email && user.phno) {
                database.addUser(user)
                reply.code(200)
                return { success: true }
            }
        }
        reply.code(400)
        return { success: false }
    })
}