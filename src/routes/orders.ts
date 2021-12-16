import { FastifyInstance } from "fastify"
import { database } from "@/initializer"

export function addOrdersRoute(server: FastifyInstance) {
    registerOrdersAdd(server)
    registerOrdersGet(server)
    registerOrdersUpdate(server)
    registerOrdersDelete(server)
}

function registerOrdersAdd(server: FastifyInstance) {
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
}

function registerOrdersGet(server: FastifyInstance) {
    server.get('/order/get', async (request, reply) => {
        const userID = (request.query as { user?: string }).user
        if (userID) {
            return database.getOrder(userID)
        }
        reply.code(400)
        return { success: false }
    })
}

function registerOrdersUpdate(server: FastifyInstance) {
    server.put('/order/update', async (request, reply) => {
        const params = request.body as UpdateOrder
        database.updateOrder(params.order)
    })
}

function registerOrdersDelete(server: FastifyInstance) {
    server.put('/order/update', async (request, reply) => {
        const params = request.body as DeleteOrder
        database.deleteOrder(params.order_id)
    })
}