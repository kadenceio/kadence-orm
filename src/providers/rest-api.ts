import { KadenceDataSource } from "../types/source";

export const getRecords = async (dataSource: KadenceDataSource, dataQuery: string) => {
    switch (dataSource.connectionData.authType) {
        case "none":
            return await (await fetch(dataSource.connectionData.url)).json();
        case "basic":
            break;
        case "bearer":
            return await (await fetch(dataSource.connectionData.url, {
                headers: { 'Authorization': `Bearer ${dataSource.connectionData.token}` }
            })).json();
        case "oauth":
            // TODO: Implement Oauth authentication
            break;
    }
}