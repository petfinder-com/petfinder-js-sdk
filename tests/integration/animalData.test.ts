import { ProblemDetailsError } from "../../src/error";
import { Client } from "../../src/main";

const clientConfig = {
    apiKey: process.env.PETFINDER_API_KEY || "",
    baseUrl: process.env.PETFINDER_API_URL,
    secret: process.env.PETFINDER_API_SECRET || "",
};

const testCase = clientConfig.apiKey ? it : it.skip;
const client = new Client(clientConfig);

testCase("Can get animal types", async () => {
    const response = await client.animalData.types();
    const types = response.data.types.map((type: { name: string; }) => {
        return type.name;
    });

    expect(response.status).toEqual(200);
    expect(response.data.types.length).toBeGreaterThanOrEqual(2);
    expect(types).toContain("Dog");
}, 10000);

testCase("Can get animal type", async () => {
    const response = await client.animalData.type("Dog");

    expect(response.status).toEqual(200);
    expect(response.data.type.name).toEqual("Dog");
    expect(response.data.type.coats).not.toBeUndefined();
    expect(response.data.type.colors).not.toBeUndefined();
    expect(response.data.type.genders).not.toBeUndefined();
});

testCase("Can get animal type breeds", async () => {
    const response = await client.animalData.breeds("Dog");
    const breeds = response.data.breeds.map((breed: { name: string; }) => {
        return breed.name;
    });

    expect(response.status).toEqual(200);
    expect(breeds.length).toBeGreaterThan(1);
    expect(breeds).toContain("Corgi");
});
