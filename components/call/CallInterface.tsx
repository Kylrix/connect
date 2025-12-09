'use client';

import React, { useEffect, useRef, useState } from 'react';
import { WebRTCManager } from '@/lib/webrtc/WebRTCManager';
import { useAuth } from '@/lib/auth';
import { ChatService } from '@/lib/services/chat';
import { client } from '@/lib/appwrite/client';
import { APPWRITE_CONFIG } from '@/lib/appwrite/config';
import { SignalData } from '@/types/p2p';
import { useRouter } from 'next/navigation';

export const CallInterface = ({ conversationId, isCaller }: { conversationId: string, isCaller: boolean }) => {
    const { user } = useAuth();
    const [status, setStatus] = useState('Initializing...');
    const localVideoRef = useRef<HTMLVideoElement>(null);
    const remoteVideoRef = useRef<HTMLVideoElement>(null);
    const rtcManager = useRef<WebRTCManager | null>(null);
    const router = useRouter();

    useEffect(() => {
        if (!user) return;

        // Initialize WebRTC Manager
        rtcManager.current = new WebRTCManager({
            onTrack: (stream) => {
                if (remoteVideoRef.current) {
                    remoteVideoRef.current.srcObject = stream;
                }
            },
            onData: (data) => console.log('Data received:', data),
            onStateChange: (state) => setStatus(state),
            onSignal: async (signal) => {
                // Send signal via ChatService
                await ChatService.sendMessage(
                    conversationId,
                    user.$id,
                    JSON.stringify(signal),
                    'call_signal'
                );
            }
        });

        // Start Local Stream
        rtcManager.current.initializeLocalStream(true, true).then((stream) => {
            if (localVideoRef.current) {
                localVideoRef.current.srcObject = stream;
            }
            // If caller, create offer after stream is ready
            if (isCaller) {
                // We need the other participant's ID.
                // For now, we broadcast to the conversation.
                // The receiver will pick it up.
                // But createOffer needs a targetId.
                // We can fetch conversation to get participants.
                ChatService.getConversations(user.$id).then(res => {
                    const conv = res.rows.find((c: any) => c.$id === conversationId);
                    if (conv) {
                        const otherId = conv.participants.find((p: string) => p !== user.$id);
                        if (otherId) {
                            rtcManager.current?.createOffer(user.$id, otherId);
                        }
                    }
                });
            }
        });

        // Subscribe to Signaling Messages
        const unsubscribe = client.subscribe(
            `databases.${APPWRITE_CONFIG.DATABASES.CHAT}.tables.${APPWRITE_CONFIG.TABLES.CHAT.MESSAGES}.rows`,
            (response: any) => {
                if (response.events.includes('databases.*.tables.*.rows.*.create')) {
                    const msg = response.payload;
                    if (msg.conversationId === conversationId && msg.type === 'call_signal' && msg.senderId !== user.$id) {
                        try {
                            const signal = JSON.parse(msg.content);
                            // Only handle signals meant for us or broadcast
                            if (signal.target === user.$id) {
                                rtcManager.current?.handleSignal(signal);
                            }
                        } catch (e) {
                            console.error('Failed to parse signal:', e);
                        }
                    }
                }
            }
        );

        return () => {
            unsubscribe();
            rtcManager.current?.cleanup();
        };
    }, [user, conversationId, isCaller]);

    const endCall = () => {
        rtcManager.current?.cleanup();
        router.back();
    };

    return (
        <div style={{ 
            position: 'fixed', 
            top: 0, left: 0, right: 0, bottom: 0, 
            backgroundColor: '#000', 
            zIndex: 1000,
            display: 'flex',
            flexDirection: 'column'
        }}>
            <div style={{ flex: 1, position: 'relative' }}>
                {/* Remote Video */}
                <video 
                    ref={remoteVideoRef} 
                    autoPlay 
                    playsInline 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                />
                
                {/* Local Video */}
                <div style={{ 
                    position: 'absolute', 
                    bottom: '100px', 
                    right: '20px', 
                    width: '120px', 
                    height: '160px', 
                    backgroundColor: '#333',
                    borderRadius: '10px',
                    overflow: 'hidden',
                    border: '2px solid white'
                }}>
                    <video 
                        ref={localVideoRef} 
                        autoPlay 
                        playsInline 
                        muted 
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                    />
                </div>

                {/* Status Overlay */}
                <div style={{
                    position: 'absolute',
                    top: '20px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    color: 'white',
                    padding: '5px 15px',
                    borderRadius: '20px'
                }}>
                    {status}
                </div>
            </div>

            {/* Controls */}
            <div style={{ 
                height: '80px', 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                gap: '20px',
                backgroundColor: '#1a1a1a'
            }}>
                <button 
                    onClick={endCall}
                    style={{
                        width: '50px',
                        height: '50px',
                        borderRadius: '50%',
                        backgroundColor: '#ff4444',
                        border: 'none',
                        color: 'white',
                        fontSize: '20px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    📞
                </button>
            </div>
        </div>
    );
};
