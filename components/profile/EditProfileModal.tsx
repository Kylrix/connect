'use client';

import React, { useState, useEffect } from 'react';
import { 
    Dialog, 
    DialogTitle, 
    DialogContent, 
    DialogActions, 
    Button, 
    TextField, 
    Box, 
    Typography,
    CircularProgress,
    InputAdornment
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import { UsersService } from '@/lib/services/users';
import { account } from '@/lib/appwrite/client';
import PersonIcon from '@mui/icons-material/PersonOutlined';
import { alpha } from '@mui/material/styles';
import DescriptionIcon from '@mui/icons-material/DescriptionOutlined';
import { NoteSelectorModal } from '../chat/NoteSelectorModal';
import { EcosystemService } from '@/lib/services/ecosystem';
import { FormControlLabel, Checkbox, IconButton, Tooltip } from '@mui/material';
import SyncIcon from '@mui/icons-material/SyncOutlined';
import { getUserProfilePicId } from '@/lib/user-utils';
import { useAuth } from '@/lib/auth';

interface EditProfileModalProps {
    open: boolean;
    onClose: () => void;
    profile: any;
    onUpdate: () => void;
}

export const EditProfileModal = ({ open, onClose, profile, onUpdate }: EditProfileModalProps) => {
    const { user: authUser } = useAuth();
    const [username, setUsername] = useState(profile?.username || '');
    const [bio, setBio] = useState(profile?.bio || '');
    const [displayName, setDisplayName] = useState(profile?.displayName || '');
    const [avatarFileId, setAvatarFileId] = useState(profile?.avatarFileId || profile?.profilePicId || '');
    const [isChecking, setIsChecking] = useState(false);
    const [isAvailable, setIsAvailable] = useState<boolean | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [isNoteSelectorOpen, setIsNoteSelectorOpen] = useState(false);
    const [saveToNote, setSaveToNote] = useState(false);

    useEffect(() => {
        if (profile) {
            setUsername(profile.username || '');
            setBio(profile.bio || '');
            setDisplayName(profile.displayName || '');
            setAvatarFileId(profile.avatarFileId || profile.profilePicId || '');
        }
    }, [profile, open]);

    const handleSyncAvatar = async () => {
        if (!authUser) return;
        try {
            const picId = getUserProfilePicId(authUser);
            if (picId) {
                setAvatarFileId(picId);
            } else {
                const prefs = await account.getPrefs();
                const prefPicId = prefs?.profilePicId || prefs?.avatarFileId;
                if (prefPicId) setAvatarFileId(prefPicId);
            }
        } catch (e) {
            console.warn('Manual avatar sync failed', e);
        }
    };

    const handleNoteSelect = (note: any) => {
        if (note.content) {
            setBio(note.content);
        } else if (note.title) {
            setBio(note.title);
        }
    };

    const handleSave = async () => {
        if (!profile?.$id) return;
        
        if (username !== profile.username && isAvailable === false) {
            setError('Please pick an available username');
            return;
        }

        setLoading(true);
        setError('');
        try {
            // Only send fields that actually changed or are definitely supported
            const updateData: any = {
                bio: bio.trim(),
                displayName: displayName.trim(),
                username: username.toLowerCase().trim(),
                avatarFileId: avatarFileId.trim()
            };

            await UsersService.updateProfile(profile.$id, updateData);

            // Optional: Save bio to a new note in Whisperrnote
            if (saveToNote && bio.trim()) {
                try {
                    await EcosystemService.createNote(
                        profile.$id, 
                        `Bio Sync - ${new Date().toLocaleDateString()}`, 
                        bio.trim()
                    );
                } catch (noteErr) {
                    console.warn('Failed to save bio to note:', noteErr);
                }
            }

            // Update global account name and username preference for ecosystem coherence
            try {
                if (displayName || username) {
                    if (displayName) await account.updateName(displayName);
                    const currentPrefs = await account.getPrefs();
                    await account.updatePrefs({
                        ...currentPrefs,
                        username: username.toLowerCase().trim(),
                        bio: bio.trim() // Also store bio in prefs for topbar-like instant fetching
                    });
                }
            } catch (prefErr) {
                console.warn('Failed to sync display name or username to account prefs', prefErr);
            }

            onUpdate();
            onClose();
        } catch (err: any) {
            console.error('Profile update failed:', err);
            setError(err.message || 'Failed to update profile');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
        <Dialog 
            open={open} 
            onClose={onClose} 
            fullWidth 
            maxWidth="sm"
            PaperProps={{
                sx: {
                    borderRadius: '24px',
                    bgcolor: 'rgba(15, 15, 15, 0.95)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    backgroundImage: 'none',
                    color: 'white'
                }
            }}
        >
            <DialogTitle sx={{ textAlign: 'center', pt: 4 }}>
                <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    mb: 2 
                }}>
                    <Box sx={{ 
                        p: 1.5, 
                        bgcolor: 'primary.main', 
                        borderRadius: '12px',
                        color: 'black'
                    }}>
                        <PersonIcon />
                    </Box>
                </Box>
                <Typography variant="h5" sx={{ fontWeight: 800, fontFamily: 'var(--font-space-grotesk)' }}>
                    Edit Profile
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
                    Customize your presence in the ecosystem
                </Typography>
            </DialogTitle>

            <DialogContent sx={{ border: 'none' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, pt: 1 }}>
                    <TextField
                        label="Username"
                        fullWidth
                        variant="filled"
                        value={username}
                        onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ''))}
                        error={isAvailable === false && username !== profile?.username}
                        helperText={
                            isAvailable === false && username !== profile?.username 
                            ? 'Username is already taken' 
                            : 'Only letters, numbers, and underscores allowed'
                        }
                        InputProps={{
                            disableUnderline: true,
                            startAdornment: <InputAdornment position="start" sx={{ color: 'primary.main', fontWeight: 800 }}>@</InputAdornment>,
                            sx: { 
                                borderRadius: '12px', 
                                bgcolor: 'rgba(255, 255, 255, 0.05)',
                                '&.Mui-focused': { bgcolor: 'rgba(255, 255, 255, 0.08)' }
                            },
                            endAdornment: (
                                <InputAdornment position="end">
                                    {isChecking && <CircularProgress size={20} />}
                                    {!isChecking && isAvailable === true && username !== profile?.username && <CheckCircleIcon color="success" sx={{ fontSize: 20 }} />}
                                    {!isChecking && isAvailable === false && username !== profile?.username && <ErrorIcon color="error" sx={{ fontSize: 20 }} />}
                                </InputAdornment>
                            )
                        }}
                        InputLabelProps={{ sx: { color: 'rgba(255,255,255,0.5)' } }}
                    />

                    <TextField
                        label="Display Name"
                        fullWidth
                        variant="filled"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        InputProps={{
                            disableUnderline: true,
                            sx: { 
                                borderRadius: '12px', 
                                bgcolor: 'rgba(255, 255, 255, 0.05)',
                                '&.Mui-focused': { bgcolor: 'rgba(255, 255, 255, 0.08)' }
                            }
                        }}
                        InputLabelProps={{ sx: { color: 'rgba(255,255,255,0.5)' } }}
                    />

                    <TextField
                        label="Avatar File ID"
                        fullWidth
                        variant="filled"
                        value={avatarFileId}
                        onChange={(e) => setAvatarFileId(e.target.value)}
                        placeholder="Sync ID from Whisperr ID account..."
                        InputProps={{
                            disableUnderline: true,
                            sx: { 
                                borderRadius: '12px', 
                                bgcolor: 'rgba(255, 255, 255, 0.05)',
                                '&.Mui-focused': { bgcolor: 'rgba(255, 255, 255, 0.08)' }
                            },
                            endAdornment: (
                                <InputAdornment position="end">
                                    <Tooltip title="Sync with Account Preferences">
                                        <IconButton onClick={handleSyncAvatar} sx={{ color: 'primary.main' }}>
                                            <SyncIcon />
                                        </IconButton>
                                    </Tooltip>
                                </InputAdornment>
                            )
                        }}
                        InputLabelProps={{ sx: { color: 'rgba(255,255,255,0.5)' } }}
                        helperText="The profile picture ID from your Whisperr ID account"
                    />

                    <Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                            <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)', fontWeight: 600 }}>BIO</Typography>
                            <Button 
                                size="small" 
                                startIcon={<DescriptionIcon />} 
                                onClick={() => setIsNoteSelectorOpen(true)}
                                sx={{ 
                                    textTransform: 'none', 
                                    fontSize: '0.75rem', 
                                    borderRadius: '8px',
                                    color: 'primary.main',
                                    '&:hover': { bgcolor: alpha('#00F0FF', 0.1) }
                                }}
                            >
                                Fill from Note
                            </Button>
                        </Box>
                        <TextField
                            fullWidth
                            multiline
                            rows={3}
                            variant="filled"
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                            placeholder="Tell the world about yourself..."
                            InputProps={{
                                disableUnderline: true,
                                sx: { 
                                    borderRadius: '12px', 
                                    bgcolor: 'rgba(255, 255, 255, 0.05)',
                                    '&.Mui-focused': { bgcolor: 'rgba(255, 255, 255, 0.08)' }
                                }
                            }}
                        />
                        <FormControlLabel
                            control={
                                <Checkbox 
                                    size="small" 
                                    checked={saveToNote} 
                                    onChange={(e) => setSaveToNote(e.target.checked)} 
                                    sx={{ color: 'rgba(255,255,255,0.3)', '&.Mui-checked': { color: 'primary.main' } }}
                                />
                            }
                            label={<Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)' }}>Save bio back to a new note</Typography>}
                            sx={{ mt: 0.5, ml: 0 }}
                        />
                    </Box>
                </Box>
                {error && (
                    <Typography color="error" variant="caption" sx={{ mt: 2, display: 'block', fontWeight: 600 }}>
                        {error}
                    </Typography>
                )}
            </DialogContent>
            
            <DialogActions sx={{ p: 3, gap: 1 }}>
                <Button 
                    onClick={onClose} 
                    disabled={loading}
                    sx={{ color: 'text.secondary', fontWeight: 600 }}
                >
                    Cancel
                </Button>
                <Button 
                    variant="contained" 
                    onClick={handleSave} 
                    disabled={loading || (isAvailable === false && username !== profile?.username)}
                    sx={{ 
                        borderRadius: '12px', 
                        px: 4, 
                        py: 1, 
                        fontWeight: 800,
                        bgcolor: 'primary.main',
                        color: 'black',
                        boxShadow: 'none',
                        '&:hover': { 
                            bgcolor: alpha('#00F0FF', 0.8),
                            boxShadow: '0 0 20px rgba(0, 240, 255, 0.3)'
                        }
                    }}
                >
                    {loading ? <CircularProgress size={24} color="inherit" /> : 'Save Changes'}
                </Button>
            </DialogActions>
        </Dialog>

        <NoteSelectorModal 
            open={isNoteSelectorOpen}
            onClose={() => setIsNoteSelectorOpen(false)}
            onSelect={handleNoteSelect}
        />
        </>
    );
};
