import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import { Animal } from "./api/animal";
import { AnimalData } from "./api/animalData";
import { Organization } from "./api/organization";
import { ProblemDetailsError } from "./error";

interface IClientConfig {
    apiKey: string;
    secret: string;
    token?: string;
    baseUrl?: string;
}

export class Client {
    public http: AxiosInstance;
    private config: IClientConfig;

    constructor(config: IClientConfig) {
        this.config = config;
        this.http = axios.create({
            baseURL: config.baseUrl || "https://api.petfinder.com/v2",
            headers: {"User-Agent": "petfinder-js-sdk/v1.0 (https://github.com/petfinder-com/petfinder-js-sdk)"},
        });

        this.http.interceptors.response.use((response: AxiosResponse) => {
            return response;
        }, (error: AxiosError) => {
            if (error.response && this.isProblemDetailsResponse(error.response)) {
                return Promise.reject(new ProblemDetailsError(error.request, error.response));
            }

            return Promise.reject(error);
        });
    }

    get animalData(): AnimalData {
        return new AnimalData(this);
    }

    get animal(): Animal {
        return new Animal(this);
    }

    get organization(): Organization {
        return new Organization(this);
    }

    public async authenticate(token?: string): Promise<void | AxiosResponse> {
        let response;
        let accessToken = token || this.config.token;

        if (!accessToken) {
            response = await this.http.post("/oauth2/token", {
                client_id: this.config.apiKey,
                client_secret: this.config.secret,
                grant_type: "client_credentials",
            });
            accessToken = response.data.access_token;
        }

        this.config.token = accessToken;
        this.http.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

        return response;
    }

    private isProblemDetailsResponse(response: AxiosResponse): boolean {
        const headers = response.headers || {};
        const contentType = headers["content-type"] || "";
        return contentType.includes("application/problem+json");
    }
}
