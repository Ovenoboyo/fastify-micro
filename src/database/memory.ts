import { accessSync, mkdirSync, readFileSync, writeFileSync } from "fs"
import { resolve } from "path"
import { Database } from "."

type databaseFiles = 'orders' | 'items' | 'users'

class InMemoryRetention extends Database {
    private users: { [key: string]: User } = {}
    private items: { [key: string]: Item } = {}
    private orders: { [key: string]: Order } = {}

    constructor() {
        super()
        this.items = this.loadFile('items') ?? {}
        this.orders = this.loadFile('orders') ?? {}
        this.users = this.loadFile('users') ?? {}
    }

    public addUser(user: User) {
        if (this.users[user.id]) {
            throw new Error("User already exists")
        }
        this.users[user.id] = user

        this.dumpToFile('users', this.users)
    }

    public getUser(userID: string) {
        return this.users[userID]
    }

    public addItem(item: Item) {
        if (this.items[item.id]) {
            throw new Error("Item already exists")
        }

        this.items[item.id] = item

        this.dumpToFile('items', this.items)
    }

    public getItem(itemID: string) {
        return this.items[itemID]
    }

    public addOrder(order: Order) {
        if (!this.getUser(order.user)) {
            throw new Error("Invalid user")
        }

        for (const i of order.items) {
            if (!this.getItem(i)) {
                throw new Error("Invalid item")
            }
        }

        if (this.orders[order.id]) {
            throw new Error("Order already exists")
        }

        this.orders[order.id] = order

        this.dumpToFile('orders', this.orders)
    }

    public getOrder(userID: string): ParsedOrder[] {
        if (!this.getUser(userID)) {
            throw new Error("Invalid user")
        }

        const parsedOrder: ParsedOrder[] = []
        const ordersByUser = Object.values(this.orders).filter((val) => val.user === userID)
        for (const o of ordersByUser) {
            parsedOrder.push({
                id: o.id,
                quantity: o.quantity,
                items: o.items.reduce((accumulator, current) => {
                    accumulator.push(this.getItem(current))
                    return accumulator
                }, [] as Item[]),
                user: this.getUser(o.user)
            })
        }

        return parsedOrder
    }

    // Should be synchronous
    private dumpToFile(file: databaseFiles, data: any) {
        data = JSON.stringify(data)

        try {
            accessSync('./tmp')
        } catch (_) {
            mkdirSync('./tmp')
        }

        writeFileSync(`./tmp/${file}`, data, { encoding: 'utf-8' })
    }

    private loadFile(file: databaseFiles) {
        try {
            accessSync(`./tmp/${file}`)
            console.log(resolve(`./tmp/${file}`))
            const data = readFileSync(`./tmp/${file}`, { encoding: 'utf-8' })

            if (data) {
                return JSON.parse(data)
            }
        } catch (err) { /* Ignore file write errors cause why not */ }
    }
}

export { InMemoryRetention }