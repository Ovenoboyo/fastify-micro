import { FastifyInstance } from "fastify";
import { registerOrderRoute } from "./orders";
import { registerUserRoute } from "./users";

/**
 * Registers all api routes 
 * @param server FastifyInstance to which the route is to be bound
 */
export function registerRoutes(server: FastifyInstance) {
    registerUserRoute(server)
    registerOrderRoute(server)
}