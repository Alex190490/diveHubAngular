import { User } from "../user/user"

export class Order {
    id: number
    user: User
    total: number
    date: Date
}
