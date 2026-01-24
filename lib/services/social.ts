import { ID, Query } from 'appwrite';
import { tablesDB } from '../appwrite/client';
import { APPWRITE_CONFIG } from '../appwrite/config';

const DB_ID = APPWRITE_CONFIG.DATABASES.CHAT;
const MOMENTS_TABLE = APPWRITE_CONFIG.TABLES.CHAT.MOMENTS;
const FOLLOWS_TABLE = APPWRITE_CONFIG.TABLES.CHAT.FOLLOWS;
const INTERACTIONS_TABLE = APPWRITE_CONFIG.TABLES.CHAT.INTERACTIONS;

export const SocialService = {
    async getFeed(userId: string) {
        // In a real app, this would be a complex query or cloud function.
        // For now, we fetch public moments or moments from followed users.
        // Since Appwrite queries are limited, we might just fetch recent public moments.
        return await tablesDB.listRows(DB_ID, MOMENTS_TABLE, [
            Query.equal('visibility', 'public'),
            Query.orderDesc('createdAt'),
            Query.limit(20)
        ]);
    },

    async createMoment(creatorId: string, content: string, type: 'text' | 'image' | 'video' = 'text', mediaIds: string[] = [], visibility: 'public' | 'private' | 'followers' = 'public') {
        return await tablesDB.createRow(DB_ID, MOMENTS_TABLE, ID.unique(), {
            creatorId,
            content,
            type,
            mediaIds,
            visibility,
            createdAt: new Date().toISOString()
        });
    },

    async deleteMoment(momentId: string) {
        return await tablesDB.deleteRow(DB_ID, MOMENTS_TABLE, momentId);
    },

    async updateMomentVisibility(momentId: string, visibility: 'public' | 'private' | 'followers') {
        return await tablesDB.updateRow(DB_ID, MOMENTS_TABLE, momentId, { visibility });
    },

    async likeMoment(userId: string, momentId: string) {
        return await tablesDB.createRow(DB_ID, INTERACTIONS_TABLE, ID.unique(), {
            userId,
            momentId,
            type: 'like',
            createdAt: new Date().toISOString()
        });
    }
};
