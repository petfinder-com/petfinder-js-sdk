import { AxiosResponse } from "axios";

export class ProblemDetailsError extends Error {
    public type: string;
    public status: number;
    public details: string;
    public invalidParams?: object;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    constructor(public request: any, public response: AxiosResponse) {
        super(response.data.title);
        this.type = response.data.type;
        this.status = response.data.status;
        this.details = response.data.detail;
        this.invalidParams = response.data["invalid-params"];

        Object.setPrototypeOf(this, ProblemDetailsError.prototype);
    }
}
