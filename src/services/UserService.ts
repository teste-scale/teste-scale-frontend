import { IApiService } from "../interfaces/IApiService";
import { IListPaginationService } from "../interfaces/IListPaginationService";
import { IUser } from "../interfaces/IUser";

export class UserService implements IListPaginationService {
  constructor(
    private apiService: IApiService,
    private callbackError: Function
  ) {}

  private _route: string = "/users";
  private _page: number = 1;
  private _per_page: number = 4;
  private _total: number = 0;
  private _total_pages: number = 0;
  private _data: IUser[] = [];

  public get page(): number {
    return this._page;
  }
  public get per_page(): number {
    return this._per_page;
  }
  public get total(): number {
    return this._total;
  }
  public get total_pages(): number {
    return this._total_pages;
  }
  public get data(): IUser[] {
    return this._data;
  }

  async start(): Promise<void> {
    await this.getDataFromServer();
  }

  async changePage(page: number): Promise<void> {
    if (page !== this._page) {
      this._page = page;
      await this.getDataFromServer();
    }
  }

  private async getDataFromServer(): Promise<void> {
    try {
      const params = { page: this._page, per_page: this._per_page };
      const response = await this.apiService.get(this._route, params);
      this.setData(response);
    } catch (error: any) {
      this.callbackError(error?.message);
    }
  }

  private setData(response: any): void {
    this._data = response.data;
    this._page = response.page;
    this._per_page = response.per_page;
    this._total = response.total;
    this._total_pages = response.total_pages;
  }
}
