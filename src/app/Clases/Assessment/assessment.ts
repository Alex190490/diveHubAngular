import { Product } from "../Product/product";
import { User } from "../user/user";

export class Assessment {
    id: number
    user: User
    content: string
    stars: number
    date: Date
    productId: number
    product: Product
}
