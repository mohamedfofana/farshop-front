export interface FindByPageDto {
  page: number;
  size: number;
  sortField: string;
  sortDirection: string;
  priceMin: number;
  priceMax: number;
  categoryId?: number;
  searchText?: string;
}
