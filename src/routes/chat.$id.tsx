import { createFileRoute } from '@tanstack/react-router';
import Page from '@/app/chat/[id]/page';
export const Route = createFileRoute('/chat/$id')({ component: Page });
