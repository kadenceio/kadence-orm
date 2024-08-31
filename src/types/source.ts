/*
export type DataSourceType = "database" | "rest-api" | "queue" | "cache";

export type DataSourceProvider = "mongodb" | "mysql" | "postgres" | "rest-api" | "upstash-kafka" | "upstash-redis";
*/

export type DataSourceType = "database";
export type DataSourceProvider = "postgres";

export class KadenceDataSource {
    type: string;
    provider: DataSourceProvider;
    connectionData: any;

    constructor(provider: DataSourceProvider, connectionData: any) {
        this.provider = provider;
        this.connectionData = connectionData;

        switch (provider) {
            case "postgres":
                this.type = "database";
                break;
            /*case "mysql":
            case "mongodb":
                this.type = "database";
                break;
            case "rest-api":
                this.type = "rest-api";
                break;
            case "upstash-kafka":
                this.type = "queue";
                break;
            case "upstash-redis":
                this.type = "cache";
                break;*/
            default:
                throw new Error(`Invalid provider: ${provider}`);
        }
    }
}

export enum StringTypes {
    VARCHAR = "varchar",
    TEXT = "text",
    CHAR = "char",
    UUID = "uuid",
    STRING = "string",
}