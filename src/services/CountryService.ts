import { IApiService } from "../interfaces/IApiService";
import { ICountry } from "../interfaces/ICountry";

export class CountryService {
  constructor(
    private apiService: IApiService,
    private callbackError: Function
  ) {}

  private _route: string = "/countries";
  private _data: ICountry[] = [];

  public get data(): ICountry[] {
    return this._data;
  }

  async start(): Promise<void> {
    await this.getDataFromServer();
  }

  private async getDataFromServer(): Promise<void> {
    try {
      const response = await this.apiService.get(this._route);
      this.setData(response);
    } catch (error: any) {
      this.callbackError(error?.message);
    }
  }

  private setData(response: any): void {
    this._data = response;
  }
}
