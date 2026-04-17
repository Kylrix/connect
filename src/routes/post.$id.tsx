import { createFileRoute } from '@tanstack/react-router';
import Page from '@/app/post/[id]/page';
export const Route = createFileRoute('/post/$id')({ component: Page });
