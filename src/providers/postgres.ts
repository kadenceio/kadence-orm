"use server"

import { Pool } from "pg";
import { KadenceDataSource } from "../types/source";

export const getConnection = (dataSource: KadenceDataSource) => {
    const pool = new Pool({
        host: dataSource.connectionData.host!,
        database: dataSource.connectionData.database!,
        user: dataSource.connectionData.user!,
        password: dataSource.connectionData.password!,
        port: dataSource.connectionData.port!,
    });

    return pool;
}

export const getRecords = async (dataSource: KadenceDataSource, dataQuery: string) => {
    const db = getConnection(dataSource);

    return await db.query(dataQuery)
    .then((response: any) => {
        return response.rows;
    })
    .catch((error: any) => {
        throw new Error(error);
    });
}