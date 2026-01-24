'use client';

import React, { createContext, useContext, useEffect } from 'react';
import { useAuth } from '@/lib/auth';
import { ActivityService } from '@/lib/services/activity';

const PresenceContext = createContext({});

export const PresenceProvider = ({ children }: { children: React.ReactNode }) => {
    const { user } = useAuth();

    useEffect(() => {
        if (!user) return;

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

        const handleBeforeUnload = () => {
            // This is unreliable but worth a try
            // In a production app, we'd use a Beacon API or Appwrite Function on disconnect
            // updateStatus('offline');
        };

        window.addEventListener('visibilitychange', handleVisibilityChange);
        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            clearInterval(interval);
            window.removeEventListener('visibilitychange', handleVisibilityChange);
            window.removeEventListener('beforeunload', handleBeforeUnload);
            updateStatus('offline');
        };
    }, [user]);

    return (
        <PresenceContext.Provider value={{}}>
            {children}
        </PresenceContext.Provider>
    );
};

export const usePresence = () => useContext(PresenceContext);
