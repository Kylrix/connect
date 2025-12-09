'use client';

import { AppShell } from '@/components/layout/AppShell';
import { UserSearch } from '@/components/search/UserSearch';
import { ChatList } from '@/components/chat/ChatList';

export default function Home() {
  return (
    <AppShell>
      <div style={{ display: 'flex', height: '100%' }}>
        <div style={{ width: '350px', borderRight: '1px solid #eee', display: 'flex', flexDirection: 'column' }}>
          <ChatList />
        </div>
        <div style={{ flex: 1, padding: '20px' }}>
          <h2 style={{ marginBottom: '20px' }}>Find People</h2>
          <UserSearch />
        </div>
      </div>
    </AppShell>
  );
}
