import { AxiosResponse } from "axios";
import { ApiClient } from "./client";

export class Animal extends ApiClient {
    public async search(params: object = {}): Promise<AxiosResponse> {
        await this.ensureAuthenticated();
        return this.http.get("/animals", {
            params,
        });
    }

    public async show(id: number): Promise<AxiosResponse> {
        await this.ensureAuthenticated();
        return this.http.get(`/animals/${id}`);
    }
}
