import axios, { AxiosError, Method } from "axios";

export class ApiService {
  constructor(private endpoint: string) {}

  public async get(url: string, data?: any): Promise<any> {
    const queryData = this.formatDataQuery(data);
    return await this.request(url + queryData, "GET");
  }

  private formatDataQuery(data?: any): string {
    let queryString = "?";
    if (data) {
      const propList = Object.entries(data);
      propList.map((prop) => (queryString += prop[0] + "=" + prop[1] + "&"));
    }
    return queryString.slice(0, -1);
  }

  private handleAxiosError(error: AxiosError): void {
    throw new Error(
      error.response ? error?.response?.data?.message : "Erro inesperado."
    );
  }

  private async request(url: string, method: Method): Promise<any> {
    let toReturn = null;
    try {
      toReturn = await axios
        .request({
          baseURL: this.endpoint,
          url,
          method,
          headers: {
            "Content-Type": "application/json",
          },
          timeout: 5000,
        })
        .then((res) => res.data);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        this.handleAxiosError(err);
      }
    }
    return toReturn;
  }
}

export const apiService = new ApiService(
  process.env.NODE_ENV === "production"
    ? window.location.href
    : "http://localhost:3333/"
);
