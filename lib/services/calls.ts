import { ID, Query } from 'appwrite';
import { tablesDB } from '../appwrite/client';
import { APPWRITE_CONFIG } from '../appwrite/config';

const DB_ID = APPWRITE_CONFIG.DATABASES.CHAT;
const CALL_LINKS_TABLE = APPWRITE_CONFIG.TABLES.CHAT.CALL_LINKS;
const CALL_LOGS_TABLE = APPWRITE_CONFIG.TABLES.CHAT.CALL_LOGS;

export const CallService = {
    async createCallLink(creatorId: string, slug: string, settings: any = {}) {
        return await tablesDB.createRow(DB_ID, CALL_LINKS_TABLE, ID.unique(), {
            slug,
            creatorId,
            settings: JSON.stringify(settings),
            createdAt: new Date().toISOString()
        });
    },

    async getCallLink(slug: string) {
        const result = await tablesDB.listRows(DB_ID, CALL_LINKS_TABLE, [
            Query.equal('slug', slug)
        ]);
        return result.rows[0] || null;
    },

    async logCall(callerId: string, receiverId: string, type: 'audio' | 'video', status: 'completed' | 'missed' | 'rejected' | 'busy', duration = 0) {
        return await tablesDB.createRow(DB_ID, CALL_LOGS_TABLE, ID.unique(), {
            callerId,
            receiverId,
            type,
            status,
            duration,
            startedAt: new Date().toISOString() // Approximate start time
        });
    }
};
