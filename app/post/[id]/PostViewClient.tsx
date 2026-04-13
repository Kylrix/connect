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
    Tooltip,
    Drawer,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    useMediaQuery,
    useTheme,
    Skeleton
} from '@mui/material';
import ActorsListDrawer from '@/components/social/ActorsListDrawer';
import {
    Heart,
    MessageCircle,
    Repeat2,
    LogIn,
    MoreHorizontal,
    Calendar,
    FileText,
    MapPin,
    Clock,
    Link2,
    Send,
    Edit,
    Image as ImageIcon,
    Download
} from 'lucide-react';
import { fetchProfilePreview } from '@/lib/profile-preview';
import { getUserProfilePicId } from '@/lib/user-utils';
import { getCachedIdentityById, seedIdentityCache } from '@/lib/identity-cache';
import { resolveIdentity, resolveIdentityUsername } from '@/lib/identity-format';
import { getCachedMomentPreview, seedMomentPreview } from '@/lib/moment-preview';
import { format } from 'date-fns';
import { FormattedText } from '@/components/common/FormattedText';
import toast from 'react-hot-toast';
import { TextField, InputAdornment, Alert, Menu, MenuItem } from '@mui/material';

const EXPORT_WIDTH = 1400;
const EXPORT_CARD = '#161412';

const clampText = (value: string, limit: number) => {
    const clean = String(value || '').trim();
    return clean.length > limit ? `${clean.slice(0, limit - 1)}…` : clean;
};

const getMomentTimeLabel = (moment: any) => {
    const raw = moment?.$createdAt || moment?.createdAt;
    if (!raw) return 'Just now';
    return format(new Date(raw), 'MMM d · h:mm a');
};

const wrapLines = (ctx: CanvasRenderingContext2D, text: string, maxWidth: number) => {
    const words = String(text || '').split(/\s+/).filter(Boolean);
    if (!words.length) return [''];
    const lines: string[] = [];
    let current = words.shift() || '';
    for (const word of words) {
        const next = `${current} ${word}`;
        if (ctx.measureText(next).width <= maxWidth) {
            current = next;
        } else {
            lines.push(current);
            current = word;
        }
    }
    lines.push(current);
    return lines;
};

const drawRoundedRect = (ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, radius: number) => {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.arcTo(x + width, y, x + width, y + height, radius);
    ctx.arcTo(x + width, y + height, x, y + height, radius);
    ctx.arcTo(x, y + height, x, y, radius);
    ctx.arcTo(x, y, x + width, y, radius);
    ctx.closePath();
};

const loadImage = (src: string) => new Promise<HTMLImageElement | null>((resolve) => {
    if (!src) return resolve(null);
    const image = new Image();
    image.crossOrigin = 'anonymous';
    image.onload = () => resolve(image);
    image.onerror = () => resolve(null);
    image.src = src;
});

