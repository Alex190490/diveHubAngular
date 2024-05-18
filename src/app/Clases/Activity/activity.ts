import { Product } from "../Product/product";

export class Activity extends Product {
  level_required: string
  time_starts: Date
  time_ends: Date
  time_ends_parsed: string
  available_spaces: number
  available: boolean
}