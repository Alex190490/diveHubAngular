import { User } from "../user/user"

export class CartRequest {
  user: User
  productId: number
  quantity: number
}
