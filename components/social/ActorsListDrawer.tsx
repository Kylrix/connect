import React from 'react';
import { Drawer, Box, Typography, Avatar, IconButton, Stack } from '@mui/material';
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
    return (
        <Drawer
            anchor={mobile ? 'bottom' : 'right'}
            open={open}
            onClose={onClose}
            PaperProps={{ sx: { bgcolor: '#0A0908', color: 'white', borderRadius: mobile ? '16px 16px 0 0' : '12px 0 0 12px', width: mobile ? '100%' : 360, p: 2 } }}
        >
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                <Typography sx={{ fontWeight: 900 }}>{title}</Typography>
                <IconButton onClick={onClose} sx={{ color: 'rgba(255,255,255,0.6)' }}>
                    <X size={18} />
                </IconButton>
            </Box>

            <Box sx={{ mt: 1 }}>
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
