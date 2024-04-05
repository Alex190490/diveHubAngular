import { Product } from "../Product/product";

export class Activity extends Product {
    level_required: string;
    time_starts: Date;
    time_ends: Date;
    available_spaces: number;
    available: boolean;
  }