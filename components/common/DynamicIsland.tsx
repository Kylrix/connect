'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode, useRef } from 'react';
import {
  Box,
  Typography,
  useTheme,
  useMediaQuery,
  Button,
  Paper,
  TextField,
  List,
  ListItemButton,
  ListItemAvatar,
  Avatar,
  Divider,
  alpha,
} from '@mui/material';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import { useSudo } from '@/context/SudoContext';
import { useAppChrome } from '@/components/providers/AppChromeProvider';
import { ChatService } from '@/lib/services/chat';
import { UsersService } from '@/lib/services/users';
import { ecosystemSecurity } from '@/lib/ecosystem/security';
import { ECOSYSTEM_APPS, getEcosystemUrl } from '@/lib/constants';
import { seedIdentityCache } from '@/lib/identity-cache';
import toast from 'react-hot-toast';
import { 
  CheckCircle as SuccessIcon, 
  Error as ErrorIcon, 
  Info as InfoIcon, 
  Warning as WarningIcon, 
  Star as ProIcon,
  EmojiObjects as IdeaIcon,
  Message as ConnectIcon,
} from '@mui/icons-material';
import {
  Search as SearchIcon,
  Sparkles as SparklesIcon,
  ArrowRight as ArrowRightIcon,
  X as CloseIcon,
  MessageCircle as MessageCircleIcon,
  Phone as PhoneIcon,
  Settings as SettingsIcon,
} from 'lucide-react';

export type IslandType = 'success' | 'error' | 'warning' | 'info' | 'pro' | 'system' | 'suggestion' | 'connect';

export type KylrixApp = 'root' | 'vault' | 'flow' | 'note' | 'connect';

export interface IslandNotification {
  id: string;
  type: IslandType;
  title: string;
  message?: string;
  app?: KylrixApp;
  action?: {
    label: string;
    onClick: () => void;
  };
  duration?: number;
  majestic?: boolean;
  shape?: 'island' | 'ball' | 'pill';
  personal?: boolean;
}

interface IslandContextType {
  showIsland: (notification: Omit<IslandNotification, 'id'>) => void;
  dismissIsland: (id: string) => void;
}

const IslandContext = createContext<IslandContextType | undefined>(undefined);

export function useIsland() {
  const context = useContext(IslandContext);
  if (!context) {
    throw new Error('useIsland must be used within an IslandProvider');
  }
  return context;
}

