'use client';

import { AppShell } from '@/components/layout/AppShell';
import { Feed } from '@/components/social/Feed';
import { Box, Typography, Container, Button, CircularProgress } from '@mui/material';
import { useAuth } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  const { user, login, isAuthenticating } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.replace('/chats');
    }
  }, [user, router]);

  return (
    <AppShell>
      <Container maxWidth="md" sx={{ py: 3 }}>
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h3" fontWeight="bold" mb={2}>WhisperrConnect</Typography>
          <Typography variant="h6" color="text.secondary" mb={4}>
            Seamless communication for the modern workspace. Connect with your team and the Whisperr ecosystem.
          </Typography>
          {!user && (
            <Button 
              variant="contained" 
              size="large" 
              onClick={login}
              disabled={isAuthenticating}
              sx={{ minWidth: 200, py: 1.5 }}
            >
              {isAuthenticating ? <CircularProgress size={24} color="inherit" /> : 'Get Started Free'}
            </Button>
          )}
        </Box>
        <Feed />
      </Container>
    </AppShell>
  );
}
