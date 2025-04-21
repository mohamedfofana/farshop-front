import { ProductSize } from '../db/productSize';
import { BaseEntityStore } from './baseEntityStore';

export type ProductSizeStore = {
  size: ProductSize;
} & BaseEntityStore;
