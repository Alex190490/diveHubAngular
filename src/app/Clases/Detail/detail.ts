import { Order } from "../Order/order"
import { Product } from "../Product/product"

export class Detail {
    id: number
    order: Order
    productId: number
    product: Product
    quantity: number
}
