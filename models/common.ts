export interface PaginatorModel {
  currentPage?: number;
  perPageItemCount?: number;
  currentPageItemCount?: number;
  totalItems?: number;
  totalPages?: number;
  lastPage?: boolean;
}

export interface DropdownModel {
  label?: string;
  value?: string;
}
