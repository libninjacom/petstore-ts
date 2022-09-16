import * as model from "./model";

export class PetstoreClient {
    authenticator: PetstoreAuthenticator;
    baseUrl: string;
    constructor(baseUrl: string, authenticator: PetstoreAuthenticator) {
        this.authenticator = authenticator;
        this.baseUrl = baseUrl;
    }
    static fromEnv(): PetstoreClient {
        return new PetstoreClient(
            getEnvVar("PETSTORE_BASE_URL"),
            PetstoreAuthenticator.fromEnv()
        );
    }

    async send(
        method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH",
        path: string,
        headers: Record<string, string>,
        query: Record<string, string | number | undefined>,
        body: any
    ): Promise<string> {
        /**
    @throws {HttpError} if the response is not a 2xx response*/
        const params = new URLSearchParams(filter_undefined(query));
        const url = `${this.baseUrl}${path}?` + params.toString();
        const headers1 = { ...headers, "Content-Type": "application/json" };
        const res = await fetch(url, {
            method: method,
            headers: filter_undefined(headers1),
            body: ["GET", "HEAD"].includes(method)
                ? undefined
                : JSON.stringify(body),
        });
        const text = await res.text();
        if (res.ok) {
            return text;
        } else {
            throw new HttpError(text, res.status);
        }
    }

    async listPets({
        limit,
    }: Partial<{ limit: number }> = {}): Promise<model.Pets> {
        /**List all pets
    
    @throws {SyntaxError} if a valid 2xx response is not valid JSON
    @throws {HttpError} if the response is not a 2xx response*/
        const path1 = `/pets`;
        const params = { limit: limit };
        const headers = {};
        const body = {};
        const text = await this.send("GET", path1, headers, params, body);
        return JSON.parse(text);
    }

    async createPets(): Promise<void> {
        /**Create a pet
    
    @throws {SyntaxError} if a valid 2xx response is not valid JSON
    @throws {HttpError} if the response is not a 2xx response*/
        const path1 = `/pets`;
        const params = {};
        const headers = {};
        const body = {};
        const text = await this.send("POST", path1, headers, params, body);
        return undefined;
    }

    async showPetById(petId: number): Promise<model.Pet> {
        /**Info for a specific pet
    
    @throws {SyntaxError} if a valid 2xx response is not valid JSON
    @throws {HttpError} if the response is not a 2xx response*/
        const path1 = `/pets/${petId}`;
        const params = {};
        const headers = {};
        const body = {};
        const text = await this.send("GET", path1, headers, params, body);
        return JSON.parse(text);
    }
}

class PetstoreAuthenticator {
    static fromEnv(): PetstoreAuthenticator {
        return new PetstoreAuthenticator();
    }
}

function getEnvVar(name: string): string {
    const value = process.env[name];
    if (value === undefined) {
        throw new Error(`Missing environment variable: ${name}`);
    }
    return value;
}

export class HttpError extends Error {
    status: number;

    constructor(response: string, status: number) {
        super(response);
        this.status = status;
    }
}

function filter_undefined(
    obj: Record<string, string | number | undefined>
): Record<string, string> {
    const entries = Object.entries(obj)
        .filter(([_, v]) => v !== undefined)
        .map(([k, v]) => [k, v.toString()]);
    return Object.fromEntries(entries);
}
