import { ID, Query } from 'appwrite';
import { tablesDB } from '../appwrite/client';
import { APPWRITE_CONFIG } from '../appwrite/config';

const DB_ID = APPWRITE_CONFIG.DATABASES.CHAT;
const ACTIVITY_TABLE = APPWRITE_CONFIG.TABLES.CHAT.APP_ACTIVITY;

export interface AppActivity {
    userId: string;
    appId: 'whisperrnote' | 'whisperrflow' | 'whisperrkeep' | 'id';
    action: string;
    metadata: Record<string, any>;
    timestamp: string;
}

/**
 * ActivityService: The "Nervous System" of the Whisperr Ecosystem.
 * Orchestrates cross-app synergies by observing and reacting to user actions.
 */
export const ActivityService = {
    /**
     * Log an activity from any app in the ecosystem.
     */
    async logActivity(activity: AppActivity) {
        return await tablesDB.createRow(DB_ID, ACTIVITY_TABLE, ID.unique(), {
            ...activity,
            timestamp: activity.timestamp || new Date().toISOString()
        });
    },

    /**
     * Get recent activities to identify "Logical Synergies".
     * This is where the "creepy but useful" work begins.
     */
    async getRecentActivity(userId: string, limit = 50) {
        return await tablesDB.listRows(DB_ID, ACTIVITY_TABLE, [
            Query.equal('userId', userId),
            Query.orderDesc('timestamp'),
            Query.limit(limit)
        ]);
    },

    /**
     * The Synergy Engine: Analyzes recent activity to suggest transitions.
     * e.g. If user is researching "Stripe" in Notes, suggest the "Payment" project in Flow.
     */
    async analyzeSynergy(userId: string) {
        const result = await this.getRecentActivity(userId);
        const activities = result.rows;

        // Logic for "Contextual Awareness"
        // 1. Analyze Note tags/content from most recent activities
        // 2. Cross-reference with Flow tasks
        // 3. Trigger local notifications via Connect

        return activities; // Placeholder for actual analysis logic
    }
};
