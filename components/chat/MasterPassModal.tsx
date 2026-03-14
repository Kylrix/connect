'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    IconButton,
    Typography,
    Box,
    Stack,
    CircularProgress,
    Paper,
    alpha,
    useTheme
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOffOutlined';
import LockIcon from '@mui/icons-material/LockOutlined';
import AppsIcon from '@mui/icons-material/Apps';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import LogoutIcon from '@mui/icons-material/LogoutOutlined';
import ShieldIcon from '@mui/icons-material/ShieldOutlined';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { ecosystemSecurity } from '@/lib/ecosystem/security';
import { KeychainService } from '@/lib/appwrite/keychain';
import { useAuth } from '@/lib/auth';
import { unlockWithPasskey } from '@/lib/passkey';
import { PasskeySetup } from '@/components/overlays/PasskeySetup';
import toast from 'react-hot-toast';

interface MasterPassModalProps {
    open: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

export const MasterPassModal = ({ open, onClose, onSuccess }: MasterPassModalProps) => {
    const theme = useTheme();
    const router = useRouter();
    const { user, logout } = useAuth();
    
    const [masterPassword, setMasterPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    
    const [pin, setPin] = useState('');
    const [loading, setLoading] = useState(false);
    const [isFirstTime, setIsFirstTime] = useState<boolean | null>(null);
    const [mode, setMode] = useState<'password' | 'pin' | 'passkey' | 'initialize' | null>(null);
    
    const [hasPin, setHasPin] = useState(false);
    const [hasPasskey, setHasPasskey] = useState(false);
    const [showPasskeyIncentive, setShowPasskeyIncentive] = useState(false);
    const [capsLock, setCapsLock] = useState(false);

    const handleSuccessWithSync = useCallback(async () => {
        if (user?.$id) {
            try {
                // Sudo Hook: Ensure E2E Identity is created and published upon successful MasterPass unlock
                console.log("[Connect] Synchronizing Identity...");
                await ecosystemSecurity.ensureE2EIdentity(user.$id);
            } catch (e) {
                console.error("[Connect] Failed to sync identity on unlock", e);
            }
        }
        onSuccess();
        onClose();
    }, [user?.$id, onSuccess, onClose]);

    const handlePasskeyUnlock = useCallback(async () => {
        if (!user?.$id || !open) return;
        setLoading(true);
        try {
            const success = await unlockWithPasskey(user.$id);
            if (success && open) {
                toast.success("Identity verified via Passkey");
                handleSuccessWithSync();
            }
        } catch (e) {
            console.error("[Connect] Passkey unlock failed or cancelled", e);
        } finally {
            setLoading(false);
        }
    }, [user?.$id, open, handleSuccessWithSync]);

    useEffect(() => {
        if (!user || !open) return;
        setLoading(true);

        const pinSet = ecosystemSecurity.isPinSet();
        setHasPin(pinSet);

        // Check for keychain entries to determine mode
        KeychainService.listKeychainEntries(user.$id)
            .then((entries) => {
                const passkeyPresent = entries.some((e: any) => e.type === 'passkey');
                const passwordPresent = entries.some((e: any) => e.type === 'password');

                setHasPasskey(passkeyPresent);
                setIsFirstTime(!passwordPresent);

                if (!passwordPresent) {
                    setMode("initialize");
                } else if (passkeyPresent) {
                    setMode("passkey");
                    handlePasskeyUnlock();
                } else if (pinSet) {
                    setMode("pin");
                } else {
                    setMode("password");
                }
            })
            .catch(() => {
                setIsFirstTime(true);
                setMode("initialize");
            })
            .finally(() => {
                setLoading(false);
            });

        // Reset state on open
        setMasterPassword("");
        setConfirmPassword("");
        setPin("");
    }, [user, open, handlePasskeyUnlock]);

    const handlePinChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value.replace(/[^0-9]/g, "");
        setPin(val);
        if (val.length === 4 && user?.$id) {
            setLoading(true);
            try {
                const success = await ecosystemSecurity.unlockWithPin(val);
                if (success) {
                    handleSuccessWithSync();
                } else {
                    toast.error("Invalid PIN");
                    setPin("");
                }
            } catch (_e: unknown) {
                toast.error("Verification failed");
                setPin("");
            } finally {
                setLoading(false);
            }
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user?.$id || loading) return;
        setLoading(true);

        try {
            if (mode === "initialize" || isFirstTime) {
                if (masterPassword !== confirmPassword) {
                    toast.error("Passwords don't match");
                    setLoading(false);
                    return;
                }
                if (masterPassword.length < 8) {
                    toast.error("Master password must be at least 8 characters");
                    setLoading(false);
                    return;
                }

                // Initialize: Generate new MEK and wrap it
                const mek = await ecosystemSecurity.generateRandomMEK();
                const salt = crypto.getRandomValues(new Uint8Array(32));
                const wrappedKey = await ecosystemSecurity.wrapMEK(mek, masterPassword, salt);
                
                await KeychainService.createKeychainEntry({
                    userId: user.$id,
                    type: 'password',
                    wrappedKey,
                    salt: btoa(String.fromCharCode(...salt)),
                    params: JSON.stringify({ iterations: 600000, algo: 'SHA-256' }),
                    isBackup: false
                });

                // Set local MEK in ecosystemSecurity
                const rawMek = await crypto.subtle.exportKey("raw", mek);
                await ecosystemSecurity.importMasterKey(rawMek);
                
                // Track flag
                await ecosystemSecurity.setMasterpassFlag(user.$id, user.email || '');

                    const skipTimestamp = localStorage.getItem(
                        `passkey_skip_${user.$id}`
                    );
                    const sevenDays = 7 * 24 * 60 * 60 * 1000;
                    const shouldShowIncentive =
                        !hasPasskey &&
                        (!skipTimestamp ||
                            Date.now() - parseInt(skipTimestamp) > sevenDays);

                    if (shouldShowIncentive) {
                        setShowPasskeyIncentive(true);
                    } else {
                        handleSuccessWithSync();
                    }
            } else {
                // Unlock
                const entries = await KeychainService.listKeychainEntries(user.$id);
                const passwordEntry = entries.find((e: any) => e.type === 'password');

                if (!passwordEntry) {
                    toast.error("No master password found");
                    setMode("initialize");
                    setLoading(false);
                    return;
                }

                const success = await ecosystemSecurity.unlock(masterPassword, passwordEntry);
                if (success) {
                    if (!hasPasskey) {
                        setShowPasskeyIncentive(true);
                    } else {
                        handleSuccessWithSync();
                    }
                } else {
                    toast.error("Incorrect master password. Please try again.");
                }
            }
        } catch (err: unknown) {
            console.error("[Connect] MasterPass operation failed:", err);
            toast.error("Operation failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        setLoading(true);
        await logout();
        setLoading(false);
        onClose();
        router.replace("/");
    };

    if (!user || !open) return null;

    if (showPasskeyIncentive) {
        return (
            <PasskeySetup
                isOpen={true}
                onClose={handleSuccessWithSync}
                userId={user.$id}
                onSuccess={handleSuccessWithSync}
                trustUnlocked={true}
            />
        );
    }

    return (
        <Dialog
            open={open}
            onClose={() => { }} // Prevent closing by clicking outside
            PaperProps={{
                sx: {
                    borderRadius: '32px',
                    bgcolor: 'rgba(10, 10, 10, 0.9)',
                    backdropFilter: 'blur(25px) saturate(180%)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    backgroundImage: 'none',
                    width: '100%',
                    maxWidth: '440px',
                    overflow: 'visible'
                }
            }}
        >
            <Box sx={{ position: 'absolute', top: -32, left: '50%', transform: 'translateX(-50%)' }}>
                <Paper sx={{
                    width: 64,
                    height: 64,
                    borderRadius: '18px',
                    bgcolor: 'primary.main',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: (t) => `0 8px 32px ${alpha(t.palette.primary.main, 0.3)}`,
                    color: 'black'
                }}>
                    <LockIcon sx={{ fontSize: 32 }} />
                </Paper>
            </Box>

            <DialogTitle sx={{ textAlign: 'center', pt: 5, pb: 1 }}>
                <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 800, color: 'primary.main' }}>
                        {user.name || user.email}
                    </Typography>
                </Box>
                <Typography variant="h4" sx={{ fontWeight: 900, fontFamily: 'var(--font-space-grotesk)', letterSpacing: '-0.02em' }}>
                    {isFirstTime ? "Set Master Password" : "Unlock Vault"}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1, fontWeight: 500 }}>
                    {isFirstTime
                        ? "Create a master password to encrypt your data"
                        : "Enter your master password to access encrypted data"}
                </Typography>
            </DialogTitle>

