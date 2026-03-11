import { Client, TablesDB, Databases } from 'appwrite';
const client = new Client().setEndpoint('https://fra.cloud.appwrite.io/v1').setProject('67fe9627001d97e37ef3');
const tablesDB = new TablesDB(client);
const databases = new Databases(client);

async function run() {
    try {
        console.log("Testing Databases.listDocuments...");
        const res1 = await databases.listDocuments('chat', 'users', []);
        console.log("Databases Success! Found", res1.total);
    } catch(e) {
        console.log("Databases Error:", e.message);
    }
    
    try {
        console.log("\nTesting TablesDB.listRows...");
        const res2 = await tablesDB.listRows('chat', 'users', []);
        console.log("TablesDB Success! Found", res2.total);
    } catch(e) {
        console.log("TablesDB Error:", e.message);
    }
}
run();
