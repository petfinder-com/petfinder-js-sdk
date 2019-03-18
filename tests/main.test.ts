import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { Animal } from "../src/api/animal";
import { AnimalData } from "../src/api/animalData";
import { Organization } from "../src/api/organization";
import { Client } from "../src/main";

it("Creates Petfinder client", () => {
    const client = new Client({apiKey: "foo", secret: "bar"});

    expect(client).toBeInstanceOf(Client);
    expect(client.http.defaults.baseURL).toEqual("https://api.petfinder.com/v2");
});

it("Creates Petfinder client with custom base url", () => {
    const client = new Client({apiKey: "foo", secret: "bar", baseUrl: "http://example.com"});

    expect(client.http.defaults.baseURL).toEqual("http://example.com");
});

it("Can authenticate", async () => {
    const mock = new MockAdapter(axios);
    mock.onPost("/oauth2/token", {
        client_id: "foo",
        client_secret: "bar",
        grant_type: "client_credentials",
    }).reply(200, {
        access_token: "mytoken",
        expires_in: 3600,
    });

    const client = new Client({apiKey: "foo", secret: "bar"});
    const response = await client.authenticate();

    expect(response).not.toBeNull();
    expect(response ? response.data.access_token : null).toEqual("mytoken");
    expect(client.http.defaults.headers.common.Authorization).toEqual("Bearer mytoken");
});

it("Uses token passed in configuration for authentication", async () => {
    const client = new Client({apiKey: "foo", secret: "bar", token: "my-test-token"});
    const response = await client.authenticate();

    expect(response).toBeUndefined();
    expect(client.http.defaults.headers.common.Authorization).toEqual("Bearer my-test-token");
});

it("Uses token passed in authenticate method", async () => {
    const client = new Client({apiKey: "foo", secret: "bar"});
    const response = await client.authenticate("authme");

    expect(response).toBeUndefined();
    expect(client.http.defaults.headers.common.Authorization).toEqual("Bearer authme");
});

it("Should be able to get sub clients", () => {
    const client = new Client({apiKey: "foo", secret: "bar"});

    expect(client.animal).toBeInstanceOf(Animal);
    expect(client.animalData).toBeInstanceOf(AnimalData);
    expect(client.organization).toBeInstanceOf(Organization);
});
