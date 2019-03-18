import { AxiosInstance } from "axios";
import { Client } from "../main";

export abstract class ApiClient {
    public http: AxiosInstance;

    constructor(private client: Client) {
        this.http = client.http;
    }

    protected async ensureAuthenticated(): Promise<void> {
        if (!("Authorization" in this.http.defaults.headers.common)) {
            await this.client.authenticate();
        }
    }
}
