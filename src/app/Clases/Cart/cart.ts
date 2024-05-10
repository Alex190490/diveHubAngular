import { Product } from "../Product/product"
import { User } from "../user/user"

export class Cart {
  id: number
  user: User
  productId: number
  product: Product
  quantity: number
  isOverStock: boolean
}
