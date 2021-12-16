interface Order {
  id: string
  quantity: number
  user: string
  items: string[]
}

interface ParsedOrder extends Order {
  items: Item[]
  user: User
}

interface UpdateOrder {
  user_id: string
  order: Order
}

interface DeleteOrder {
  order_id: string
}