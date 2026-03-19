'use client';

import React, { createContext, useContext, useEffect } from 'react';
import { useAuth } from '@/lib/auth';
import { ActivityService } from '@/lib/services/activity';
import { realtime } from '@/lib/appwrite/client';
import { APPWRITE_CONFIG } from '@/lib/appwrite/config';

const PresenceContext = createContext<{
    getPresence: (userId: string) => any;
    presence: Record<string, any>;
}>({
    getPresence: () => null,
    presence: {}
});

export const PresenceProvider = ({ children }: { children: React.ReactNode }) => {
    const { user } = useAuth();
    const [presence, setPresence] = React.useState<Record<string, any>>({});

    useEffect(() => {
        if (!user) return;

        // Subscribe to presence updates
        const unsub = realtime.subscribe(
            [`databases.${APPWRITE_CONFIG.DATABASES.CHAT}.tables.${APPWRITE_CONFIG.TABLES.CHAT.APP_ACTIVITY}.rows`],
            (response) => {
                const payload = response.payload as any;
                setPresence(prev => ({
                    ...prev,
                    [payload.userId]: payload
                }));
            }
        );

        const updateStatus = (status: 'online' | 'offline' | 'away') => {
            ActivityService.updatePresence(user.$id, status);
        };

        // Mark as online
        updateStatus('online');

        // Periodically update lastSeen
        const interval = setInterval(() => updateStatus('online'), 1000 * 60 * 2); // Every 2 mins

        const handleVisibilityChange = () => {
            if (document.visibilityState === 'visible') {
                updateStatus('online');
            } else {
                updateStatus('away');
            }
        };

        window.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
            clearInterval(interval);
            window.removeEventListener('visibilitychange', handleVisibilityChange);
            updateStatus('offline');
            if (typeof unsub === 'function') (unsub as any)();
            else (unsub as any)?.unsubscribe?.();
        };
    }, [user]);

    const getPresence = React.useCallback(async (userId: string) => {
        if (presence[userId]) return presence[userId];
        const p = await ActivityService.getUserPresence(userId);
        if (p) {
            setPresence(prev => ({ ...prev, [userId]: p }));
        }
        return p;
    }, [presence]);

    return (
        <PresenceContext.Provider value={{ getPresence, presence }}>
            {children}
        </PresenceContext.Provider>
    );
};

export const usePresence = () => useContext(PresenceContext);
