import { AxiosResponse } from "axios";

import { ApiClient } from "./client";

export class Organization extends ApiClient {
    public async search(params: object = {}): Promise<AxiosResponse> {
        await this.ensureAuthenticated();
        return this.http.get("/organizations", {
            params,
        });
    }

    public async show(id: string): Promise<AxiosResponse> {
        await this.ensureAuthenticated();
        return this.http.get(`/organizations/${id}`);
    }
}
