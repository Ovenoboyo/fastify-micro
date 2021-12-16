import { FastifyInstance } from "fastify";
import { addOrdersRoute } from "./orders";
import { addUserRoute } from "./users";

export function registerRoutes(server: FastifyInstance) {
    addUserRoute(server)
    addOrdersRoute(server)
}