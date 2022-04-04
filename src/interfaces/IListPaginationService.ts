export interface IListPaginationService {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: any[];
  start(): Promise<void>;
  changePage(page: number): Promise<void>;
}
