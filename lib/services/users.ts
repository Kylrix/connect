import { ID, Query } from 'appwrite';
import { tablesDB } from '../appwrite/client';
import { APPWRITE_CONFIG } from '../appwrite/config';

const DB_ID = APPWRITE_CONFIG.DATABASES.CHAT;
const USERS_TABLE = APPWRITE_CONFIG.TABLES.CHAT.USERS;

export const UsersService = {
    async getProfile(username: string) {
        const result = await tablesDB.listRows(DB_ID, USERS_TABLE, [
            Query.equal('username', username)
        ]);
        return result.rows[0] || null;
    },

    async getProfileById(userId: string) {
        try {
            return await tablesDB.getRow(DB_ID, USERS_TABLE, userId);
        } catch (e) {
            return null;
        }
    },

    async updateProfile(userId: string, data: { bio?: string; avatarUrl?: string; appsActive?: string[] }) {
        // Note: In a real scenario, we'd need the document ID, which might match userId or be separate.
        // Assuming userId maps to the document ID for simplicity, or we query by userId first.
        // Here we assume the row ID is the user ID or we have a way to get it.
        // For now, let's assume we need to find the row first if we don't have the ID.
        
        // This is a simplification. In production, we'd store the row ID in the session or fetch it.
        return await tablesDB.updateRow(DB_ID, USERS_TABLE, userId, data);
    },

    async createProfile(userId: string, username: string, email: string) {
        return await tablesDB.createRow(DB_ID, USERS_TABLE, userId, {
            username,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        });
    },

    async searchUsers(query: string) {
        // Search by username or displayName
        // Note: Appwrite search queries might need specific indexes.
        // Assuming 'username' and 'displayName' are indexed (fulltext or key).
        // For MVP, we'll search username.
        return await tablesDB.listRows(DB_ID, USERS_TABLE, [
            Query.search('username', query),
            Query.limit(10)
        ]);
    }
};