            <DialogContent sx={{ mt: 2 }}>
                {isFirstTime === null || (loading && !masterPassword && mode !== "pin") ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                        <CircularProgress color="primary" />
                    </Box>
                ) : mode === "pin" ? (
                    <Stack spacing={3} sx={{ mt: 2 }}>
                        <Box>
                            <Typography variant="caption" sx={{ fontWeight: 700, mb: 1, display: 'block', textAlign: 'center' }}>
                                ENTER 4-DIGIT PIN
                            </Typography>
                            <TextField
                                fullWidth
                                type="password"
                                placeholder="••••"
                                value={pin}
                                onChange={handlePinChange}
                                autoFocus
                                inputProps={{
                                    maxLength: 4,
                                    inputMode: 'numeric',
                                    style: { textAlign: 'center', fontSize: '2rem', letterSpacing: '0.5em' }
                                }}
                                variant="filled"
                                InputProps={{
                                    disableUnderline: true,
                                    sx: { borderRadius: '16px', bgcolor: 'rgba(255, 255, 255, 0.05)' }
                                }}
                            />
                        </Box>

                        <Box sx={{ width: '100%', position: 'relative', py: 1 }}>
                            <Box sx={{ position: 'absolute', top: '50%', left: 0, right: 0, height: '1px', bgcolor: 'rgba(255, 255, 255, 0.1)' }} />
                            <Typography variant="caption" sx={{
                                position: 'relative',
                                bgcolor: 'rgb(24, 24, 24)',
                                px: 2,
                                mx: 'auto',
                                display: 'table',
                                color: 'text.secondary',
                                textTransform: 'uppercase',
                                letterSpacing: '0.1em'
                            }}>
                                Or
                            </Typography>
                        </Box>

                        <Button
                            fullWidth
                            variant="text"
                            size="small"
                            onClick={() => setMode("password")}
                            sx={{ color: 'text.secondary', '&:hover': { color: 'white' } }}
                        >
                            Use Master Password
                        </Button>
                    </Stack>
                ) : (
                    <Stack spacing={3} component="form" onSubmit={handleSubmit}>
                        <Box>
                            <Typography variant="caption" sx={{ fontWeight: 700, mb: 1, display: 'block', ml: 1 }}>
                                {isFirstTime ? "CREATE MASTER PASSWORD" : "MASTER PASSWORD"}
                            </Typography>
                            <TextField
                                fullWidth
                                type={showPassword ? "text" : "password"}
                                placeholder={isFirstTime ? "Create a strong master password" : "Enter your master password"}
                                value={masterPassword}
                                onChange={(e) => setMasterPassword(e.target.value)}
                                required
                                autoFocus
                                variant="filled"
                                onKeyDown={(e) => {
                                    if ("getModifierState" in e && (e as React.KeyboardEvent).getModifierState("CapsLock")) {
                                        setCapsLock(true);
                                    } else {
                                        setCapsLock(false);
                                    }
                                }}
                                InputProps={{
                                    disableUnderline: true,
                                    sx: { borderRadius: '16px', bgcolor: 'rgba(255, 255, 255, 0.05)' },
                                    endAdornment: (
                                        <IconButton onClick={() => setShowPassword(!showPassword)} edge="end" sx={{ color: 'text.secondary' }}>
                                            {showPassword ? <VisibilityOffIcon sx={{ fontSize: 18 }} /> : <VisibilityIcon sx={{ fontSize: 18 }} />}
                                        </IconButton>
                                    )
                                }}
                            />
                            {capsLock && (
                                <Typography variant="caption" sx={{ color: 'warning.main', mt: 1, display: 'flex', alignItems: 'center', gap: 0.5, ml: 1 }}>
                                    <ErrorOutlineIcon sx={{ fontSize: 12 }} /> Caps Lock is ON
                                </Typography>
                            )}
                        </Box>

                        {isFirstTime && (
                            <Box>
                                <Typography variant="caption" sx={{ fontWeight: 700, mb: 1, display: 'block', ml: 1 }}>
                                    CONFIRM MASTER PASSWORD
                                </Typography>
                                <TextField
                                    fullWidth
                                    type={showConfirmPassword ? "text" : "password"}
                                    placeholder="Confirm your master password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                    variant="filled"
                                    InputProps={{
                                        disableUnderline: true,
                                        sx: { borderRadius: '16px', bgcolor: 'rgba(255, 255, 255, 0.05)' },
                                        endAdornment: (
                                            <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} edge="end" sx={{ color: 'text.secondary' }}>
                                                {showConfirmPassword ? <VisibilityOffIcon sx={{ fontSize: 18 }} /> : <VisibilityIcon sx={{ fontSize: 18 }} />}
                                            </IconButton>
                                        )
                                    }}
                                />
                                {confirmPassword.length > 0 && (
                                    <Typography variant="caption" sx={{ color: confirmPassword === masterPassword ? 'success.main' : 'error.main', mt: 1, display: 'block', ml: 1 }}>
                                        {confirmPassword === masterPassword ? "✓ Passwords match" : "✗ Passwords do not match"}
                                    </Typography>
                                )}
                            </Box>
                        )}

