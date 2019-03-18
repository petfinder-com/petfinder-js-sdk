import { ProblemDetailsError } from "../../src/error";
import { Client } from "../../src/main";

const clientConfig = {
    apiKey: process.env.PETFINDER_API_KEY || "",
    baseUrl: process.env.PETFINDER_API_URL,
    secret: process.env.PETFINDER_API_SECRET || "",
};

const testCase = clientConfig.apiKey ? it : it.skip;
const client = new Client(clientConfig);

testCase("Can search animals", async () => {
    const response = await client.animal.search();

    expect(response.status).toEqual(200);
    expect(response.data.animals.length).toBeGreaterThan(1);
    expect(response.data.animals[0].name).not.toBeNull();
}, 10000);

testCase("Can search animals with parameters", async () => {
    const response = await client.animal.search({type: "Dog"});

    expect(response.status).toEqual(200);
    expect(response.data.animals.length).toBeGreaterThan(1);

    expect(response.data.animals.every((animal: { type: string; }) => {
        return "Dog" === animal.type;
    })).toBe(true);
});

testCase("Throws error on invalid search parameters", async () => {
    await client.animal.search({type: "Unicorn"}).then(() => {
        fail("Got a success response");
    }).catch((err) => {
        expect(err).toBeInstanceOf(ProblemDetailsError);
        expect(err.status).toEqual(400);
        expect(err.invalidParams).not.toBeUndefined();
    });
});

testCase("Can get animal", async () => {
    const animalId: number = await client.animal.search().then((resp) => {
        return resp.data.animals[0].id;
    });

    const response = await client.animal.show(animalId);

    expect(response.status).toEqual(200);
    expect(response.data.animal.id).toEqual(animalId);
    expect(response.data.animal.type).not.toBeUndefined();
});

testCase("Throws error on nonexistent animal", async () => {
    await client.animal.show(1).then(() => {
        fail("Got a success response");
    }).catch((err) => {
        expect(err).toBeInstanceOf(ProblemDetailsError);
        expect(err.status).toEqual(404);
        expect(err.invalidParams).toBeUndefined();
    });
});
