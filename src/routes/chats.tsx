import { createFileRoute } from '@tanstack/react-router';
import Page from '@/app/chats/page';
export const Route = createFileRoute('/chats')({ component: Page });
