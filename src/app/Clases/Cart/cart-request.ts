import { Product } from "../Product/product"
import { User } from "../user/user"

export class CartRequest {
  user: User
  product: Product
  amount: number
}
