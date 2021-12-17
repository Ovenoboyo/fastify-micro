import { FastifyInstance } from "fastify"
import { database } from "../initializer"
import { validateEmail, validatePhone, getErrObj } from "../utils"


/**
 * Registers all routes for /user related operations
 * @param server FastifyInstance to which the routes are to be bound
 */
export function registerUserRoute(server: FastifyInstance) {
  registerUserAdd(server)
}

/**
 * Registers routes for user add operations
 * @param server FastifyInstance to which the route is to be bound
 */
export function registerUserAdd(server: FastifyInstance) {
  server.post('/user/add', async (_, reply) => {
    try {
      const user = reply.request.body as User
      if (user) {
        if (user.name && user.email && user.phno) {
          if (validateEmail(user.email) && validatePhone(user.phno)) {
            const ret = database.addUser(user)
            reply.code(200)
            return { user_id: ret }
          }
        }
      }
      reply.code(400)
      return getErrObj(new Error("user object is invalid"))
    } catch (e: any) {
      reply.code(500)
      return getErrObj(e as Error)
    }
  })
}