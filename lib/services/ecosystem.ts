import { Query } from 'appwrite';
import { tablesDB } from '../appwrite/client';
import { APPWRITE_CONFIG } from '../appwrite/config';

export const EcosystemService = {
    async listNotes(userId: string) {
        return await tablesDB.listRows(
            APPWRITE_CONFIG.DATABASES.WHISPERRNOTE,
            '67ff05f3002502ef239e',
            [
                Query.equal('userId', userId),
                Query.orderDesc('$updatedAt'),
                Query.limit(50)
            ]
        );
    },

    async listSecrets(userId: string) {
        return await tablesDB.listRows(
            APPWRITE_CONFIG.DATABASES.PASSWORD_MANAGER,
            'credentials',
            [
                Query.equal('userId', userId),
                Query.orderDesc('$updatedAt'),
                Query.limit(50)
            ]
        );
    },

    async listTotpSecrets(userId: string) {
        return await tablesDB.listRows(
            APPWRITE_CONFIG.DATABASES.PASSWORD_MANAGER,
            'totpSecrets',
            [
                Query.equal('userId', userId),
                Query.orderDesc('$updatedAt'),
                Query.limit(50)
            ]
        );
    }
};
