import { createFileRoute } from '@tanstack/react-router';
import Page from '@/app/call/[id]/page';
export const Route = createFileRoute('/call/$id')({ component: Page });