export const IslandProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<IslandNotification[]>([]);
  const [lastActivity, setLastActivity] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setLastActivity(Date.now()), 0);
    return () => clearTimeout(timer);
  }, []);
  const { user } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'), { noSsr: true });

  const showIsland = useCallback((notification: Omit<IslandNotification, 'id'>) => {
    const id = `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
    const newNotif = { ...notification, id, duration: notification.duration || (notification.majestic ? 10000 : 6000) };
    setNotifications((prev) => [...prev, newNotif]);
  }, []);

  const dismissIsland = useCallback((id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }, []);

  // Track user activity
  useEffect(() => {
    const activityHandler = () => setLastActivity(Date.now());
    window.addEventListener('mousemove', activityHandler);
    window.addEventListener('keydown', activityHandler);
    window.addEventListener('click', activityHandler);
    
    return () => {
      window.removeEventListener('mousemove', activityHandler);
      window.removeEventListener('keydown', activityHandler);
      window.removeEventListener('click', activityHandler);
    };
  }, []);

  // Proactive suggestions for Connect
  useEffect(() => {
    const idleInterval = setInterval(() => {
      const now = Date.now();
      const idleTime = now - lastActivity;

      if (idleTime > 45000 && notifications.length === 0) {
        const userName = user?.name?.split(' ')[0] || '';
        
        const suggestions = [
          {
            type: 'suggestion' as IslandType,
            title: userName || "Quick Sync?",
            message: "You can instantly attach notes from Kylrix Note in any conversation here.",
            action: { label: "Learn How", onClick: () => {} },
            personal: !!userName,
            app: 'note' as KylrixApp,
          },
          {
            type: 'connect' as IslandType,
            title: userName || "Vault Secure",
            message: "Your messages are end-to-end encrypted with your Kylrix Vault master password.",
            action: { label: "Security Status", onClick: () => {} },
            majestic: true,
            personal: !!userName,
            app: 'vault' as KylrixApp,
          },
          {
            type: 'suggestion' as IslandType,
            title: "Thinking space",
            message: "Use your self-chat to store ideas, snippets, and secrets for yourself.",
            action: { label: "Open Vault", onClick: () => {} },
            app: 'connect' as KylrixApp,
          }
        ];
        
        const randomSuggestion = suggestions[Math.floor(Math.random() * suggestions.length)];
        showIsland(randomSuggestion);
        setLastActivity(Date.now());
      }
    }, 15000);

    return () => clearInterval(idleInterval);
  }, [lastActivity, notifications.length, showIsland, user]);

  return (
    <IslandContext.Provider value={{ showIsland, dismissIsland }}>
      {children}
      <DynamicIslandOverlay notifications={notifications} onDismiss={dismissIsland} isMobile={isMobile} />
    </IslandContext.Provider>
  );
};

const APP_TONES: Record<KylrixApp, { primary: string; secondary: string; label: string }> = {
  root: { primary: '#6366F1', secondary: '#6366F1', label: 'Kylrix' },
  vault: { primary: '#6366F1', secondary: '#10B981', label: 'Vault' },
  flow: { primary: '#6366F1', secondary: '#A855F7', label: 'Flow' },
  note: { primary: '#6366F1', secondary: '#EC4899', label: 'Note' },
  connect: { primary: '#6366F1', secondary: '#F59E0B', label: 'Connect' },
};

const TYPE_TONES: Record<IslandType, { primary: string; secondary: string; label: string }> = {
  success: { primary: '#6366F1', secondary: '#6366F1', label: 'Success' },
  error: { primary: '#FF3B30', secondary: '#FF6B6B', label: 'Error' },
  warning: { primary: '#FF9500', secondary: '#FDBA74', label: 'Warning' },
  info: { primary: '#6366F1', secondary: '#60A5FA', label: 'Info' },
  pro: { primary: '#6366F1', secondary: '#A855F7', label: 'Pro' },
  system: { primary: '#6366F1', secondary: '#94A3B8', label: 'System' },
  suggestion: { primary: '#A855F7', secondary: '#C084FC', label: 'Suggestion' },
  connect: { primary: '#6366F1', secondary: '#F59E0B', label: 'Connect' },
};

type SearchAction =
  | {
      id: string;
      kind: 'route';
      title: string;
      description: string;
      color: string;
      terms: string[];
      onSelect: () => void;
      icon: React.ReactNode;
    }
  | {
      id: string;
      kind: 'person';
      title: string;
      description: string;
      color: string;
      terms: string[];
      onSelect: () => void;
      icon: React.ReactNode;
      avatar?: string | null;
    };

function getTone(notification: IslandNotification) {
  return notification.app ? APP_TONES[notification.app] : TYPE_TONES[notification.type];
}

function includesAny(text: string, terms: string[]) {
  return terms.some((term) => text.includes(term));
}

const DynamicIslandOverlay: React.FC<{
  notifications: IslandNotification[];
  onDismiss: (id: string) => void;
  isMobile: boolean;
}> = ({ notifications, onDismiss, isMobile }) => {
  const current = notifications[notifications.length - 1];
  const [isExpanded, setIsExpanded] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [people, setPeople] = useState<any[]>([]);
  const [searching, setSearching] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const controls = useAnimation();
  const router = useRouter();
  const { user } = useAuth();
  const { requestSudo } = useSudo();
  const { headerHeight } = useAppChrome();

  const currentTone = current ? getTone(current) : APP_TONES.connect;
  const topOffset = Math.max(12, Math.round(headerHeight / 2 - 26));
  const openSearch = useCallback(() => {
    if (current) return;
    setIsSearchOpen(true);
  }, [current]);
  const closeSearch = useCallback(() => {
    setIsSearchOpen(false);
    setQuery('');
    setPeople([]);
    setSearching(false);
  }, []);

  const routeActions = React.useMemo<SearchAction[]>(() => {
    const go = (href: string) => () => {
      router.push(href);
      closeSearch();
    };

    const openExternal = (href: string) => () => {
      window.location.assign(href);
      closeSearch();
    };

    return [
      {
        id: 'open-chats',
        kind: 'route',
        title: 'Open chats',
        description: 'Jump to messages and active conversations',
        color: '#F59E0B',
        terms: ['chat', 'chats', 'message', 'messages', 'dm', 'inbox', 'conversation'],
        onSelect: go('/chats'),
        icon: <MessageCircleIcon size={16} />,
      },
      {
        id: 'open-calls',
        kind: 'route',
        title: 'Open calls',
        description: 'Review voice and call activity',
        color: '#A855F7',
        terms: ['call', 'calls', 'phone', 'voice', 'video'],
        onSelect: go('/calls'),
        icon: <PhoneIcon size={16} />,
      },
      {
        id: 'open-settings',
        kind: 'route',
        title: 'Open settings',
        description: 'Adjust identity, privacy, and app preferences',
        color: '#6366F1',
        terms: ['setting', 'settings', 'preferences', 'profile', 'account', 'security'],
        onSelect: go('/settings'),
        icon: <SettingsIcon size={16} />,
      },
      ...ECOSYSTEM_APPS.map((app) => ({
        id: `app-${app.id}`,
        kind: 'route' as const,
        title: `Open ${app.label}`,
        description: app.description,
        color: app.color,
        terms: [app.label.toLowerCase(), app.subdomain, app.id, 'open app', 'launch app'],
        onSelect: openExternal(getEcosystemUrl(app.subdomain)),
        icon: <SparklesIcon size={16} />,
      })),
    ];
  }, [closeSearch, router]);

  const routeMatches = React.useMemo(() => {
    const text = query.trim().toLowerCase();
    if (!text) {
      return routeActions.slice(0, 5);
    }

    return routeActions
      .filter((action) => includesAny(text, action.terms))
      .slice(0, 6);
  }, [query, routeActions]);

  const startDirectChat = useCallback(async (targetUser: any) => {
    if (!user) return;
    const targetUserId = targetUser.userId || targetUser.$id;

    if (!targetUser.publicKey) {
      toast.error(`${targetUser.displayName || targetUser.username} hasn't set up secure chatting yet.`);
      return;
    }

    try {
      const existing = await ChatService.getConversations(user.$id);
      const found = existing.rows.find((conversation: any) => (
        conversation.type === 'direct' &&
        conversation.participants?.includes(targetUserId)
      ));

      if (found) {
        router.push(`/chat/${found.$id}`);
        closeSearch();
        return;
      }
    } catch (error) {
      console.warn('[DynamicIsland] Failed to resolve existing chat:', error);
    }

    requestSudo({
      onSuccess: async () => {
        try {
          await UsersService.ensureProfileForUser(user);
          await ecosystemSecurity.ensureE2EIdentity(user.$id);
          const newConv = await ChatService.createConversation([user.$id, targetUserId], 'direct');
          router.push(`/chat/${newConv.$id}`);
          closeSearch();
        } catch (error: any) {
          console.error('[DynamicIsland] Failed to create chat:', error);
          toast.error(`Failed to open chat: ${error?.message || 'Unknown error'}`);
        }
      },
    });
  }, [closeSearch, requestSudo, router, user]);

  useEffect(() => {
    if (!current) {
      setIsExpanded(false);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      return;
    }

    closeSearch();
    requestAnimationFrame(() => setIsExpanded(false));

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      onDismiss(current.id);
    }, current.duration || 6000);

    controls.start({
      y: [0, -2, 0],
      transition: { duration: 5, repeat: Infinity, ease: 'easeInOut' },
    });
  }, [closeSearch, controls, current, onDismiss]);

  useEffect(() => {
    if (!isSearchOpen || current) return;
    const frame = requestAnimationFrame(() => inputRef.current?.focus());
    return () => cancelAnimationFrame(frame);
  }, [current, isSearchOpen]);

  useEffect(() => {
    if (!isSearchOpen || current) return;

    const text = query.trim().toLowerCase();
    let active = true;

    if (!text) {
      setPeople([]);
      setSearching(false);
      return;
    }

    const timer = setTimeout(async () => {
      if (text.length < 2) {
        setPeople([]);
        setSearching(false);
        return;
      }

      setSearching(true);
      try {
        const res = await UsersService.searchUsers(text);
        if (!active) return;
        const rows = (res.rows || []).filter((candidate: any) => (candidate.userId || candidate.$id) !== user?.$id);
        rows.forEach((candidate: any) => seedIdentityCache(candidate));
        setPeople(rows.slice(0, 5));
      } catch (error) {
        if (active) {
          console.warn('[DynamicIsland] People search failed:', error);
          setPeople([]);
        }
      } finally {
        if (active) setSearching(false);
      }
    }, 280);

    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, [current, isSearchOpen, query, user?.$id]);

  const handleSearchSubmit = () => {
    if (routeMatches.length > 0) {
      routeMatches[0].onSelect();
      return;
    }

    if (people.length > 0) {
      void startDirectChat(people[0]);
      return;
    }

    router.push('/chats');
    closeSearch();
  };

  const currentIcon = current ? (
    current.type === 'success' ? <SuccessIcon fontSize="small" /> :
    current.type === 'error' ? <ErrorIcon fontSize="small" /> :
    current.type === 'warning' ? <WarningIcon fontSize="small" /> :
    current.type === 'pro' ? <ProIcon fontSize="small" /> :
    current.type === 'suggestion' ? <IdeaIcon fontSize="small" /> :
    current.type === 'connect' ? <ConnectIcon fontSize="small" /> :
    <InfoIcon fontSize="small" />
  ) : (
    <Box
      sx={{
        width: 10,
        height: 10,
        borderRadius: '50%',
        bgcolor: APP_TONES.connect.secondary,
        boxShadow: `0 0 18px ${alpha(APP_TONES.connect.secondary, 0.7)}`,
      }}
    />
  );

  const glow = current
    ? {
        border: `1px solid ${alpha(currentTone.secondary, current.majestic ? 0.65 : 0.4)}`,
        boxShadow: current.majestic
          ? `0 0 0 1px ${alpha(currentTone.primary, 0.24)}, 0 0 30px ${alpha(currentTone.secondary, 0.45)}, 0 0 72px ${alpha(currentTone.primary, 0.25)}`
          : `0 0 0 1px ${alpha(currentTone.primary, 0.18)}, 0 0 18px ${alpha(currentTone.secondary, 0.3)}, 0 0 40px ${alpha(currentTone.primary, 0.14)}`,
      }
    : {
        border: `1px solid ${alpha(APP_TONES.connect.secondary, 0.24)}`,
        boxShadow: `0 0 0 1px ${alpha(APP_TONES.connect.primary, 0.14)}, 0 0 16px ${alpha(APP_TONES.connect.secondary, 0.22)}, 0 0 36px ${alpha(APP_TONES.connect.primary, 0.12)}`,
      };

  const searchWidth = isMobile ? 'calc(100vw - 24px)' : 'min(560px, calc(100vw - 48px))';
  const restingSize = '52px';
  const collapsedSize = '52px';
  const islandWidth = current || isSearchOpen ? (isExpanded ? searchWidth : collapsedSize) : restingSize;

  const containerWidth = current
    ? (isExpanded ? searchWidth : restingSize)
    : isSearchOpen
      ? searchWidth
      : restingSize;

  return (
    <Box
      sx={{
        position: 'fixed',
        top: topOffset,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 10000,
        pointerEvents: 'none',
        width: containerWidth,
      }}
    >
      <AnimatePresence mode="wait">
        {current ? (
          <motion.div
            key={current.id}
            initial={{ y: -40, scale: 0.9, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: -40, scale: 0.85, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 320, damping: 28 }}
            onHoverStart={() => setIsExpanded(true)}
            onHoverEnd={() => setIsExpanded(false)}
            onClick={() => setIsExpanded((value) => !value)}
            style={{ pointerEvents: 'auto', cursor: 'pointer' }}
          >
            <motion.div
              animate={controls}
              style={{
                minHeight: 52,
                width: islandWidth,
                borderRadius: '999px',
                background: 'rgba(10, 9, 8, 0.94)',
                backdropFilter: 'blur(28px) saturate(170%)',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'stretch',
                flexDirection: 'column',
                position: 'relative',
                transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
                ...glow,
              }}
            >
              <Box
                sx={{
                  position: 'absolute',
                  inset: -2,
                  borderRadius: 'inherit',
                  background: `radial-gradient(circle at 50% 50%, ${alpha(currentTone.secondary, current.majestic ? 0.25 : 0.16)} 0%, transparent 72%)`,
                  opacity: 1,
                  pointerEvents: 'none',
                }}
              />

              <Box
                sx={{
                  position: 'relative',
                  zIndex: 1,
                  minHeight: 52,
                  display: 'flex',
                  alignItems: 'center',
                  px: 2,
                  gap: 1.5,
                }}
              >
                <Box sx={{ color: currentTone.secondary, display: 'flex', flexShrink: 0 }}>
                  {currentIcon}
                </Box>

                {isExpanded && (
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={current.id}
                      initial={{ opacity: 0, x: 8 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -8 }}
                      style={{ flex: 1, minWidth: 0 }}
                    >
                      <Typography
                        variant="caption"
                        sx={{
                          color: 'white',
                          fontWeight: 900,
                          fontSize: '0.82rem',
                          fontFamily: 'var(--font-space-grotesk)',
                          lineHeight: 1.15,
                        }}
                        noWrap={!isExpanded}
                      >
                        {current.personal ? `Hey, ${current.title}` : current.title}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{
                          display: 'block',
                          color: alpha('#fff', 0.6),
                          mt: 0.25,
                          fontWeight: 600,
                          lineHeight: 1.4,
                        }}
                      >
                        {current.message || 'Tap to expand'}
                      </Typography>
                    </motion.div>
                  </AnimatePresence>
                )}

                {!isExpanded && (
                  <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center', flexShrink: 0 }}>
                    {[0, 1, 2].map((index) => (
                      <motion.div
                        key={index}
                        animate={{ scale: [1, 1.35, 1], opacity: [0.35, 1, 0.35] }}
                        transition={{ duration: 2, repeat: Infinity, delay: index * 0.22 }}
                        style={{
                          width: 3,
                          height: 3,
                          borderRadius: '50%',
                          background: currentTone.secondary,
                        }}
                      />
                    ))}
                  </Box>
                )}
              </Box>
            </motion.div>
          </motion.div>
        ) : isSearchOpen ? (
          <motion.div
            key="search-island"
            initial={{ y: -20, scale: 0.96, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: -20, scale: 0.96, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 280, damping: 28 }}
            style={{ pointerEvents: 'auto' }}
          >
            <Paper
              elevation={0}
              sx={{
                width: searchWidth,
                borderRadius: '30px',
                bgcolor: 'rgba(10, 9, 8, 0.96)',
                backdropFilter: 'blur(30px) saturate(180%)',
                border: `1px solid ${alpha(APP_TONES.connect.secondary, 0.28)}`,
                boxShadow: `0 0 0 1px ${alpha(APP_TONES.connect.primary, 0.14)}, 0 0 28px ${alpha(APP_TONES.connect.secondary, 0.22)}, 0 20px 55px rgba(0, 0, 0, 0.5)`,
                overflow: 'hidden',
                position: 'relative',
              }}
            >
              <Box
                sx={{
                  position: 'absolute',
                  inset: 0,
                  background: `radial-gradient(circle at 50% 0%, ${alpha(APP_TONES.connect.secondary, 0.18)} 0%, transparent 55%)`,
                  pointerEvents: 'none',
                }}
              />
              <Box sx={{ position: 'relative', zIndex: 1, p: 1.5 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, px: 0.5 }}>
                  <Box
                    sx={{
                      width: 38,
                      height: 38,
                      borderRadius: '999px',
                      display: 'grid',
                      placeItems: 'center',
                      color: APP_TONES.connect.secondary,
                      bgcolor: alpha(APP_TONES.connect.secondary, 0.12),
                      border: `1px solid ${alpha(APP_TONES.connect.secondary, 0.18)}`,
                      boxShadow: `0 0 18px ${alpha(APP_TONES.connect.secondary, 0.18)}`,
                      flexShrink: 0,
                    }}
                  >
                    <SearchIcon size={18} />
                  </Box>
                  <TextField
                    inputRef={inputRef}
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === 'Escape') {
                        closeSearch();
                      }
                      if (event.key === 'Enter') {
                        event.preventDefault();
                        handleSearchSubmit();
                      }
                    }}
                    placeholder="Search chats, people, apps..."
                    variant="standard"
                    fullWidth
                    InputProps={{
                      disableUnderline: true,
                      sx: {
                        color: 'white',
                        fontSize: '0.95rem',
                        fontWeight: 700,
                        '& .MuiInputBase-input::placeholder': {
                          color: alpha('#fff', 0.42),
                          opacity: 1,
                        },
                      },
                    }}
                    sx={{ flex: 1 }}
                  />
                  <Button
                    onClick={closeSearch}
                    sx={{
                      minWidth: 0,
                      width: 36,
                      height: 36,
                      borderRadius: '999px',
                      color: alpha('#fff', 0.62),
                      bgcolor: alpha('#fff', 0.04),
                    }}
                  >
                    <CloseIcon size={16} />
                  </Button>
                </Box>

                <Box sx={{ mt: 1.5, display: 'grid', gap: 1.25 }}>
                  <Box>
                    <Typography
                      variant="caption"
                      sx={{
                        color: alpha('#fff', 0.42),
                        fontWeight: 800,
                        textTransform: 'uppercase',
                        letterSpacing: '0.12em',
                        px: 0.75,
                      }}
                    >
                      Offline suggestions
                    </Typography>
                    <List sx={{ display: 'grid', gap: 0.75, mt: 0.75, p: 0 }}>
                      {routeMatches.map((action) => (
                        <ListItemButton
                          key={action.id}
                          onClick={action.onSelect}
                          sx={{
                            borderRadius: '18px',
                            bgcolor: 'rgba(255,255,255,0.03)',
                            border: '1px solid rgba(255,255,255,0.05)',
                            px: 1.5,
                            py: 1.25,
                            gap: 1.25,
                            '&:hover': {
                              bgcolor: 'rgba(255,255,255,0.05)',
                              borderColor: alpha(action.color, 0.28),
                            },
                          }}
                        >
                          <Box
                            sx={{
                              width: 34,
                              height: 34,
                              borderRadius: '12px',
                              display: 'grid',
                              placeItems: 'center',
                              color: action.color,
                              bgcolor: alpha(action.color, 0.12),
                              flexShrink: 0,
                            }}
                          >
                            {action.icon}
                          </Box>
                          <Box sx={{ minWidth: 0, flex: 1 }}>
                            <Typography sx={{ color: 'white', fontWeight: 800, fontSize: '0.88rem', lineHeight: 1.15 }}>
                              {action.title}
                            </Typography>
                            <Typography sx={{ color: alpha('#fff', 0.56), fontWeight: 600, fontSize: '0.76rem', lineHeight: 1.35 }}>
                              {action.description}
                            </Typography>
                          </Box>
                          <ArrowRightIcon size={15} color={action.color} />
                        </ListItemButton>
                      ))}
                    </List>
                  </Box>

                  <Divider sx={{ borderColor: 'rgba(255,255,255,0.06)' }} />

                  <Box>
                    <Typography
                      variant="caption"
                      sx={{
                        color: alpha('#fff', 0.42),
                        fontWeight: 800,
                        textTransform: 'uppercase',
                        letterSpacing: '0.12em',
                        px: 0.75,
                      }}
                    >
                      People
                    </Typography>

                    <Box sx={{ mt: 0.75, display: 'grid', gap: 0.75 }}>
                      {searching && (
                        <Box sx={{ px: 1, py: 1.25, color: alpha('#fff', 0.52) }}>
                          <Typography sx={{ fontSize: '0.82rem', fontWeight: 700 }}>Searching locally first...</Typography>
                        </Box>
                      )}

                      {people.map((person) => {
                        const avatar = person.avatar;
                        return (
                          <ListItemButton
                            key={person.$id || person.userId}
                            onClick={() => void startDirectChat(person)}
                            sx={{
                              borderRadius: '18px',
                              bgcolor: 'rgba(255,255,255,0.03)',
                              border: '1px solid rgba(255,255,255,0.05)',
                              px: 1.5,
                              py: 1.1,
                              gap: 1.25,
                              '&:hover': {
                                bgcolor: 'rgba(255,255,255,0.05)',
                                borderColor: alpha('#F59E0B', 0.28),
                              },
                            }}
                          >
                            <ListItemAvatar sx={{ minWidth: 0 }}>
                              <Avatar
                                src={avatar || undefined}
                                sx={{
                                  width: 34,
                                  height: 34,
                                  bgcolor: alpha('#F59E0B', 0.1),
                                  color: '#F59E0B',
                                  fontSize: '0.8rem',
                                  fontWeight: 800,
                                }}
                              >
                                {!avatar && String(person.displayName || person.username || '?').charAt(0).toUpperCase()}
                              </Avatar>
                            </ListItemAvatar>
                            <Box sx={{ minWidth: 0, flex: 1 }}>
                              <Typography sx={{ color: 'white', fontWeight: 800, fontSize: '0.88rem', lineHeight: 1.15 }} noWrap>
                                {person.displayName || person.username || 'Unknown'}
                              </Typography>
                              <Typography sx={{ color: alpha('#fff', 0.56), fontWeight: 600, fontSize: '0.76rem' }} noWrap>
                                @{person.username || person.userId || person.$id}
                              </Typography>
                            </Box>
                            <ArrowRightIcon size={15} color="#F59E0B" />
                          </ListItemButton>
                        );
                      })}

                      {!searching && query.trim().length >= 2 && people.length === 0 && (
                        <Box sx={{ px: 1, py: 1.25, color: alpha('#fff', 0.52) }}>
                          <Typography sx={{ fontSize: '0.82rem', fontWeight: 700 }}>No local matches yet.</Typography>
                        </Box>
                      )}
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Paper>
          </motion.div>
        ) : (
          <motion.div
            key="idle-island"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.92 }}
            transition={{ type: 'spring', stiffness: 280, damping: 24 }}
            onClick={openSearch}
            style={{ pointerEvents: 'auto', cursor: 'pointer' }}
          >
            <Box
              sx={{
                width: 52,
                height: 52,
                borderRadius: '999px',
                display: 'grid',
                placeItems: 'center',
                bgcolor: 'rgba(10, 9, 8, 0.9)',
                backdropFilter: 'blur(28px) saturate(170%)',
                position: 'relative',
                overflow: 'hidden',
                ...glow,
              }}
            >
              <Box
                sx={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: 'inherit',
                  background: `radial-gradient(circle at 50% 50%, ${alpha(APP_TONES.connect.secondary, 0.18)} 0%, transparent 72%)`,
                  opacity: 1,
                }}
              />
              <motion.div
                animate={{
                  scale: [1, 1.06, 1],
                  opacity: [0.9, 1, 0.9],
                }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                  position: 'relative',
                  zIndex: 1,
                  color: APP_TONES.connect.secondary,
                  display: 'flex',
                }}
              >
                <SearchIcon size={18} />
              </motion.div>
            </Box>
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
};
