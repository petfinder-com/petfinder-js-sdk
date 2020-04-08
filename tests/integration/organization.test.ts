import { ProblemDetailsError } from "../../src/error";
import { Client } from "../../src/main";

const clientConfig = {
    apiKey: process.env.PETFINDER_API_KEY || "",
    baseUrl: process.env.PETFINDER_API_URL,
    secret: process.env.PETFINDER_API_SECRET || "",
};

const testCase = clientConfig.apiKey ? it : it.skip;
const client = new Client(clientConfig);

testCase("Can search organizations", async () => {
    const response = await client.organization.search();

    expect(response.status).toEqual(200);
    expect(response.data.organizations.length).toBeGreaterThan(1);
    expect(response.data.organizations[0].name).not.toBeNull();
}, 10000);

testCase("Can search organizations with parameters", async () => {
    const response = await client.organization.search({country: "US"});

    expect(response.status).toEqual(200);
    expect(response.data.organizations.length).toBeGreaterThan(1);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect(response.data.organizations.every((organization: any) => {
        return "US" === organization.address.country;
    })).toBe(true);
});

testCase("Throws error on invalid search parameters", async () => {
    await client.organization.search({country: "Neverland"}).then(() => {
        fail("Got a success response");
    }).catch((err) => {
        expect(err).toBeInstanceOf(ProblemDetailsError);
        expect(err.status).toEqual(400);
        expect(err.invalidParams).not.toBeUndefined();
    });
});

testCase("Can get organization", async () => {
    const organizationId: string = await client.organization.search().then((resp) => {
        return resp.data.organizations[0].id;
    });

    const response = await client.organization.show(organizationId);

    expect(response.status).toEqual(200);
    expect(response.data.organization.id).toEqual(organizationId);
    expect(response.data.organization.name).not.toBeUndefined();
});

testCase("Throws error on nonexistent organization", async () => {
    await client.organization.show("ABC1234").then(() => {
        fail("Got a success response");
    }).catch((err) => {
        expect(err).toBeInstanceOf(ProblemDetailsError);
        expect(err.status).toEqual(404);
        expect(err.invalidParams).toBeUndefined();
    });
});
