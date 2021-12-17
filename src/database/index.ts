/**
 * Abstract class to define what all operations are to be implemented by the database
 */
abstract class Database {
  abstract addUser(user: UserRequest): string
  abstract addItem(item: ItemRequest): string
  abstract addOrder(order: OrderRequest): string

  abstract getUser(userID: string): User
  abstract getOrderByUserID(userID: string): ParsedOrder[]
  abstract getOrderByID(orderID: string): Order
  abstract getItem(itemID: string): Item

  abstract updateOrder(order: Order): void
  abstract deleteOrder(order: string): void
  abstract deleteUser(user: string): void
}

export { Database }