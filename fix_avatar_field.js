import { Client, Databases } from 'node-appwrite';
const client = new Client()
    .setEndpoint('https://fra.cloud.appwrite.io/v1')
    .setProject('67fe9627001d97e37ef3')
    .setKey('standard_187e3bd83da464495b62d249297d64d4cafeeb28079f068624cfbaee13d22e33a61557c19f617c7d820e3ea6538886e941abcc9f763e126052b3a1e0f710dd45ebbec8c966415431220c45a4b9df5e06592a7050cf342960d644a3aebe2d8f84c65e4a0fd40a220394c8f76556e05b00f71c1104c75e35dfc2da2e2eab34f58a');

const databases = new Databases(client);

async function run() {
    try {
        console.log("Checking attributes for chat.users...");
        const attributes = await databases.listAttributes('chat', 'users');
        const keys = attributes.attributes.map(a => a.key);
        
        if (!keys.includes('avatarFileId')) {
            console.log("Creating avatarFileId attribute to fix 'Unknown attribute' errors...");
            await databases.createStringAttribute('chat', 'users', 'avatarFileId', 256, false, null, false);
            console.log("Attribute creation initiated. It may take a few seconds to become available.");
        } else {
            console.log("avatarFileId already exists in schema.");
        }
    } catch(e) {
        console.error("Error:", e);
    }
}
run();
