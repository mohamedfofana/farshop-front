export interface FindByPageDto {
  page: number;
  size: number;
  field: string;
  direction: string;
  priceMin: number;
  priceMax: number;
}