                        {isFirstTime && (
                            <Paper sx={{
                                p: 2,
                                borderRadius: '16px',
                                bgcolor: alpha(theme.palette.info.main, 0.05),
                                border: `1px solid ${alpha(theme.palette.info.main, 0.2)}`,
                                display: 'flex',
                                gap: 1.5
                            }}>
                                <ShieldIcon sx={{ fontSize: 20, color: theme.palette.info.main, flexShrink: 0 }} />
                                <Typography variant="caption" sx={{ color: 'info.main', fontWeight: 500 }}>
                                    <strong>Important:</strong> Your master password encrypts all your data locally. We cannot recover it if you forget it.
                                </Typography>
                            </Paper>
                        )}

                        <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            disabled={loading}
                            sx={{ borderRadius: '16px', py: 1.5, fontWeight: 800, fontSize: '1rem' }}
                        >
                            {loading ? <CircularProgress size={24} color="inherit" /> : (isFirstTime ? "Set Master Password" : "Unlock Vault")}
                        </Button>
                    </Stack>
                )}
            </DialogContent>

            <DialogActions sx={{ flexDirection: 'column', p: 4, pt: 0, gap: 2 }}>
                {mode !== "password" && mode !== "initialize" && (
                    <Button
                        variant="text"
                        fullWidth
                        onClick={() => setMode("password")}
                        sx={{
                            borderRadius: '16px',
                            py: 1,
                            fontWeight: 700,
                            color: 'text.secondary'
                        }}
                    >
                        Use Master Password
                    </Button>
                )}

                {!isFirstTime && (
                    <Button
                        variant="text"
                        fullWidth
                        onClick={() => window.open("https://vault.kylrix.space/masterpass/reset", "_blank")}
                        sx={{
                            borderRadius: '16px',
                            py: 1,
                            fontWeight: 700,
                            color: 'error.main',
                            '&:hover': { bgcolor: alpha(theme.palette.error.main, 0.1) }
                        }}
                    >
                        Reset Master Password
                    </Button>
                )}

                {!isFirstTime && hasPin && mode !== "pin" && (
                    <Button
                        variant="outlined"
                        fullWidth
                        onClick={() => setMode("pin")}
                        sx={{
                            borderRadius: '16px',
                            py: 1.5,
                            fontWeight: 700,
                            bgcolor: 'rgba(255, 255, 255, 0.02)',
                            borderColor: 'rgba(255, 255, 255, 0.1)',
                            '&:hover': {
                                bgcolor: 'rgba(255, 255, 255, 0.05)',
                                borderColor: 'primary.main'
                            }
                        }}
                    >
                        Unlock with PIN
                    </Button>
                )}

                {!isFirstTime && hasPasskey && mode !== "passkey" && (
                    <Button
                        variant="outlined"
                        fullWidth
                        onClick={handlePasskeyUnlock}
                        disabled={loading}
                        startIcon={loading ? <CircularProgress size={18} color="inherit" /> : <FingerprintIcon sx={{ fontSize: 18 }} />}
                        sx={{
                            borderRadius: '16px',
                            py: 1.5,
                            fontWeight: 700,
                            bgcolor: 'rgba(255, 255, 255, 0.02)',
                            borderColor: 'rgba(255, 255, 255, 0.1)',
                            '&:hover': {
                                bgcolor: 'rgba(255, 255, 255, 0.05)',
                                borderColor: 'primary.main'
                            }
                        }}
                    >
                        Unlock with Passkey
                    </Button>
                )}

                <Button
                    variant="text"
                    size="small"
                    onClick={handleLogout}
                    startIcon={<LogoutIcon sx={{ fontSize: 14 }} />}
                    sx={{ color: 'text.secondary', fontWeight: 600 }}
                >
                    Logout from Account
                </Button>
            </DialogActions>
        </Dialog>
    );
};
