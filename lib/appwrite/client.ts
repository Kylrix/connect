import { Client, Account, TablesDB, Storage, Realtime } from 'appwrite';
import { APPWRITE_CONFIG } from './config';

const client = new Client()
    .setEndpoint(APPWRITE_CONFIG.ENDPOINT)
    .setProject(APPWRITE_CONFIG.PROJECT_ID);

export const account = new Account(client);
export const tablesDB = new TablesDB(client);
export const storage = new Storage(client);
export const realtime = new Realtime(client);

export { client };