const drawAvatar = async (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, src?: string | null, label = 'U') => {
    ctx.save();
    ctx.beginPath();
    ctx.arc(x + size / 2, y + size / 2, size / 2, 0, Math.PI * 2);
    ctx.closePath();
    ctx.clip();
    ctx.fillStyle = 'rgba(255,255,255,0.06)';
    ctx.fillRect(x, y, size, size);
    const avatar = await loadImage(src || '');
    if (avatar) {
        ctx.drawImage(avatar, x, y, size, size);
    } else {
        ctx.fillStyle = '#F59E0B';
        ctx.fillRect(x, y, size, size);
        ctx.fillStyle = '#0A0908';
        ctx.font = `700 ${Math.floor(size * 0.45)}px sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(label.slice(0, 1).toUpperCase(), x + size / 2, y + size / 2 + 2);
    }
    ctx.restore();
};

const estimateCardHeight = (ctx: CanvasRenderingContext2D, moment: any, width: number) => {
    const textWidth = width - 120;
    const caption = wrapLines(ctx, String(moment?.caption || ''), textWidth);
    const attachmentCount = (moment?.metadata?.attachments || []).filter((att: any) => att.type === 'image' || att.type === 'video').length;
    let height = 340;
    height += Math.min(8, caption.length) * 48;
    if (attachmentCount > 0) height += 460;
    if (moment?.attachedNote) height += 190;
    if (moment?.attachedEvent) height += 220;
    return height;
};

const renderMomentCard = async (
    ctx: CanvasRenderingContext2D,
    moment: any,
    x: number,
    y: number,
    width: number,
    isReplyParent = false,
): Promise<number> => {
    const creator = moment?.creator || {};
    const identityName = resolveIdentity(creator, moment?.userId || moment?.creatorId);
    const avatarLabel = String(identityName.displayName || identityName.handle || 'User').slice(0, 1);
    const cardHeight = estimateCardHeight(ctx, moment, width);
    const radius = 36;

    ctx.save();
    ctx.shadowColor = 'rgba(0,0,0,0.35)';
    ctx.shadowBlur = 32;
    ctx.shadowOffsetY = 16;
    ctx.fillStyle = EXPORT_CARD;
    drawRoundedRect(ctx, x, y, width, cardHeight, radius);
    ctx.fill();
    ctx.restore();

    const innerX = x + 40;
    let cursorY = y + 36;

    if (isReplyParent) {
        ctx.fillStyle = '#6366F1';
        ctx.font = '700 22px sans-serif';
        ctx.fillText('In reply to', innerX, cursorY + 18);
        cursorY += 36;
    }

    await drawAvatar(ctx, innerX, cursorY, 64, creator?.avatar, avatarLabel);

    ctx.fillStyle = '#FFFFFF';
    ctx.font = '900 28px sans-serif';
    ctx.fillText(clampText(identityName.displayName || 'Unknown', 32), innerX + 86, cursorY + 26);

    ctx.fillStyle = 'rgba(255,255,255,0.45)';
    ctx.font = '700 19px monospace';
    ctx.fillText(clampText(identityName.handle || '', 40), innerX + 86, cursorY + 56);
    ctx.fillText(getMomentTimeLabel(moment), x + width - 40 - ctx.measureText(getMomentTimeLabel(moment)).width, cursorY + 56);

    cursorY += 106;

    const captionLines = wrapLines(ctx, String(moment?.caption || ''), width - 80);
    ctx.fillStyle = 'rgba(255,255,255,0.96)';
    ctx.font = '500 26px sans-serif';
    captionLines.slice(0, 8).forEach((line, index) => {
        ctx.fillText(line, innerX, cursorY + index * 38);
    });
    cursorY += Math.min(8, captionLines.length) * 38 + 20;

    const attachments = (moment?.metadata?.attachments || []).filter((att: any) => att.type === 'image' || att.type === 'video');
    if (attachments.length) {
        const first = attachments[0];
        const previewSrc = first.type === 'image' ? SocialService.getMediaPreview(first.id, 1200, 800) : SocialService.getMediaPreview(first.id, 1200, 800);
        const media = await loadImage(previewSrc);
        const mediaHeight = 420;
        ctx.save();
        drawRoundedRect(ctx, innerX, cursorY, width - 80, mediaHeight, 28);
        ctx.clip();
        ctx.fillStyle = 'rgba(255,255,255,0.03)';
        ctx.fillRect(innerX, cursorY, width - 80, mediaHeight);
        if (media) {
            const scale = Math.max((width - 80) / media.width, mediaHeight / media.height);
            const drawWidth = media.width * scale;
            const drawHeight = media.height * scale;
            ctx.drawImage(media, innerX + ((width - 80) - drawWidth) / 2, cursorY + (mediaHeight - drawHeight) / 2, drawWidth, drawHeight);
        }
        ctx.restore();
        cursorY += mediaHeight + 24;
    }

    if (moment?.attachedNote) {
        ctx.fillStyle = 'rgba(99,102,241,0.12)';
        drawRoundedRect(ctx, innerX, cursorY, width - 80, 150, 24);
        ctx.fill();
        ctx.fillStyle = '#FFFFFF';
        ctx.font = '900 22px sans-serif';
        ctx.fillText('Attached Note', innerX + 24, cursorY + 44);
        ctx.fillStyle = 'rgba(255,255,255,0.78)';
        ctx.font = '500 20px sans-serif';
        wrapLines(ctx, clampText(moment.attachedNote.content || '', 220), width - 128).slice(0, 4).forEach((line, idx) => {
            ctx.fillText(line, innerX + 24, cursorY + 82 + idx * 28);
        });
        cursorY += 174;
    }

    if (moment?.attachedEvent) {
        ctx.fillStyle = 'rgba(168,85,247,0.12)';
        drawRoundedRect(ctx, innerX, cursorY, width - 80, 170, 24);
        ctx.fill();
        ctx.fillStyle = '#FFFFFF';
        ctx.font = '900 22px sans-serif';
        ctx.fillText('Attached Event', innerX + 24, cursorY + 44);
        ctx.fillStyle = 'rgba(255,255,255,0.78)';
        ctx.font = '500 20px sans-serif';
        ctx.fillText(clampText(moment.attachedEvent.title || 'Untitled Event', 42), innerX + 24, cursorY + 82);
        ctx.fillText(clampText(moment.attachedEvent.location || 'No location', 42), innerX + 24, cursorY + 114);
        cursorY += 194;
    }

    ctx.fillStyle = 'rgba(255,255,255,0.35)';
    ctx.font = '700 18px monospace';
    ctx.fillText(`replies ${moment?.stats?.replies || 0}  •  likes ${moment?.stats?.likes || 0}  •  pulses ${moment?.stats?.pulses || 0}`, innerX, y + cardHeight - 30);

    return cardHeight;
};

const exportMomentAsImage = async (rootMoment: any) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Canvas unavailable');

    const parentMoment = rootMoment?.sourceMoment && rootMoment?.metadata?.sourceId ? rootMoment.sourceMoment : null;
    const margin = 80;
    const bodyWidth = EXPORT_WIDTH - margin * 2;

    canvas.width = EXPORT_WIDTH;
    ctx.font = '500 26px sans-serif';

    const headerHeight = 160;
    const parentHeight = parentMoment ? estimateCardHeight(ctx, parentMoment, bodyWidth) + 38 : 0;
    const mainHeight = estimateCardHeight(ctx, rootMoment, bodyWidth);
    const totalHeight = margin + headerHeight + parentHeight + mainHeight + 150 + (parentMoment ? 56 : 0);
    canvas.height = totalHeight;

    const gradient = ctx.createLinearGradient(0, 0, 0, totalHeight);
    gradient.addColorStop(0, '#0E0D0B');
    gradient.addColorStop(1, '#090807');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = 'rgba(255,255,255,0.03)';
    for (let i = 0; i < 36; i += 1) {
        ctx.beginPath();
        ctx.arc((i * 97) % canvas.width, 60 + (i * 53) % (canvas.height - 120), 1.5, 0, Math.PI * 2);
        ctx.fill();
    }

    ctx.fillStyle = 'rgba(255,255,255,0.05)';
    drawRoundedRect(ctx, margin, 36, bodyWidth, 96, 28);
    ctx.fill();
    ctx.fillStyle = '#F59E0B';
    ctx.font = '900 32px sans-serif';
    ctx.fillText('Kylrix Connect', margin + 32, 78);
    ctx.fillStyle = 'rgba(255,255,255,0.7)';
    ctx.font = '700 18px sans-serif';
    ctx.fillText('Screenshot export', margin + 32, 112);

    let cursorY = margin + headerHeight;
    if (parentMoment) {
        ctx.fillStyle = '#6366F1';
        ctx.fillRect(margin + 74, cursorY - 22, 3, 44);
        cursorY += 8;
        const parentCardHeight = await renderMomentCard(ctx, parentMoment, margin, cursorY, bodyWidth, true);
        cursorY += parentCardHeight + 28;
        ctx.fillStyle = '#6366F1';
        ctx.beginPath();
        ctx.arc(margin + 75.5, cursorY - 18, 5, 0, Math.PI * 2);
        ctx.fill();
    }

    await renderMomentCard(ctx, rootMoment, margin, cursorY, bodyWidth, false);

    ctx.fillStyle = 'rgba(255,255,255,0.28)';
    ctx.font = '700 18px monospace';
    const footer = `@${resolveIdentity(rootMoment.creator, rootMoment.userId || rootMoment.creatorId).handle?.replace(/^@/, '') || 'connect'} • ${window.location.hostname}`;
    ctx.fillText(footer, margin, canvas.height - 42);

    return new Promise<Blob>((resolve, reject) => {
        canvas.toBlob((blob) => {
            if (!blob) reject(new Error('Failed to encode image'));
            else resolve(blob);
        }, 'image/png', 1);
    });
};

export function PostViewClient() {
    const params = useParams();
    const momentId = Array.isArray(params.id) ? params.id[0] : params.id;
    const router = useRouter();
    const { user, login } = useAuth();
    const hasPreviewRef = React.useRef(Boolean(getCachedMomentPreview(momentId)));
    const [moment, setMoment] = useState<any>(() => getCachedMomentPreview(momentId) || null);
    const [replies, setReplies] = useState<any[]>([]);
    const [loading, setLoading] = useState(() => !getCachedMomentPreview(momentId));
    const [replying, setReplying] = useState(false);
    const [replyContent, setReplyContent] = useState('');
    const [pulseMenuAnchorEl, setPulseMenuAnchorEl] = useState<null | HTMLElement>(null);
    const [shareDrawerOpen, setShareDrawerOpen] = useState(false);
    const [exportingImage, setExportingImage] = useState(false);
    const [userAvatarUrl, setUserAvatarUrl] = useState<string | null>(null);
    const [threadAncestors, setThreadAncestors] = useState<any[]>([]);
    const [actorsDrawerOpen, setActorsDrawerOpen] = useState(false);
    const [actorsList, setActorsList] = useState<any[]>([]);
    const [actorsTitle, setActorsTitle] = useState('');
    const [expandedCaption, setExpandedCaption] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'), { noSsr: true });

    const fetchActorsForLikes = async (momentId: string) => {
        try {
            const interactions = await SocialService._listInteractionsFor(momentId, 'like');
            const actors = await Promise.all(interactions.map(async (i: any) => {
                try {
                    const p = await UsersService.getProfileById(i.userId);
                    let avatar = null;
                    if (p?.avatar) {
                        try { avatar = String(p.avatar).startsWith('http') ? p.avatar : await fetchProfilePreview(p.avatar, 64, 64) as unknown as string; } catch (_e) {}
                    }
                    return { $id: i.userId, username: p?.username, displayName: p?.displayName, avatar };
                } catch (_e) { return { $id: i.userId }; }
            }));
            return actors;
        } catch (e) {
            console.error('Failed to fetch like actors', e);
            return [];
        }
    };

    const fetchActorsForPulses = async (momentId: string) => {
        try {
            const pulses = await SocialService._listPulsesFor(momentId);
            const actors = await Promise.all(pulses.map(async (p: any) => {
                try {
                    const prof = await UsersService.getProfileById(p.userId);
                    let avatar = null;
                    if (prof?.avatar) {
                        try { avatar = String(prof.avatar).startsWith('http') ? prof.avatar : await fetchProfilePreview(prof.avatar, 64, 64) as unknown as string; } catch (_e) {}
                    }
                    return { $id: p.userId, username: prof?.username, displayName: prof?.displayName, avatar };
                } catch (_e) { return { $id: p.userId }; }
            }));
            return actors;
        } catch (e) {
            console.error('Failed to fetch pulse actors', e);
            return [];
        }
    };

    const openActorsList = async (title: string, fetcher: () => Promise<any[]>) => {
        setActorsTitle(title);
        setActorsDrawerOpen(true);
        setActorsList([]);
        const data = await fetcher();
        setActorsList(data);
    };

    const fetchUserAvatar = useCallback(async () => {
        const picId = getUserProfilePicId(user);
        if (picId) {
            try {
                const url = String(picId).startsWith('http') ? picId : await fetchProfilePreview(picId, 64, 64);
                setUserAvatarUrl(url as unknown as string);
            } catch (_e: unknown) {
                console.warn('Failed to fetch user avatar', _e);
            }
        }
    }, [user]);

    const loadMoment = useCallback(async () => {
        if (!momentId) return;
        if (!hasPreviewRef.current) setLoading(true);
        setThreadAncestors([]);
        try {
            const enrichMoment = async (data: any, depth = 0): Promise<any> => {
                seedMomentPreview(data);

                const creatorId = data.userId || data.creatorId;
                const creator = await UsersService.getProfileById(creatorId);

                let avatar = null;
                if (creator?.avatar) {
                    try {
                        avatar = String(creator.avatar).startsWith('http')
                            ? creator.avatar
                            : await fetchProfilePreview(creator.avatar, 64, 64) as unknown as string;
                    } catch (_e) {}
                }

                let sourceMoment = data.sourceMoment;
                if (data.metadata?.sourceId && depth < 8) {
                    try {
                        const source = await SocialService.getMomentById(data.metadata.sourceId, user?.$id);
                        sourceMoment = await enrichMoment(source, depth + 1);
                    } catch (_e: unknown) {
                        console.warn('Failed to resolve source moment in client', _e);
                    }
                }

                return { ...data, creator: { ...creator, avatar }, sourceMoment };
            };

            const enrichedMoment = await enrichMoment(data);
            setMoment(enrichedMoment);
            seedMomentPreview(enrichedMoment);
            seedIdentityCache(enrichedMoment.creator);
            const ancestors: any[] = [];
            let ancestorCursor = enrichedMoment.sourceMoment;
            while (ancestorCursor) {
                ancestors.unshift(ancestorCursor);
                ancestorCursor = ancestorCursor.sourceMoment;
            }
            setThreadAncestors(ancestors);

            // Fetch replies
            const replyData = await SocialService.getReplies(momentId, user?.$id);
            const enrichedReplies = await Promise.all(replyData.map(async (reply) => {
                const rCreatorId = reply.userId || reply.creatorId;
                const rCreator = await UsersService.getProfileById(rCreatorId);
                let rAvatar = null;
                if (rCreator?.avatar) {
                    try {
                        rAvatar = String(rCreator.avatar).startsWith('http')
                            ? rCreator.avatar
                            : await fetchProfilePreview(rCreator.avatar, 48, 48) as unknown as string;
                    } catch (_e: unknown) {}
                }
                const enrichedReply = { ...reply, creator: { ...rCreator, avatar: rAvatar } };
                seedMomentPreview(enrichedReply);
                seedIdentityCache(enrichedReply.creator);
                return enrichedReply;
            }));
            setReplies(enrichedReplies);

        } catch (_e: unknown) {
            console.error('Failed to load moment:', _e);
            toast.error('Moment not found');
            setThreadAncestors([]);
        } finally {
            setLoading(false);
        }
    }, [momentId, user]);

    useEffect(() => {
        loadMoment();
        if (user) fetchUserAvatar();
    }, [loadMoment, user, fetchUserAvatar]);

    const handleToggleLike = async (targetMoment?: any) => {
        if (!user) {
            toast.error('Please login to like this post');
            return;
        }
        const target = targetMoment || moment;
        if (!target) return;

        try {
            const creatorId = target.userId || target.creatorId;
            const contentSnippet = target.caption?.substring(0, 30);
            const { liked } = await SocialService.toggleLike(user.$id, target.$id, creatorId, contentSnippet);
            
            if (target.$id === moment?.$id) {
                setMoment((prev: any) => ({ 
                    ...prev, 
                    isLiked: liked,
                    stats: { ...prev.stats, likes: Math.max(0, (prev.stats?.likes || 0) + (liked ? 1 : -1)) }
                }));
            } else {
                setReplies((prev: any[]) => prev.map(r => r.$id === target.$id ? {
                    ...r,
                    isLiked: liked,
                    stats: { ...r.stats, likes: Math.max(0, (r.stats?.likes || 0) + (liked ? 1 : -1)) }
                } : r));
            }
        } catch (_e) {
            toast.error('Failed to update like');
        }
    };

    const handlePulse = async () => {
        if (!user) {
            toast.error('Please login to pulse this post');
            return;
        }
        if (!moment) return;
        try {
            await SocialService.createMoment(user.$id, '', 'pulse', [], 'public', undefined, undefined, moment.$id);
            toast.success('Pulsed to your feed');
            // optimistically mark pulsed on the current moment
            setMoment((prev: any) => prev ? ({ ...prev, isPulsed: true, stats: { ...prev.stats, pulses: (prev.stats?.pulses || 0) + 1 } }) : prev);
            setPulseMenuAnchorEl(null);
            // reload replies/related data in background
            loadMoment();
        } catch (_e) {
            toast.error('Failed to pulse');
        }
    };

    const handleQuote = () => {
        if (!user || !moment) return;
        setPulseMenuAnchorEl(null);
        // UI logic to switch to quote mode
        // For now, we scroll to the reply box and could potentially change its label/behavior
        const replyBox = document.getElementById('reply-box');
        if (replyBox) {
            replyBox.scrollIntoView({ behavior: 'smooth' });
            setReplyContent(`Quoting ${resolveIdentity(moment.creator, creatorId).handle}: `);
        }
    };

    const handleReply = async () => {
        if (!user || !moment || !replyContent.trim()) return;
        setReplying(true);
        try {
            await SocialService.createMoment(
                user.$id, 
                replyContent, 
                'reply', 
                [], 
                'public', 
                undefined, 
                undefined, 
                moment.$id
            );
            setReplyContent('');
            toast.success('Reply posted!');
            loadMoment(); // Refresh replies
        } catch (e) {
            console.error('Failed to post reply:', e);
            toast.error('Failed to post reply');
        } finally {
            setReplying(false);
        }
    };

    const handleCopyLink = () => {
        navigator.clipboard.writeText(window.location.href);
        toast.success('Link copied to clipboard');
    };

    const handleExportScreenshot = async () => {
        if (!moment) return;
        setExportingImage(true);
        try {
            const blob = await exportMomentAsImage(moment);
            const url = URL.createObjectURL(blob);
            const anchor = document.createElement('a');
            anchor.href = url;
            anchor.download = `kylrix-connect-${moment.$id}.png`;
            anchor.click();
            window.setTimeout(() => URL.revokeObjectURL(url), 2000);
            toast.success('Screenshot saved');
            setShareDrawerOpen(false);
        } catch (error) {
            console.error('Failed to export screenshot:', error);
            toast.error('Failed to export screenshot');
        } finally {
            setExportingImage(false);
        }
    };

    if (loading && !moment) return (
        <AppShell>
            <Box sx={{ maxWidth: 'sm', mx: 'auto', py: 4, px: 2 }}>
                <Stack spacing={2}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <Skeleton variant="rounded" width={40} height={40} sx={{ borderRadius: '12px', bgcolor: 'rgba(255,255,255,0.05)' }} />
                        <Box sx={{ flex: 1 }}>
                            <Skeleton width="30%" sx={{ bgcolor: 'rgba(255,255,255,0.05)' }} />
                            <Skeleton width="20%" sx={{ bgcolor: 'rgba(255,255,255,0.05)' }} />
                        </Box>
                    </Box>
                    <Skeleton variant="rounded" height={240} sx={{ borderRadius: '24px', bgcolor: 'rgba(255,255,255,0.05)' }} />
                    <Skeleton variant="rounded" height={120} sx={{ borderRadius: '24px', bgcolor: 'rgba(255,255,255,0.05)' }} />
                </Stack>
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
    const creatorId = moment.userId || moment.creatorId;
    const cachedCreator = getCachedIdentityById(creatorId);
    const resolvedCreator = resolveIdentity(moment.creator || cachedCreator, creatorId);
    const creatorName = isOwnPost ? (user?.name || 'You') : resolvedCreator.displayName;
    const creatorAvatar = isOwnPost ? userAvatarUrl : (moment.creator?.avatar || cachedCreator?.avatar);
    const captionIsLong = (moment?.caption || '').length > 280;

    return (
        <AppShell>
            <Container maxWidth="sm" sx={{ py: { xs: 0.5, sm: 1 } }}>
                {/* Public Access Banner */}
                {!user && (
                    <Alert 
                        severity="info" 
                        icon={<LogIn size={20} />}
                        action={
                            <Button color="inherit" size="small" onClick={login} sx={{ fontWeight: 800 }}>
                                LOGIN
                            </Button>
                        }
                        sx={{ 
                            mb: 2, 
                            borderRadius: '16px', 
                            bgcolor: 'rgba(99, 102, 241, 0.1)', 
                            color: '#6366F1',
                            border: '1px solid rgba(99, 102, 241, 0.2)',
                            '& .MuiAlert-icon': { color: '#6366F1' }
                        }}
                    >
                        You are viewing this post as a guest. Login to like or reply.
                    </Alert>
                )}

                {threadAncestors.length > 0 && (
                    <Stack spacing={1.25} sx={{ mb: 2 }}>
                        {threadAncestors.map((ancestor, index) => {
                            const ancestorId = ancestor.userId || ancestor.creatorId;
                            const resolvedAncestor = resolveIdentity(ancestor.creator, ancestorId);
                            return (
                                <Paper
                                    key={ancestor.$id}
                                    onClick={() => router.push(`/post/${ancestor.$id}`)}
                                    sx={{
                                        p: 2,
                                        borderRadius: '20px',
                                        bgcolor: 'rgba(255,255,255,0.02)',
                                        border: '1px solid rgba(255,255,255,0.05)',
                                        cursor: 'pointer',
                                        position: 'relative',
                                        overflow: 'hidden',
                                        '&:hover': { bgcolor: 'rgba(255,255,255,0.04)' }
                                    }}
                                >
                                    <Box sx={{ display: 'flex', gap: 1.5 }}>
                                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', pt: 0.25 }}>
                                            <Avatar
                                                src={ancestor.creator?.avatar}
                                                sx={{ width: 34, height: 34, borderRadius: '10px', bgcolor: 'rgba(255,255,255,0.05)' }}
                                            >
                                                {resolvedAncestor.displayName?.charAt(0).toUpperCase()}
                                            </Avatar>
                                            {index < threadAncestors.length - 1 && (
                                                <Box sx={{ width: '2px', flex: 1, minHeight: 24, bgcolor: 'rgba(255,255,255,0.12)', mt: 1 }} />
                                            )}
                                        </Box>
                                        <Box sx={{ flex: 1, minWidth: 0 }}>
                                            <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 0.5 }}>
                                                <Typography sx={{ fontWeight: 800, fontSize: '0.88rem' }}>
                                                    {resolvedAncestor.displayName}
                                                </Typography>
                                                <Typography variant="caption" sx={{ opacity: 0.35 }}>
                                                    {resolvedAncestor.handle}
                                                </Typography>
                                                <Typography variant="caption" sx={{ opacity: 0.28 }}>
                                                    · {format(new Date(ancestor.$createdAt || ancestor.createdAt), 'MMM d')}
                                                </Typography>
                                            </Stack>
                                            <FormattedText
                                                text={ancestor.caption}
                                                variant="body2"
                                                sx={{
                                                    color: 'rgba(255,255,255,0.78)',
                                                    fontSize: '0.95rem',
                                                    lineHeight: 1.55,
                                                    display: '-webkit-box',
                                                    WebkitLineClamp: 6,
                                                    WebkitBoxOrient: 'vertical',
                                                    overflow: 'hidden'
                                                }}
                                            />
                                        </Box>
                                    </Box>
                                </Paper>
                            );
                        })}
                    </Stack>
                )}

                <Card sx={{ 
                    borderRadius: '24px', 
                    bgcolor: '#161412', 
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                    overflow: 'visible',
                    position: 'relative',
                    '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: '1px',
                        background: 'rgba(255, 255, 255, 0.05)',
                        borderRadius: '24px 24px 0 0',
                    }
                }} elevation={0}>
                    <CardHeader
                        avatar={
                                <Avatar 
                                    onClick={(e) => { e.stopPropagation(); const username = resolveIdentityUsername(moment.creator || cachedCreator, creatorId); if (username) router.push(`/u/${username}`); }}
                                    src={creatorAvatar}
                                    sx={{ 
                                        width: 52, 
                                        height: 52, 
                                        bgcolor: isOwnPost ? '#F59E0B' : 'rgba(255, 255, 255, 0.05)',
                                        color: isOwnPost ? '#000' : 'text.secondary',
                                        borderRadius: '14px',
                                        fontWeight: 900,
                                        border: '1px solid rgba(255,255,255,0.1)',
                                        position: 'relative',
                                        zIndex: 1,
                                        boxShadow: '0 8px 16px rgba(0,0,0,0.3)',
                                        cursor: 'pointer'
                                    }}
                                >
                                    {creatorName.replace(/^@/, '').charAt(0).toUpperCase()}
                                </Avatar>
                        }
                        title={
                            <Typography sx={{ fontWeight: 900, fontSize: '1.2rem', color: isOwnPost ? '#F59E0B' : 'text.primary', fontFamily: 'var(--font-clash)', letterSpacing: '-0.01em' }}>
                                {creatorName}
                            </Typography>
                        }
                        subheader={
                            <Typography variant="caption" sx={{ opacity: 0.4, fontWeight: 700, fontFamily: 'var(--font-mono)', letterSpacing: '0.02em' }}>
                                {resolvedCreator.handle}
                            </Typography>
                        }
                        action={
                            <IconButton sx={{ color: 'rgba(255, 255, 255, 0.2)', '&:hover': { color: 'white', bgcolor: 'rgba(255,255,255,0.05)' } }}>
                                <MoreHorizontal size={20} />
                            </IconButton>
                        }
                    />

                    <CardContent sx={{ pt: 1, px: { xs: 2.5, sm: 4 }, pb: 4 }}>
                        <Box sx={{ mb: 4 }}>
                            <FormattedText 
                                text={moment.caption}
                                variant="h5"
                                sx={{ 
                                    lineHeight: 1.5, 
                                    fontSize: { xs: '1.25rem', sm: '1.5rem' }, 
                                    fontWeight: 500,
                                    color: 'rgba(255,255,255,0.95)',
                                    fontFamily: 'var(--font-satoshi)',
                                    letterSpacing: '-0.01em',
                                    display: expandedCaption ? 'block' : '-webkit-box',
                                    WebkitBoxOrient: 'vertical',
                                    WebkitLineClamp: expandedCaption ? undefined : 6,
                                    overflow: expandedCaption ? 'visible' : 'hidden'
                                }}
                            />
                            {captionIsLong && (
                                <Button
                                    size="small"
                                    onClick={() => setExpandedCaption((prev) => !prev)}
                                    sx={{ mt: 1, px: 0, fontWeight: 900, color: '#F59E0B', textTransform: 'none' }}
                                >
                                    {expandedCaption ? 'Show less' : 'Read more'}
                                </Button>
                            )}
                        </Box>

                        {moment.metadata?.attachments?.filter((a: any) => a.type === 'image' || a.type === 'video').length > 0 && (
                            <Box sx={{ mb: 4, borderRadius: '24px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)', bgcolor: 'rgba(0,0,0,0.2)' }}>
                                <Stack direction="row" spacing={1} sx={{ overflowX: 'auto', pb: 0.5, snapType: 'x mandatory' }}>
                                    {moment.metadata.attachments.filter((a: any) => a.type === 'image' || a.type === 'video').map((att: any, idx: number) => (
                                        <Box key={idx} sx={{ 
                                            minWidth: '100%', 
                                            height: { xs: 300, sm: 450 }, 
                                            bgcolor: 'rgba(255,255,255,0.01)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            position: 'relative',
                                            snapAlign: 'start'
                                        }}>
                                            <Box 
                                                component="img"
                                                src={SocialService.getMediaPreview(att.id, 1200, 800)} 
                                                alt="Attachment"
                                                sx={{ 
                                                    width: '100%',
                                                    height: '100%',
                                                    objectFit: 'contain'
                                                }}
                                            />
                                        </Box>
                                    ))}
                                </Stack>
                            </Box>
                        )}

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
                            {format(new Date(moment.$createdAt), 'h:mm a · MMM d, yyyy')} · Kylrix Connect
                        </Typography>

                        <Divider sx={{ borderColor: 'rgba(255,255,255,0.05)', my: 2 }} />
                        
                        <Stack direction="row" spacing={3} sx={{ py: 1 }}>
                            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', color: '#6366F1' }}>
                                <Typography sx={{ fontWeight: 900, fontSize: '1rem' }}>{moment.stats?.replies || 0}</Typography>
                                <Typography variant="caption" sx={{ opacity: 0.7, fontWeight: 900, letterSpacing: '0.05em' }}>REPLIES</Typography>
                            </Box>
                        <Box
                            onClick={(e) => { e.stopPropagation(); openActorsList('Pulsed by', async () => await fetchActorsForPulses(moment.$id)); }}
                            sx={{ display: 'flex', gap: 1, alignItems: 'center', color: '#10B981', cursor: 'pointer' }}
                        >
                            <Typography sx={{ fontWeight: 900 }}>{moment.stats?.pulses || 0}</Typography>
                            <Typography variant="caption" sx={{ opacity: 0.7, fontWeight: 900, letterSpacing: '0.05em' }}>PULSES</Typography>
                        </Box>
                            <Box
                                onClick={(e) => { e.stopPropagation(); openActorsList('Likes', async () => await fetchActorsForLikes(moment.$id)); }}
                                sx={{ display: 'flex', gap: 1, alignItems: 'center', color: '#F59E0B', cursor: 'pointer' }}
                            >
                                <Typography sx={{ fontWeight: 900 }}>{moment.stats?.likes || 0}</Typography>
                                <Typography variant="caption" sx={{ opacity: 0.7, fontWeight: 900, letterSpacing: '0.05em' }}>LIKES</Typography>
                            </Box>
                        </Stack>

                        <Divider sx={{ borderColor: 'rgba(255,255,255,0.05)', mt: 1, mb: 2 }} />

                        <Stack direction="row" justifyContent="space-around" sx={{ color: 'rgba(255,255,255,0.5)', py: 1 }}>
                            <Tooltip title="Reply">
                                <IconButton sx={{ '&:hover': { color: '#6366F1', bgcolor: alpha('#6366F1', 0.1) } }}>
                                    <MessageCircle size={24} strokeWidth={1.5} />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Pulse">
                            <IconButton 
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        // Open the pulse menu so user can choose Pulse / Unpulse / Quote
                                        setPulseMenuAnchorEl(e.currentTarget);
                                    }}
                                    onContextMenu={(e) => {
                                        e.preventDefault();
                                        setPulseMenuAnchorEl(e.currentTarget);
                                    }}
                                    sx={{ '&:hover': { color: '#10B981', bgcolor: alpha('#10B981', 0.1) } }}
                                >
                                    <Repeat2 size={24} strokeWidth={1.5} />
                                </IconButton>
                            </Tooltip>
                            
                            <Menu
                                anchorEl={pulseMenuAnchorEl}
                                open={Boolean(pulseMenuAnchorEl)}
                                onClose={() => setPulseMenuAnchorEl(null)}
                                PaperProps={{
                                    sx: {
                                        mt: 1,
                                        borderRadius: '16px',
                                        bgcolor: 'rgba(15, 15, 15, 0.95)',
                                        backdropFilter: 'blur(20px)',
                                        border: '1px solid rgba(255, 255, 255, 0.08)',
                                        minWidth: 180
                                    }
                                }}
                            >
                                <MenuItem 
                                    onClick={handlePulse}
                                    sx={{ gap: 1.5, py: 1.2, fontWeight: 700, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#10B981' }}
                                >
                                    <Repeat2 size={18} strokeWidth={2} /> Pulse Now
                                </MenuItem>
                                <MenuItem 
                                    onClick={handleQuote}
                                    sx={{ gap: 1.5, py: 1.2, fontWeight: 700, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}
                                >
                                    <Edit size={18} strokeWidth={2} style={{ opacity: 0.7 }} /> Quote Moment
                                </MenuItem>
                            </Menu>
                            <Tooltip title="Heart">
                                <IconButton 
                                    onClick={() => handleToggleLike()}
                                    sx={{ 
                                        color: moment.isLiked ? '#F59E0B' : 'inherit',
                                        '&:hover': { color: '#F59E0B', bgcolor: alpha('#F59E0B', 0.1) } 
                                    }}
                                >
                                    <Heart size={24} fill={moment.isLiked ? '#F59E0B' : 'none'} strokeWidth={1.5} />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Copy Link">
                                <IconButton onClick={handleCopyLink} sx={{ '&:hover': { color: '#6366F1', bgcolor: alpha('#6366F1', 0.1) } }}>
                                    <Link2 size={24} strokeWidth={1.5} />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Export / Share">
                                <IconButton onClick={() => setShareDrawerOpen(true)} sx={{ '&:hover': { color: '#6366F1', bgcolor: alpha('#6366F1', 0.1) } }}>
                                    <Send size={24} strokeWidth={1.5} />
                                </IconButton>
                            </Tooltip>
                        </Stack>
                        
                        <Divider sx={{ borderColor: 'rgba(255,255,255,0.05)', mt: 2 }} />
                    </CardContent>
                </Card>

                {user && (
                    <Box id="reply-box" sx={{ mt: 3, p: 2, bgcolor: '#161412', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)' }}>
                        <Stack direction="row" spacing={2}>
                            <Avatar src={userAvatarUrl || undefined} sx={{ width: 40, height: 40, borderRadius: '10px' }}>
                                {user.name?.charAt(0)}
                            </Avatar>
                            <TextField
                                fullWidth
                                placeholder="Post your reply"
                                variant="standard"
                                multiline
                                maxRows={10}
                                value={replyContent}
                                onChange={(e) => setReplyContent(e.target.value)}
                                InputProps={{
                                    disableUnderline: true,
                                    sx: { color: 'white', py: 1, fontSize: '1.1rem' },
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton 
                                                onClick={handleReply}
                                                disabled={!replyContent.trim() || replying}
                                                sx={{ 
                                                    bgcolor: '#F59E0B', 
                                                    color: 'black',
                                                    '&:hover': { bgcolor: alpha('#F59E0B', 0.8) },
                                                    '&.Mui-disabled': { bgcolor: 'rgba(245, 158, 11, 0.2)', color: 'rgba(0,0,0,0.3)' }
                                                }}
                                            >
                                                {replying ? <CircularProgress size={20} color="inherit" /> : <Send size={18} />}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                            />
                        </Stack>
                    </Box>
                )}

                <Drawer
                    anchor="bottom"
                    open={shareDrawerOpen}
                    onClose={() => setShareDrawerOpen(false)}
                    PaperProps={{
                        sx: {
                            bgcolor: '#161412',
                            borderTopLeftRadius: '28px',
                            borderTopRightRadius: '28px',
                            border: '1px solid rgba(255,255,255,0.06)',
                            backgroundImage: 'none',
                            maxWidth: 720,
                            mx: 'auto',
                            width: '100%',
                            pb: 'env(safe-area-inset-bottom)',
                        }
                    }}
                >
                    <Box sx={{ px: 2, pt: 1.5, pb: 2 }}>
                        <Box sx={{ width: 44, height: 4, borderRadius: 999, bgcolor: 'rgba(255,255,255,0.14)', mx: 'auto', mb: 2 }} />
                        <Typography variant="subtitle1" sx={{ fontWeight: 900, fontFamily: 'var(--font-clash)', mb: 0.5 }}>
                            Share post
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
                            Export this post as a branded PNG image.
                        </Typography>

                        <ListItemButton
                            onClick={handleExportScreenshot}
                            disabled={exportingImage}
                            sx={{
                                mb: 1,
                                borderRadius: '16px',
                                bgcolor: 'rgba(245, 158, 11, 0.08)',
                                border: '1px solid rgba(245, 158, 11, 0.14)',
                            }}
                        >
                            <ListItemIcon sx={{ color: '#F59E0B', minWidth: 40 }}>
                                {exportingImage ? <CircularProgress size={18} color="inherit" /> : <ImageIcon size={18} />}
                            </ListItemIcon>
                            <ListItemText
                                primary="Screenshot"
                                secondary="Download an image of this post thread"
                                primaryTypographyProps={{ fontWeight: 800 }}
                                secondaryTypographyProps={{ color: 'text.secondary' }}
                            />
                            <Download size={18} />
                        </ListItemButton>

                        <ListItemButton
                            onClick={() => { handleCopyLink(); setShareDrawerOpen(false); }}
                            sx={{
                                borderRadius: '16px',
                                bgcolor: 'rgba(255,255,255,0.03)',
                                border: '1px solid rgba(255,255,255,0.06)',
                            }}
                        >
                            <ListItemIcon sx={{ color: '#6366F1', minWidth: 40 }}>
                                <Link2 size={18} />
                            </ListItemIcon>
                            <ListItemText
                                primary="Copy link"
                                secondary="Share the direct URL instead"
                                primaryTypographyProps={{ fontWeight: 800 }}
                                secondaryTypographyProps={{ color: 'text.secondary' }}
                            />
                        </ListItemButton>
                    </Box>
                </Drawer>

                <Stack spacing={2} sx={{ mt: 4 }}>
                    {replies.map((reply) => {
                        const rCreatorId = reply.userId || reply.creatorId;
                        const rResolvedCreator = resolveIdentity(reply.creator, rCreatorId);
                        const rCreatorName = rResolvedCreator.displayName;
                        return (
                            <Box 
                                key={reply.$id} 
                                onClick={() => router.push(`/post/${reply.$id}`)}
                                sx={{ 
                                    display: 'flex', 
                                    gap: 2, 
                                    p: 2.5, 
                                    borderRadius: '20px',
                                    transition: 'all 0.2s ease',
                                    cursor: 'pointer',
                                    '&:hover': { bgcolor: 'rgba(255,255,255,0.02)' }
                                }}
                            >
                                <Avatar 
                                    src={reply.creator?.avatar} 
                                    sx={{ width: 42, height: 42, borderRadius: '12px', bgcolor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.05)' }}
                                >
                                    {rCreatorName.replace(/^@/, '').charAt(0).toUpperCase()}
                                </Avatar>
                                <Box sx={{ flex: 1 }}>
                                    <Stack direction="row" spacing={1} alignItems="center">
                                        <Typography sx={{ fontWeight: 800, fontSize: '0.95rem', color: 'white' }}>{rCreatorName}</Typography>
                                        <Typography variant="caption" sx={{ opacity: 0.3, fontFamily: 'var(--font-mono)' }}>{rResolvedCreator.handle}</Typography>
                                        <Typography variant="caption" sx={{ opacity: 0.3 }}>· {format(new Date(reply.$createdAt), 'MMM d')}</Typography>
                                    </Stack>
                                    <FormattedText 
                                        text={reply.caption}
                                        variant="body1"
                                        sx={{ mt: 0.8, color: 'rgba(255,255,255,0.85)', fontSize: '1rem', lineHeight: 1.6 }}
                                    />
                                    
                                    <Stack direction="row" spacing={4} sx={{ mt: 2, color: 'rgba(255,255,255,0.3)' }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
                                            <IconButton size="small" sx={{ p: 0.5, '&:hover': { color: '#6366F1', bgcolor: alpha('#6366F1', 0.1) } }}>
                                                <MessageCircle size={18} strokeWidth={1.5} />
                                            </IconButton>
                                            <Typography variant="caption" sx={{ fontWeight: 700 }}>{reply.stats?.replies || 0}</Typography>
                                        </Box>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
                                            <IconButton size="small" sx={{ p: 0.5, '&:hover': { color: '#10B981', bgcolor: alpha('#10B981', 0.1) } }}>
                                                <Repeat2 size={18} strokeWidth={1.5} />
                                            </IconButton>
                                            <Typography variant="caption" sx={{ fontWeight: 700 }}>{reply.stats?.pulses || 0}</Typography>
                                        </Box>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
                                            <IconButton 
                                                size="small" 
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleToggleLike(reply);
                                                }}
                                                sx={{ 
                                                    p: 0.5, 
                                                    color: reply.isLiked ? '#F59E0B' : 'inherit',
                                                    '&:hover': { color: '#F59E0B', bgcolor: alpha('#F59E0B', 0.1) } 
                                                }}
                                            >
                                                <Heart size={18} fill={reply.isLiked ? '#F59E0B' : 'none'} strokeWidth={1.5} />
                                            </IconButton>
                                            <Typography variant="caption" sx={{ fontWeight: 700 }}>{reply.stats?.likes || 0}</Typography>
                                        </Box>
                                    </Stack>
                                </Box>
                            </Box>
                        );
                    })}
                </Stack>
                <ActorsListDrawer
                    open={actorsDrawerOpen}
                    onClose={() => setActorsDrawerOpen(false)}
                    title={actorsTitle}
                    actors={actorsList}
                    mobile={isMobile}
                    onSelect={(actor) => { setActorsDrawerOpen(false); router.push(`/@${actor.username || actor.$id}`); }}
                />
            </Container>
        </AppShell>
    );
}
