import { PetstoreClient } from "petstore";

async function main() {
    const client = PetstoreClient.fromEnv();
    const response = await client.createPets();
    console.log(response);
}

main();
