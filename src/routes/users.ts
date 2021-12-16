import { FastifyInstance } from "fastify"
import { database } from "@/initializer"
import { getErrObj } from "@/utils"


export function registerUserRoute(server: FastifyInstance) {
  server.post('/user/add', async (_, reply) => {
    try {
      const user = reply.request.body as User
      if (user) {
        if (user.id && user.name && user.email && user.phno) {
          database.addUser(user)
          reply.code(200)
          return
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