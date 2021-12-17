import { FastifyInstance } from "fastify"
import { database } from "../initializer"
import { getErrObj } from "../utils"

/**
 * Registers all routes for /order related operations
 * @param server FastifyInstance to which the routes are to be bound
 */
export function registerOrderRoute(server: FastifyInstance) {
    registerOrdersAdd(server)
    registerOrdersGet(server)
    registerOrdersUpdate(server)
    registerOrdersDelete(server)
}

/**
 * Registers routes for order add operations
 * @param server FastifyInstance to which the route is to be bound
 */
function registerOrdersAdd(server: FastifyInstance) {
    server.post('/order/add', async (_, reply) => {
        try {
            const order = reply.request.body as OrderRequest
            if (order) {
                if ((order.items && order.items.length > 0) && order.quantity && order.user) {
                    const ret = database.addOrder(order)
                    reply.code(200)
                    return { order_id: ret }
                }
            }
            reply.code(400)
            return getErrObj(new Error("order object is invalid"))
        } catch (e) {
            reply.code(500)
            return getErrObj(e as Error)
        }
    })
}

/**
 * Registers routes for order get operations
 * @param server FastifyInstance to which the route is to be bound
 */
function registerOrdersGet(server: FastifyInstance) {
    server.get('/order/get', async (request, reply) => {
        try {
            const userID = (request.query as { user_id?: string }).user_id
            if (userID) {
                reply.code(200)
                return database.getOrder(userID)
            }
            reply.code(400)
            return getErrObj(new Error("must specify user_id"))
        } catch (e) {
            reply.code(500)
            return getErrObj(e as Error)
        }
    })
}

/**
 * Registers routes for order update operations
 * @param server FastifyInstance to which the route is to be bound
 */
function registerOrdersUpdate(server: FastifyInstance) {
    server.put('/order/update', async (request, reply) => {
        try {
            const params = request.body as UpdateOrder
            const ret = database.updateOrder(params.order)
            reply.code(200)
            return { order: ret }
        } catch (e) {
            reply.code(500)
            return getErrObj(e as Error)
        }
    })
}

/**
 * Registers routes for order delete operations
 * @param server FastifyInstance to which the route is to be bound
 */
function registerOrdersDelete(server: FastifyInstance) {
    server.delete('/order/delete', async (request, reply) => {
        try {
            const params = request.body as DeleteOrder
            database.deleteOrder(params.order_id)
            reply.code(200)
            return {}
        } catch (e) {
            reply.code(500)
            return getErrObj(e as Error)
        }
    })
}