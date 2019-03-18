import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { ProblemDetailsError } from "../src/error";
import { Client } from "../src/main";

it("Should throw ProblemDetailsError on problem details response", async () => {
    const mock = new MockAdapter(axios);
    mock.onGet("/test").reply(401, {
        detail: "Missing Authorization headers",
        status: 401,
        title: "Unauthorized",
        type: "https://httpstatuses.com/401",
    }, {"content-type": "application/problem+json"});

    const client = new Client({apiKey: "foo", secret: "bar"});

    await client.http.get("/test").then(() => {
        fail("Got a success response");
    }).catch((err) => {
        expect(err).toBeInstanceOf(ProblemDetailsError);
        expect(err.message).toEqual("Unauthorized");
        expect(err.status).toEqual(401);
        expect(err.invalidParams).toBeUndefined();
    });
});

it("Should throw ProblemDetailsError with invalidParams", async () => {
    const mock = new MockAdapter(axios);
    mock.onGet("/test").reply(400, {
        "detail": "Your request contains invalid parameters",
        "invalid-params": {foo: "bar"},
        "status": 400,
        "title": "Invalid Parameters",
        "type": "https://httpstatuses.com/400",
    }, {"content-type": "application/problem+json"});

    const client = new Client({apiKey: "foo", secret: "bar"});

    await client.http.get("/test").then(() => {
        fail("Got a success response");
    }).catch((err) => {
        expect(err).toBeInstanceOf(ProblemDetailsError);
        expect(err.invalidParams).toEqual({foo: "bar"});
    });
});

it("Should not throw ProblemDetailsError on other error responses", async () => {
    const mock = new MockAdapter(axios);
    mock.onGet("/test").reply(500);

    const client = new Client({apiKey: "foo", secret: "bar"});

    await client.http.get("/test").then(() => {
        fail("Got a success response");
    }).catch((err) => {
        expect(err).not.toBeInstanceOf(ProblemDetailsError);
    });
});
