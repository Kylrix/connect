'use client';

import { CallInterface } from '@/components/call/CallInterface';
import { useParams, useSearchParams } from 'next/navigation';

export default function CallPage() {
    const params = useParams();
    const searchParams = useSearchParams();
    const conversationId = params.id as string;
    const isCaller = searchParams.get('caller') === 'true';

    return (
        <CallInterface conversationId={conversationId} isCaller={isCaller} />
    );
}
