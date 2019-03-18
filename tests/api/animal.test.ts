import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { Animal } from "../../src/api/animal";
import { Client } from "../../src/main";

it("Creates animal client", () => {
    const client = new Client({apiKey: "foo", secret: "bar"});
    const animal = new Animal(client);

    expect(animal).toBeInstanceOf(Animal);
    expect(client.animal).toBeInstanceOf(Animal);
});

it("Can search animals", async () => {
    const mock = new MockAdapter(axios);
    const client = new Animal(new Client({apiKey: "foo", secret: "bar", token: "test"}));

    mock.onGet("/animals").reply(200, {
        success: true,
    });

    const response = await client.search();
    expect(response.data.success).toEqual(true);
});

it("Can search animals with parameters", async () => {
    const mock = new MockAdapter(axios);
    const client = new Animal(new Client({apiKey: "foo", secret: "bar", token: "test"}));

    mock.onGet("/animals", { params: { type: "Dog" } }).reply(200, {
        success: true,
    });

    const response = await client.search({type: "Dog"});
    expect(response.data.success).toEqual(true);
});

it("Can show animal", async () => {
    const mock = new MockAdapter(axios);
    const client = new Animal(new Client({apiKey: "foo", secret: "bar", token: "test"}));

    mock.onGet("/animals/12345").reply(200, {
        success: true,
    });

    const response = await client.show(12345);
    expect(response.data.success).toEqual(true);
});
