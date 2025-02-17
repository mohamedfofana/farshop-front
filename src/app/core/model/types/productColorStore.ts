import { ProductColor } from '../db/productColor';
import { BaseEntityStore } from './baseEntityStore';

export type ProductColorStore = {
  color: ProductColor;
} & BaseEntityStore;
