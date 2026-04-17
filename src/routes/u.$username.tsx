import { createFileRoute } from '@tanstack/react-router';
import Page from '@/app/u/[username]/page';
export const Route = createFileRoute('/u/$username')({ component: Page });
