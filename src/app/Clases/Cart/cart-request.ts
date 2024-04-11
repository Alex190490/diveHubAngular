import { Activity } from "../Activity/activity"
import { Item } from "../Item/item"
import { Product } from "../Product/product"
import { User } from "../user/user"

export class CartRequest {
  user: User
  product: number
  amount: number
}
