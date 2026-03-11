'use client';

import { AppShell } from '@/components/layout/AppShell';
import { UserSearch } from '@/components/search/UserSearch';
import { ChatList } from '@/components/chat/ChatList';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { ChatService } from '@/lib/services/chat';
import { useAuth } from '@/lib/auth';

function ChatHandler() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user } = useAuth();
  const userId = searchParams.get('userId');

  useEffect(() => {
    if (userId && user) {
      const initChat = async () => {
        try {
          const existing = await ChatService.getConversations(user.$id);
          const found = existing.rows.find((c: any) => 
            c.type === 'direct' && c.participants.includes(userId)
          );

          if (found) {
            router.push(`/chat/${found.$id}`);
          } else {
            const newConv = await ChatService.createConversation([user.$id, userId], 'direct');
            router.push(`/chat/${newConv.$id}`);
          }
        } catch (e) {
          console.error("Failed to auto-init chat", e);
        }
      };
      initChat();
    }
  }, [userId, user, router]);

  return null;
}

export default function Home() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <AppShell>
      <Suspense fallback={null}>
        <ChatHandler />
      </Suspense>
      <Box sx={{ display: 'flex', height: '100%' }}>
...
            width: isMobile ? '100%' : 350, 
            borderRight: isMobile ? 0 : 1, 
            borderColor: 'divider', 
            display: 'flex', 
            flexDirection: 'column' 
        }}>
          <ChatList />
        </Box>
        {!isMobile && (
            <Box sx={{ flex: 1, p: 3 }}>
              <Typography variant="h5" fontWeight="bold" mb={3}>Find People</Typography>
              <UserSearch />
            </Box>
        )}
      </Box>
    </AppShell>
  );
}
