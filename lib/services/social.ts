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

    async createMoment(creatorId: string, content: string, type: 'text' | 'image' | 'video' = 'text', mediaIds: string[] = []) {
        return await tablesDB.createRow(DB_ID, MOMENTS_TABLE, ID.unique(), {
            creatorId,
            content,
            type,
            mediaIds,
            visibility: 'public',
            createdAt: new Date().toISOString()
        });
    },

    async followUser(followerId: string, followingId: string) {
        return await tablesDB.createRow(DB_ID, FOLLOWS_TABLE, ID.unique(), {
            followerId,
            followingId,
            status: 'accepted',
            scope: 'follow',
            createdAt: new Date().toISOString()
        });
    },

    async connectUser(requesterId: string, targetId: string) {
        return await tablesDB.createRow(DB_ID, FOLLOWS_TABLE, ID.unique(), {
            followerId: requesterId,
            followingId: targetId,
            status: 'pending',
            scope: 'connection',
            createdAt: new Date().toISOString()
        });
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
