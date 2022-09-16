import { PetstoreClient } from "petstore";

async function main() {
    const client = PetstoreClient.fromEnv();
    const response = await client.listPets();
    console.log(response);
}

main();
