import { AxiosResponse } from "axios";

import { ApiClient } from "./client";

export class AnimalData extends ApiClient {
    public async types(): Promise<AxiosResponse> {
        await this.ensureAuthenticated();
        return this.http.get("/types");
    }

    public async type(type: string): Promise<AxiosResponse> {
        await this.ensureAuthenticated();
        return this.http.get(`/types/${type}`);
    }

    public async breeds(type: string): Promise<AxiosResponse> {
        await this.ensureAuthenticated();
        return this.http.get(`/types/${type}/breeds`);
    }
}
