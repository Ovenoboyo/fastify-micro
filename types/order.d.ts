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