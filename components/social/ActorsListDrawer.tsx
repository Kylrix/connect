import React, { useState } from 'react';
import { Drawer, Box, Typography, Avatar, IconButton, Stack, useMediaQuery, useTheme } from '@mui/material';
import { X } from 'lucide-react';

interface Actor {
    $id: string;
    username?: string;
    displayName?: string;
    avatar?: string | null;
}

interface Props {
    open: boolean;
    onClose: () => void;
    title: string;
    actors: Actor[];
    mobile?: boolean;
    onSelect?: (actor: Actor) => void;
}

export function ActorsListDrawer({ open, onClose, title, actors, mobile = false, onSelect }: Props) {
    const theme = useTheme();
    const prefersMobile = mobile || useMediaQuery(theme.breakpoints.down('md'));
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <Drawer
            anchor={prefersMobile ? 'bottom' : 'right'}
            open={open}
            onClose={onClose}
            PaperProps={{ sx: { bgcolor: '#0A0908', color: 'white', borderRadius: prefersMobile ? (isExpanded ? '0' : '16px 16px 0 0') : '12px 0 0 12px', width: prefersMobile ? '100%' : 360, p: 2, height: prefersMobile ? (isExpanded ? '100%' : '70%') : 'auto', borderTop: prefersMobile ? '1px solid rgba(255,255,255,0.08)' : 'none', transition: 'height 0.25s cubic-bezier(0.4,0,0.2,1)' } }}
        >
            {prefersMobile && (
                <Box
                    sx={{ width: '100%', pt: 2, pb: 1, display: 'flex', justifyContent: 'center', cursor: 'pointer' }}
                    onClick={() => setIsExpanded(!isExpanded)}
                >
                    {isExpanded ? (
                        <Box sx={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                            <Typography variant="caption" sx={{ fontWeight: 800, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' }}>{title}</Typography>
                        </Box>
                    ) : (
                        <Box sx={{ width: 40, height: 4, bgcolor: 'rgba(255, 255, 255, 0.1)', borderRadius: '2px' }} />
                    )}
                </Box>
            )}

            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                <Typography sx={{ fontWeight: 900 }}>{!prefersMobile ? title : ''}</Typography>
                <IconButton onClick={onClose} sx={{ color: 'rgba(255,255,255,0.6)' }}>
                    <X size={18} />
                </IconButton>
            </Box>

            <Box sx={{ mt: 1, height: '100%', overflowY: 'auto' }}>
                {actors.length === 0 && (
                    <Typography sx={{ opacity: 0.4, textAlign: 'center', py: 6 }}>No accounts to show</Typography>
                )}

                <Stack spacing={1}>
                    {actors.map(actor => (
                        <Box
                            key={actor.$id}
                            onClick={() => onSelect ? onSelect(actor) : null}
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 2,
                                p: 1.25,
                                borderRadius: 2,
                                cursor: onSelect ? 'pointer' : 'default',
                                '&:hover': { bgcolor: 'rgba(255,255,255,0.02)' }
                            }}
                        >
                            <Avatar src={actor.avatar || undefined} sx={{ width: 44, height: 44, borderRadius: 1 }}>{(actor.displayName || actor.username || actor.$id).charAt(0).toUpperCase()}</Avatar>
                            <Box sx={{ flex: 1, minWidth: 0 }}>
                                <Typography sx={{ fontWeight: 800, fontSize: '0.95rem' }}>{actor.displayName || actor.username || actor.$id}</Typography>
                                <Typography variant="caption" sx={{ opacity: 0.5 }}>@{actor.username || actor.$id.slice(0, 7)}</Typography>
                            </Box>
                        </Box>
                    ))}
                </Stack>
            </Box>
        </Drawer>
    );
}

export default ActorsListDrawer;
