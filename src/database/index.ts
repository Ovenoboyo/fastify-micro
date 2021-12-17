/**
 * Abstract class to define what all operations are to be implemented by the database
 */
abstract class Database {
  abstract addUser(user: UserRequest): string
  abstract addItem(item: ItemRequest): string
  abstract addOrder(order: OrderRequest): string

  abstract getUser(userID: string): User
  abstract getOrder(userID: string): ParsedOrder[]

  abstract updateOrder(order: Order): void
  abstract deleteOrder(order: string): void
  abstract deleteUser(user: string): void
}

export { Database }