export interface IApiService {
  get(url: string, data?: any): Promise<any>;
}
