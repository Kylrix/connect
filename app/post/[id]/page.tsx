'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { AppShell } from '@/components/layout/AppShell';
import { SocialService } from '@/lib/services/social';
import { UsersService } from '@/lib/services/users';
import { useAuth } from '@/lib/auth';
import {
    Box,
    Card,
    CardHeader,
    CardContent,
    CardActions,
    Avatar,
    Typography,
    IconButton,
    Button,
    CircularProgress,
    Divider,
    Paper,
    Container,
    alpha,
    Stack,
    Tooltip
} from '@mui/material';
import {
    Heart,
    MessageCircle,
    Repeat2,
    Share,
    Bookmark,
    ArrowLeft,
    MoreHorizontal,
    Calendar,
    FileText,
    MapPin,
    Clock,
    Link2
} from 'lucide-react';
import { fetchProfilePreview } from '@/lib/profile-preview';
import { getUserProfilePicId } from '@/lib/user-utils';
import { format } from 'date-fns';
import toast from 'react-hot-toast';

export default function PostView() {
    const params = useParams();
    const router = useRouter();
    const { user } = useAuth();
    const [moment, setMoment] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [userAvatarUrl, setUserAvatarUrl] = useState<string | null>(null);

    const fetchUserAvatar = useCallback(async () => {
        const picId = getUserProfilePicId(user);
        if (picId) {
            try {
                const url = await fetchProfilePreview(picId, 64, 64);
                setUserAvatarUrl(url as unknown as string);
            } catch (_e) {
                console.warn('Failed to fetch user avatar', _e);
            }
        }
    }, [user]);

    const loadMoment = useCallback(async () => {
        if (!params.id) return;
        try {
            const id = Array.isArray(params.id) ? params.id[0] : params.id;
            const data = await SocialService.getMomentById(id);
            
            // Enrich creator
            const creatorId = data.userId || data.creatorId;
            const creator = await UsersService.getProfileById(creatorId);
            
            let avatar = null;
            if (creator?.avatar) {
                try {
                    const url = await fetchProfilePreview(creator.avatar, 64, 64);
                    avatar = url as unknown as string;
                } catch (_e) {}
            }

            setMoment({ ...data, creator: { ...creator, avatar } });
        } catch (error) {
            console.error('Failed to load moment:', error);
            toast.error('Moment not found');
        } finally {
            setLoading(false);
        }
    }, [params.id]);

    useEffect(() => {
        loadMoment();
        if (user) fetchUserAvatar();
    }, [loadMoment, user, fetchUserAvatar]);

    const handleCopyLink = () => {
        navigator.clipboard.writeText(window.location.href);
        toast.success('Link copied to clipboard');
    };

    if (loading) return (
        <AppShell>
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 20 }}>
                <CircularProgress sx={{ color: '#F59E0B' }} />
            </Box>
        </AppShell>
    );

    if (!moment) return (
        <AppShell>
            <Box sx={{ textAlign: 'center', py: 10 }}>
                <Typography variant="h5" color="text.secondary">Moment not found</Typography>
                <Button sx={{ mt: 2 }} onClick={() => router.back()}>Go Back</Button>
            </Box>
        </AppShell>
    );

    const isOwnPost = user?.$id === (moment.userId || moment.creatorId);
    const creatorName = isOwnPost ? (user?.name || 'You') : (moment.creator?.displayName || moment.creator?.username || 'Unknown');
    const creatorAvatar = isOwnPost ? userAvatarUrl : moment.creator?.avatar;

    return (
        <AppShell>
            <Container maxWidth="sm" sx={{ py: { xs: 1, sm: 3 } }}>
                {/* Header Navigation */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 3 }}>
                    <IconButton onClick={() => router.back()} sx={{ color: 'white', bgcolor: 'rgba(255,255,255,0.03)' }}>
                        <ArrowLeft size={20} />
                    </IconButton>
                    <Box>
                        <Typography variant="h6" sx={{ fontWeight: 900, fontFamily: 'var(--font-clash)', letterSpacing: '-0.02em' }}>
                            Moment
                        </Typography>
                        <Typography variant="caption" sx={{ opacity: 0.5, fontWeight: 700 }}>
                            @{moment.creator?.username}
                        </Typography>
                    </Box>
                </Box>

                <Card sx={{ 
                    borderRadius: '24px', 
                    bgcolor: '#161412', 
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                    overflow: 'visible'
                }} elevation={0}>
                    <CardHeader
                        avatar={
                            <Avatar
                                src={creatorAvatar}
                                sx={{ 
                                    width: 48, 
                                    height: 48, 
                                    bgcolor: isOwnPost ? '#F59E0B' : 'rgba(255, 255, 255, 0.05)',
                                    color: isOwnPost ? '#000' : 'text.secondary',
                                    borderRadius: '12px',
                                    fontWeight: 800,
                                    border: '1px solid rgba(255,255,255,0.1)'
                                }}
                            >
                                {creatorName.charAt(0).toUpperCase()}
                            </Avatar>
                        }
                        title={
                            <Typography sx={{ fontWeight: 900, fontSize: '1.1rem', color: isOwnPost ? '#F59E0B' : 'text.primary', fontFamily: 'var(--font-clash)' }}>
                                {creatorName}
                            </Typography>
                        }
                        subheader={
                            <Typography variant="caption" sx={{ opacity: 0.5, fontWeight: 700, fontFamily: 'var(--font-mono)' }}>
                                @{moment.creator?.username}
                            </Typography>
                        }
                        action={
                            <IconButton sx={{ color: 'rgba(255, 255, 255, 0.3)' }}>
                                <MoreHorizontal size={20} />
                            </IconButton>
                        }
                    />

                    <CardContent sx={{ pt: 1, px: 3 }}>
                        <Typography variant="h5" sx={{ 
                            lineHeight: 1.4, 
                            fontSize: '1.4rem', 
                            fontWeight: 500,
                            mb: 3,
                            whiteSpace: 'pre-wrap',
                            wordBreak: 'break-word',
                            color: 'rgba(255,255,255,0.95)'
                        }}>
                            {moment.caption}
                        </Typography>

                        {/* Note Attachment Integration */}
                        {moment.attachedNote && (
                            <Paper sx={{ 
                                p: 0, 
                                borderRadius: 4, 
                                bgcolor: 'rgba(255, 255, 255, 0.02)', 
                                border: '1px solid rgba(255, 255, 255, 0.08)',
                                overflow: 'hidden',
                                mb: 3
                            }}>
                                <Box sx={{ p: 3, background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.05) 0%, rgba(0, 163, 255, 0.02) 100%)' }}>
                                    <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
                                        <Box sx={{ p: 1, bgcolor: alpha('#6366F1', 0.1), borderRadius: 1.5, color: '#6366F1' }}>
                                            <FileText size={22} />
                                        </Box>
                                        <Box>
                                            <Typography variant="subtitle1" sx={{ fontWeight: 900, color: 'white' }}>{moment.attachedNote.title}</Typography>
                                            <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.4)', fontWeight: 700 }}>KYLRIX NOTE</Typography>
                                        </Box>
                                    </Stack>
                                    <Typography variant="body2" sx={{ opacity: 0.7, lineHeight: 1.7 }}>
                                        {moment.attachedNote.content?.substring(0, 200)}...
                                    </Typography>
                                </Box>
                                <Box sx={{ px: 3, py: 1.5, bgcolor: 'rgba(0,0,0,0.2)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Typography variant="caption" sx={{ color: '#6366F1', fontWeight: 800 }}>ATTACHED KNOWLEDGE</Typography>
                                    <Button size="small" sx={{ fontWeight: 800, color: '#6366F1' }}>Read Note</Button>
                                </Box>
                            </Paper>
                        )}

                        {/* Event Attachment Integration */}
                        {moment.attachedEvent && (
                            <Paper sx={{ 
                                p: 0, 
                                borderRadius: 4, 
                                bgcolor: 'rgba(255, 255, 255, 0.02)', 
                                border: '1px solid rgba(255, 255, 255, 0.08)',
                                overflow: 'hidden',
                                mb: 3
                            }}>
                                <Box sx={{ p: 3, background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.05) 0%, rgba(0, 163, 255, 0.02) 100%)' }}>
                                    <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
                                        <Box sx={{ p: 1, bgcolor: alpha('#A855F7', 0.1), borderRadius: 1.5, color: '#A855F7' }}>
                                            <Calendar size={22} />
                                        </Box>
                                        <Box>
                                            <Typography variant="subtitle1" sx={{ fontWeight: 900, color: 'white' }}>{moment.attachedEvent.title}</Typography>
                                            <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.4)', fontWeight: 700 }}>KYLRIX FLOW</Typography>
                                        </Box>
                                    </Stack>
                                    <Stack spacing={1}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, color: 'rgba(255,255,255,0.5)' }}>
                                            <Clock size={14} />
                                            <Typography variant="caption" fontWeight={700}>
                                                {format(new Date(moment.attachedEvent.startTime), 'MMM d, h:mm a')}
                                            </Typography>
                                        </Box>
                                        {moment.attachedEvent.location && (
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, color: 'rgba(255,255,255,0.5)' }}>
                                                <MapPin size={14} />
                                                <Typography variant="caption" fontWeight={700}>{moment.attachedEvent.location}</Typography>
                                            </Box>
                                        )}
                                    </Stack>
                                </Box>
                                <Box sx={{ px: 3, py: 1.5, bgcolor: 'rgba(0,0,0,0.2)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Typography variant="caption" sx={{ color: '#A855F7', fontWeight: 800 }}>SCHEDULED EVENT</Typography>
                                    <Button size="small" sx={{ fontWeight: 800, color: '#A855F7' }}>Add to Calendar</Button>
                                </Box>
                            </Paper>
                        )}

                        <Typography variant="body2" sx={{ opacity: 0.4, fontWeight: 700, mt: 4, mb: 2 }}>
                            {format(new Date(moment.$createdAt || moment.createdAt), 'h:mm a · MMM d, yyyy')} · Kylrix Connect
                        </Typography>

                        <Divider sx={{ borderColor: 'rgba(255,255,255,0.05)', my: 2 }} />
                        
                        <Stack direction="row" spacing={3} sx={{ py: 1 }}>
                            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                                <Typography sx={{ fontWeight: 900, fontSize: '0.9rem' }}>0</Typography>
                                <Typography variant="caption" sx={{ opacity: 0.5, fontWeight: 700 }}>REPLIES</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                                <Typography sx={{ fontWeight: 900, fontSize: '0.9rem' }}>0</Typography>
                                <Typography variant="caption" sx={{ opacity: 0.5, fontWeight: 700 }}>LIKES</Typography>
                            </Box>
                        </Stack>

                        <Divider sx={{ borderColor: 'rgba(255,255,255,0.05)', mt: 1, mb: 2 }} />

                        <Stack direction="row" justifyContent="space-around" sx={{ color: 'rgba(255,255,255,0.4)' }}>
                            <Tooltip title="Reply">
                                <IconButton sx={{ '&:hover': { color: '#6366F1', bgcolor: alpha('#6366F1', 0.1) } }}>
                                    <MessageCircle size={22} />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Pulse">
                                <IconButton sx={{ '&:hover': { color: '#10B981', bgcolor: alpha('#10B981', 0.1) } }}>
                                    <Repeat2 size={22} />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Heart">
                                <IconButton sx={{ '&:hover': { color: '#F59E0B', bgcolor: alpha('#F59E0B', 0.1) } }}>
                                    <Heart size={22} />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Bookmark">
                                <IconButton sx={{ '&:hover': { color: '#EC4899', bgcolor: alpha('#EC4899', 0.1) } }}>
                                    <Bookmark size={22} />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Copy Link">
                                <IconButton onClick={handleCopyLink} sx={{ '&:hover': { color: '#F59E0B', bgcolor: alpha('#F59E0B', 0.1) } }}>
                                    <Link2 size={22} />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Share">
                                <IconButton sx={{ '&:hover': { color: '#6366F1', bgcolor: alpha('#6366F1', 0.1) } }}>
                                    <Share size={22} />
                                </IconButton>
                            </Tooltip>
                        </Stack>
                        
                        <Divider sx={{ borderColor: 'rgba(255,255,255,0.05)', mt: 2 }} />
                    </CardContent>
                </Card>

                {/* Reply Section Placeholder */}
                <Box sx={{ mt: 3, p: 2, bgcolor: 'rgba(255,255,255,0.02)', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.05)', textAlign: 'center' }}>
                    <Typography variant="body2" sx={{ opacity: 0.5, fontWeight: 700 }}>
                        Replies are currently evolving in the Intelligence Feed.
                    </Typography>
                </Box>
            </Container>
        </AppShell>
    );
}
