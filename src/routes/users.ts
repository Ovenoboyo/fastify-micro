import { FastifyInstance } from "fastify"
import { database } from "@/initializer"
import { getErrObj, validateEmail, validatePhone } from "@/utils"


export function registerUserRoute(server: FastifyInstance) {
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