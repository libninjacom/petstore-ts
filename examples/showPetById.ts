import { PetstoreClient } from "petstore";

async function main() {
    const client = PetstoreClient.fromEnv();
    const petId = 1;
    const response = await client.showPetById(petId);
    console.log(response);
}

main();
