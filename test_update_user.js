import { Client, TablesDB } from 'appwrite';

const client = new Client()
    .setEndpoint('https://fra.cloud.appwrite.io/v1')
    .setProject('67fe9627001d97e37ef3'); // Assuming this from fix_schema.js

const tablesDB = new TablesDB(client);

async function test() {
    try {
        const doc = await tablesDB.getRow({ databaseId: 'chat', tableId: 'users', rowId: '696cf4ee5d968d5cec37' });
        console.log("Current doc:", doc);

        const res = await tablesDB.updateRow({
            databaseId: 'chat',
            tableId: 'users',
            rowId: '696cf4ee5d968d5cec37',
            data: { updatedAt: new Date().toISOString() }
        });
        console.log("Update success:", res);
    } catch (e) {
        console.error("Update failed:", e.message);
    }
}
test();
