abstract class Database {
  abstract addUser(user: User): void
  abstract addItem(item: Item): void
  abstract addOrder(order: Order): void

  abstract getUser(userID: string): User
  abstract getOrder(userID: string): ParsedOrder[]
}

export { Database }