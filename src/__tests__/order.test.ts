import { fastify, FastifyInstance } from "fastify";
import { database } from "src/initializer";
import { registerOrderRoute } from "../routes/orders";

describe("/order/get", () => {
  let server: FastifyInstance;
  let userID: string
  let orderID: string

  beforeEach(async () => {
    userID = database.addUser({
      name: 'Test User',
      email: 'hjkhjk@hjkh.com',
      phno: '+919819230849'
    })

    orderID = database.addOrder({
      user: userID,
      items: ['1', '2', '3', '4'],
      quantity: 30
    })

    server = fastify({});
    registerOrderRoute(server)
    await server.ready();

    jest.clearAllMocks();
  });

  it("GET returns 200", async () => {
    const response = await server.inject({
      method: "GET", url: "/order/get?user_id=" + userID
    });
    expect(response.statusCode).toEqual(200);

    const payload: ParsedOrder[] = JSON.parse(response.body)
    expect(payload[0].id).toEqual(orderID)
  });

  afterEach(async () => {
    database.deleteUser(userID)
    database.deleteOrder(orderID)
  }, 1000)
});

describe("/order/add", () => {
  let server: FastifyInstance;
  let userID: string

  beforeEach(async () => {
    userID = database.addUser({
      name: 'Test User',
      email: 'hjkhjk@hjkh.com',
      phno: '+919819230849'
    })

    server = fastify({});
    registerOrderRoute(server)
    await server.ready();

    jest.clearAllMocks();
  });

  it("GET returns 200", async () => {
    const response = await server.inject({
      method: "POST", url: "/order/add", payload: {
        items: ["0", "1", "2", "3"],
        quantity: 50,
        user: userID
      }
    });
    expect(response.statusCode).toEqual(200);

    const orderID = (JSON.parse(response.body) as { order_id: string }).order_id
    expect(database.getOrderByUserID(userID)[0].id).toEqual(orderID)
  });

  afterEach(async () => {
    database.deleteUser(userID)
  })
});

describe("/order/delete", () => {
  let server: FastifyInstance;
  let userID: string
  let orderID: string

  beforeEach(async () => {
    userID = database.addUser({
      name: 'Test User',
      email: 'hjkhjk@hjkh.com',
      phno: '+919819230849'
    })

    orderID = database.addOrder({
      user: userID,
      items: ['1', '2', '3', '4'],
      quantity: 30
    })

    server = fastify({});
    registerOrderRoute(server)
    await server.ready();

    jest.clearAllMocks();
  });

  it("GET returns 200", async () => {
    const response = await server.inject({
      method: "DELETE", url: "/order/delete", payload: {
        order_id: orderID
      }
    });
    expect(response.statusCode).toEqual(200);
    expect(database.getOrderByUserID(userID).length).toEqual(0)
  });

  afterEach(async () => {
    database.deleteUser(userID)
  })
});

describe("/order/update", () => {
  let server: FastifyInstance;
  let userID: string
  let orderID: string

  beforeEach(async () => {
    userID = database.addUser({
      name: 'Test User',
      email: 'hjkhjk@hjkh.com',
      phno: '+919819230849'
    })

    orderID = database.addOrder({
      user: userID,
      items: ['1', '2', '3', '4'],
      quantity: 30
    })

    server = fastify({});
    registerOrderRoute(server)
    await server.ready();

    jest.clearAllMocks();
  });

  it("GET returns 200", async () => {
    const response = await server.inject({
      method: "PUT", url: "/order/update", payload: {
        order: {
          user: userID,
          id: orderID,
          items: ["5", "6"],
          quantity: 60
        }
      }
    });

    expect(response.statusCode).toEqual(200);
    const updated = database.getOrderByUserID(userID)[0]
    expect(updated.quantity).toEqual(60)
    expect(updated.items.length).toEqual(2)
    expect(updated.user.id).toEqual(userID)
    expect(updated.id).toEqual(orderID)
  });

  afterEach(async () => {
    database.deleteUser(userID)
  })
});