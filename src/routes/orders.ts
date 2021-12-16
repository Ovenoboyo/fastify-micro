import { FastifyInstance } from "fastify"
import { database } from "@/initializer"

export function addOrdersRoute(server: FastifyInstance) {
    server.post('/order/add', async (_, reply) => {
        const order = reply.request.body as Order
        if (order) {
            if (order.id && (order.items && order.items.length > 0) && order.quantity && order.user) {
                database.addOrder(order)
                reply.code(200)
                return { success: true }
            }
        }
        reply.code(400)
        return { success: false }
    })

    server.get('/order/get', async (request, reply) => {
        const userID = (request.query as { user?: string }).user
        if (userID) {
            return database.getOrder(userID)
        }
        reply.code(400)
        return { success: false }
    })
}