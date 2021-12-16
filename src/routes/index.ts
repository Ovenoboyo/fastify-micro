import { FastifyInstance } from "fastify";
import { registerOrderRoute } from "./orders";
import { registerUserRoute } from "./users";

export function registerRoutes(server: FastifyInstance) {
    registerUserRoute(server)
    registerOrderRoute(server)
}