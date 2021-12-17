import { fastify, FastifyInstance } from "fastify";
import { database } from "src/initializer";
import { registerUserRoute } from "src/routes/users";

describe("/user/add", () => {
    let server: FastifyInstance;
    let userID: string

    beforeEach(async () => {
        server = fastify({});
        registerUserRoute(server)
        await server.ready();

        jest.clearAllMocks();
    });

    it("POST returns 200", async () => {
        const response = await server.inject({
            method: "POST", url: "/user/add", payload: {
                name: 'Sahil Gupte',
                email: 'sdkjfhjk@hmail.com',
                phno: '+919819230849'
            }
        });
        expect(response.statusCode).toEqual(200);

        const payload: { user_id: string } = JSON.parse(response.body)
        userID = payload.user_id
        expect(payload.user_id).toBeTruthy()
    });

    afterEach(async () => {
        database.deleteUser(userID)
    })
});

describe("/user/add email validation", () => {
    let server: FastifyInstance;

    beforeEach(async () => {
        server = fastify({});
        registerUserRoute(server)
        await server.ready();

        jest.clearAllMocks();
    });

    it("POST returns 400", async () => {
        const response = await server.inject({
            method: "POST", url: "/user/add", payload: {
                name: 'Sahil Gupte',
                email: 'sdkjfhjk',
                phno: '+919819230849'
            }
        });
        expect(response.statusCode).toEqual(400);
    });
});

describe("/user/add phno validation", () => {
    let server: FastifyInstance;

    beforeEach(async () => {
        server = fastify({});
        registerUserRoute(server)
        await server.ready();

        jest.clearAllMocks();
    });

    it("POST returns 400", async () => {
        const response = await server.inject({
            method: "POST", url: "/user/add", payload: {
                name: 'Sahil Gupte',
                email: 'sdkjfhjk@hmail.com',
                phno: 'fghfhgf'
            }
        });
        expect(response.statusCode).toEqual(400);
    });
});