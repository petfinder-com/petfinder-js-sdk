import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { AnimalData } from "../../src/api/animalData";
import { Client } from "../../src/main";

it("Creates animal data client", () => {
    const client = new Client({apiKey: "foo", secret: "bar"});
    const animal = new AnimalData(client);

    expect(animal).toBeInstanceOf(AnimalData);
    expect(client.animalData).toBeInstanceOf(AnimalData);
});

it("Can get animal types", async () => {
    const mock = new MockAdapter(axios);
    const client = new AnimalData(new Client({apiKey: "foo", secret: "bar", token: "test"}));

    mock.onGet("/types").reply(200, {
        success: true,
    });

    const response = await client.types();
    expect(response.data.success).toEqual(true);
});

it("Can get single animal type", async () => {
    const mock = new MockAdapter(axios);
    const client = new AnimalData(new Client({apiKey: "foo", secret: "bar", token: "test"}));

    mock.onGet("/types/Dog").reply(200, {
        success: true,
    });

    const response = await client.type("Dog");
    expect(response.data.success).toEqual(true);
});

it("Can get animal breeds", async () => {
    const mock = new MockAdapter(axios);
    const client = new AnimalData(new Client({apiKey: "foo", secret: "bar", token: "test"}));

    mock.onGet("/types/Dog/breeds").reply(200, {
        success: true,
    });

    const response = await client.breeds("Dog");
    expect(response.data.success).toEqual(true);
});
