import { Product } from "../Product/product"
import { User } from "../user/user"

export class Cart {
  id: number
  user: User
  product: Product
  amount: number
}
