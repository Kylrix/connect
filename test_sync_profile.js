import { Client, Databases, ID } from 'appwrite';
const client = new Client().setEndpoint('https://fra.cloud.appwrite.io/v1').setProject('67fe9627001d97e37ef3');
const databases = new Databases(client);

async function run() {
    try {
        console.log("Testing create profile...");
        const res = await databases.createDocument('chat', 'users', ID.unique(), {
            username: 'test_user',
            displayName: 'Test User',
            avatarUrl: null, 
            bio: "Member of the Kylrix Ecosystem",
            appsActive: ['accounts'],
            email: 'test@test.com',
            status: 'online',
            lastSeen: new Date().toISOString(),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        });
        console.log("Success:", res);
    } catch(e) {
        console.log("Error:", e.message);
    }
}
run();
