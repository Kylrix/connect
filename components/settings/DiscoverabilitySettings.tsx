'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { 
    Box, 
    Typography, 
    Paper, 
    Stack, 
    Switch, 
    Divider,
    CircularProgress,
    alpha
} from '@mui/material';
import { User, Search } from 'lucide-react';
import { UsersService } from '@/lib/services/users';
import { useAuth } from '@/lib/auth';
import toast from 'react-hot-toast';

export const DiscoverabilitySettings = () => {
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [profile, setProfile] = useState<any>(null);
    const [username, setUsername] = useState('');

    const loadProfile = useCallback(async () => {
        try {
            const p = await UsersService.getProfileById(user!.$id);
            setProfile(p);
            if (p) setUsername(p.username);
        } catch (_e: unknown) {
            console.error("Failed to load profile", _e);
        } finally {
            setLoading(false);
        }
    }, [user]);

    useEffect(() => {
        if (user?.$id) {
            loadProfile();
        }
    }, [user, loadProfile]);

    const handleToggleDiscoverability = async (checked: boolean) => {
        if (!user?.$id || !profile) return;
        
        setSaving(true);
        try {
            // appsActive array determines which apps the user is "active" in for discovery
            // If they opt out, we can remove 'connect' or clear the array
            const appsActive = checked ? ['connect'] : [];
            await UsersService.updateProfile(user.$id, { appsActive });
            setProfile({ ...profile, appsActive });
            toast.success(checked ? "You are now discoverable" : "Discovery disabled");
        } catch (_e: unknown) {
            toast.error("Failed to update preference");
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <CircularProgress size={24} />;

    const isDiscoverable = profile?.appsActive?.includes('connect');

    return (
        <Box>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                <Search size={20} color="#00F0FF" /> Discoverability
            </Typography>
            <Paper sx={{ 
                p: 3, 
                borderRadius: '24px', 
                bgcolor: 'rgba(255, 255, 255, 0.02)', 
                border: '1px solid rgba(255, 255, 255, 0.05)' 
            }}>
                <Stack spacing={3}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Box>
                            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>Public Profile</Typography>
                            <Typography variant="body2" sx={{ opacity: 0.6 }}>Allow others to find you by username</Typography>
                        </Box>
                        <Switch 
                            checked={!!isDiscoverable} 
                            onChange={(e) => handleToggleDiscoverability(e.target.checked)}
                            disabled={saving}
                            color="primary" 
                        />
                    </Box>

                    <Divider sx={{ opacity: 0.05 }} />

                    <Box>
                        <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1, color: 'rgba(255, 255, 255, 0.7)' }}>
                            Your Universal Handle
                        </Typography>
                        <Box sx={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: 1.5,
                            p: 2,
                            borderRadius: '16px',
                            bgcolor: 'rgba(255, 255, 255, 0.03)',
                            border: '1px solid rgba(255, 255, 255, 0.05)'
                        }}>
                            <User size={20} color={isDiscoverable ? "#00F0FF" : "rgba(255, 255, 255, 0.2)"} />
                            <Typography sx={{ 
                                fontFamily: 'var(--font-jetbrains-mono)', 
                                fontWeight: 700,
                                opacity: isDiscoverable ? 1 : 0.4
                            }}>
                                @{username || 'not_set'}
                            </Typography>
                            {isDiscoverable && (
                                <Box sx={{ 
                                    ml: 'auto', 
                                    px: 1, 
                                    py: 0.5, 
                                    borderRadius: '6px', 
                                    bgcolor: alpha('#00F0FF', 0.1),
                                    border: '1px solid',
                                    borderColor: alpha('#00F0FF', 0.2)
                                }}>
                                    <Typography sx={{ fontSize: '0.65rem', fontWeight: 900, color: '#00F0FF', textTransform: 'uppercase' }}>
                                        Live
                                    </Typography>
                                </Box>
                            )}
                        </Box>
                        <Typography variant="caption" sx={{ mt: 1, display: 'block', opacity: 0.4 }}>
                            This handle is shared across the entire Kylrix ecosystem.
                        </Typography>
                    </Box>
                </Stack>
            </Paper>
        </Box>
    );
};
