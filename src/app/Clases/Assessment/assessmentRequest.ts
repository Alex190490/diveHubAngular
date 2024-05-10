import { Product } from "../Product/product";
import { User } from "../user/user";

export class AssessmentRequest {
    user: User
    content: string
    stars: number
    date: Date
    productId: number
}
