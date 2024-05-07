import { User } from "../user/user"

export class OrderRequest {
    user: User
    total: number
    date: Date
    address: string
}
