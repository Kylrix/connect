'use client';

import React, { useState } from 'react';
import { 
    AppBar, 
    Toolbar, 
    Typography, 
    IconButton, 
    Box, 
    Paper, 
    InputBase, 
    useTheme, 
    alpha,
    Menu,
    MenuItem,
    Avatar,
    Divider
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AppsIcon from '@mui/icons-material/Apps';
import { ECOSYSTEM_APPS } from '@/lib/constants';
import { useAuth } from '@/lib/auth';
import EcosystemPortal from '../common/EcosystemPortal';

export const AppHeader = () => {
    const theme = useTheme();
    const { user, logout } = useAuth();
    const [isPortalOpen, setIsPortalOpen] = useState(false);
    const [accountAnchorEl, setAccountAnchorEl] = useState<null | HTMLElement>(null);

    React.useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.ctrlKey || e.metaKey) && e.code === 'Space') {
                e.preventDefault();
                setIsPortalOpen(prev => !prev);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    const handleAccountClick = (event: React.MouseEvent<HTMLElement>) => {
        setAccountAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAccountAnchorEl(null);
    };

    return (
        <AppBar 
            position="fixed" 
            sx={{ 
                zIndex: (theme) => theme.zIndex.drawer + 0.5,
                bgcolor: 'rgba(10, 10, 10, 0.8)',
                backdropFilter: 'blur(25px) saturate(180%)',
                borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                boxShadow: 'none',
                color: 'text.primary',
                backgroundImage: 'none'
            }} 
        >
            <Toolbar sx={{ justifyContent: 'space-between', minHeight: 72 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box sx={{ 
                        width: 38, 
                        height: 38, 
                        bgcolor: '#00F5FF', 
                        borderRadius: '10px', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        color: '#000',
                        fontWeight: 900
                    }}>
                        C
                    </Box>
                    <Typography variant="h6" noWrap component="div" sx={{ fontWeight: 900, fontFamily: 'var(--font-space-grotesk)', letterSpacing: '-0.05em', color: 'white' }}>
                        WHISPERR<Box component="span" sx={{ color: '#00F5FF' }}>CONNECT</Box>
                    </Typography>
                </Box>
                
                {/* Search */}
                <Paper
                    component="form"
                    sx={{ 
                        p: '2px 4px', 
                        display: { xs: 'none', md: 'flex' }, 
                        alignItems: 'center', 
                        width: 400,
                        bgcolor: 'rgba(255, 255, 255, 0.03)',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        borderRadius: '14px',
                        boxShadow: 'none',
                        '&:hover': {
                            bgcolor: 'rgba(255, 255, 255, 0.05)',
                            borderColor: 'rgba(255, 255, 255, 0.15)'
                        }
                    }}
                >
                    <InputBase
                        sx={{ ml: 2, flex: 1, color: 'white', fontSize: '0.9rem' }}
                        placeholder="Search messages, people, calls..."
                    />
                    <IconButton type="button" sx={{ p: '10px', color: 'rgba(255, 255, 255, 0.4)' }} aria-label="search">
                        <SearchIcon sx={{ fontSize: 20 }} />
                    </IconButton>
                </Paper>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    {/* Portal Toggle */}
                    <IconButton 
                        onClick={() => setIsPortalOpen(true)} 
                        sx={{ 
                            borderRadius: '12px',
                            color: '#00F5FF',
                            bgcolor: 'rgba(0, 245, 255, 0.05)',
                            border: '1px solid rgba(0, 245, 255, 0.1)',
                            '&:hover': { bgcolor: 'rgba(0, 245, 255, 0.1)', borderColor: '#00F5FF' }
                        }}
                    >
                        <AppsIcon sx={{ fontSize: 22 }} />
                    </IconButton>

                    {/* Account Menu Button */}
                    <IconButton onClick={handleAccountClick} sx={{ p: 0.5 }}>
                        <Avatar sx={{ width: 36, height: 36, bgcolor: '#00F5FF', color: '#000', fontSize: 14, fontWeight: 800, borderRadius: '10px' }}>
                            {user?.name?.charAt(0).toUpperCase() || 'U'}
                        </Avatar>
                    </IconButton>
                </Box>

                {/* Account Menu */}
                <Menu
                    anchorEl={accountAnchorEl}
                    open={Boolean(accountAnchorEl)}
                    onClose={handleClose}
                    PaperProps={{
                        elevation: 0,
                        sx: { 
                            width: 240, 
                            mt: 1.5, 
                            borderRadius: '20px',
                            bgcolor: 'rgba(10, 10, 10, 0.95)',
                            backdropFilter: 'blur(25px) saturate(180%)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            boxShadow: '0 20px 40px rgba(0,0,0,0.6)',
                            backgroundImage: 'none'
                        },
                    }}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                    <Box sx={{ px: 2.5, py: 2 }}>
                        <Typography variant="subtitle2" noWrap sx={{ fontWeight: 800, color: 'white' }}>
                            {user?.name || 'User'}
                        </Typography>
                        <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.4)' }} noWrap>
                            {user?.email}
                        </Typography>
                    </Box>
                    <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.05)' }} />
                    <MenuItem onClick={handleClose} sx={{ py: 1.5, px: 2.5, fontWeight: 600, color: 'white' }}>Profile</MenuItem>
                    <MenuItem 
                        onClick={() => {
                            window.location.href = `https://${process.env.NEXT_PUBLIC_AUTH_SUBDOMAIN || 'id'}.${process.env.NEXT_PUBLIC_DOMAIN || 'whisperrnote.space'}/settings?source=${encodeURIComponent(window.location.origin)}`;
                            handleClose();
                        }}
                        sx={{ py: 1.5, px: 2.5, fontWeight: 600, color: 'white' }}
                    >
                        Settings
                    </MenuItem>
                    <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.05)' }} />
                    <MenuItem onClick={() => logout()} sx={{ py: 1.5, px: 2.5, color: '#FF4D4D', fontWeight: 800 }}>Logout</MenuItem>
                </Menu>

                <EcosystemPortal 
                    open={isPortalOpen} 
                    onClose={() => setIsPortalOpen(false)} 
                />
            </Toolbar>
        </AppBar>
    );
};

