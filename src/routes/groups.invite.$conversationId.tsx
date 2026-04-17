import { createFileRoute } from '@tanstack/react-router';
import Page from '@/app/groups/invite/[conversationId]/page';
export const Route = createFileRoute('/groups/invite/$conversationId')({ component: Page });
