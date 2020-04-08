import axios from "axios";
import MockAdapter from "axios-mock-adapter";

import { Organization } from "../../src/api/organization";
import { Client } from "../../src/main";

it("Creates organization client", () => {
    const client = new Client({apiKey: "foo", secret: "bar"});
    const animal = new Organization(client);

    expect(animal).toBeInstanceOf(Organization);
    expect(client.organization).toBeInstanceOf(Organization);
});

it("Can search organizations", async () => {
    const mock = new MockAdapter(axios);
    const client = new Organization(new Client({apiKey: "foo", secret: "bar", token: "test"}));

    mock.onGet("/organizations").reply(200, {
        success: true,
    });

    const response = await client.search();
    expect(response.data.success).toEqual(true);
});

it("Can search organizations with parameters", async () => {
    const mock = new MockAdapter(axios);
    const client = new Organization(new Client({apiKey: "foo", secret: "bar", token: "test"}));

    mock.onGet("/organizations", { params: { name: "Test" } }).reply(200, {
        success: true,
    });

    const response = await client.search({name: "Test"});
    expect(response.data.success).toEqual(true);
});

it("Can show organizations", async () => {
    const mock = new MockAdapter(axios);
    const client = new Organization(new Client({apiKey: "foo", secret: "bar", token: "test"}));

    mock.onGet("/organizations/ABC1234").reply(200, {
        success: true,
    });

    const response = await client.show("ABC1234");
    expect(response.data.success).toEqual(true);
});
