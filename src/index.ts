import Fastify from 'fastify'
import { database } from './initializer'
import { registerRoutes } from './routes'
const fastify = Fastify({
  logger: true
})

registerRoutes(fastify)

fastify.listen(3000, function (err) {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
})


for (let i = 0; i < 10; i++) {
  try {
    database.addItem({
      id: "" + i,
      name: "item " + i,
      desc: "this is an item"
    })
  } catch (_) { }
}
