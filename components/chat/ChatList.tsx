'use client';

import React, { useEffect, useState } from 'react';
import { ChatService } from '@/lib/services/chat';
import { Conversations } from '@/types/appwrite';
import { useAuth } from '@/lib/auth';
import Link from 'next/link';
import { UsersService } from '@/lib/services/users';

export const ChatList = () => {
    const { user } = useAuth();
    const [conversations, setConversations] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user) {
            loadConversations();
        }
    }, [user]);

    const loadConversations = async () => {
        try {
            const response = await ChatService.getConversations(user.$id);
            // Enrich with other participant's name
            const enriched = await Promise.all(response.rows.map(async (conv: any) => {
                if (conv.type === 'direct') {
                    const otherId = conv.participants.find((p: string) => p !== user.$id);
                    if (otherId) {
                        // Fetch user profile
                        try {
                            const profile = await UsersService.getProfileById(otherId);
                            return { 
                                ...conv, 
                                otherUserId: otherId, 
                                name: profile ? (profile.displayName || profile.username) : ('User ' + otherId.substring(0, 5)) 
                            };
                        } catch (e) {
                            return conv;
                        }
                    }
                }
                return conv;
            }));
            setConversations(enriched);
        } catch (error) {
            console.error('Failed to load chats:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div>Loading chats...</div>;

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <h2 style={{ padding: '20px', borderBottom: '1px solid #eee' }}>Messages</h2>
            <div style={{ overflowY: 'auto', flex: 1 }}>
                {conversations.length === 0 ? (
                    <div style={{ padding: '20px', textAlign: 'center', color: '#666' }}>
                        No conversations yet. Search for someone to chat with!
                    </div>
                ) : (
                    conversations.map((conv) => (
                        <Link 
                            key={conv.$id} 
                            href={`/chat/${conv.$id}`}
                            style={{
                                display: 'flex',
                                padding: '15px 20px',
                                borderBottom: '1px solid #f5f5f5',
                                alignItems: 'center',
                                cursor: 'pointer',
                                transition: 'background 0.2s'
                            }}
                        >
                            <div style={{
                                width: '40px',
                                height: '40px',
                                borderRadius: '50%',
                                backgroundColor: '#ddd',
                                marginRight: '15px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '1.2rem'
                            }}>
                                {conv.type === 'group' ? '👥' : '👤'}
                            </div>
                            <div style={{ flex: 1 }}>
                                <div style={{ fontWeight: '600', marginBottom: '4px' }}>
                                    {conv.name || (conv.type === 'direct' ? conv.otherUserId : 'Group Chat')}
                                </div>
                                <div style={{ fontSize: '0.9rem', color: '#666', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                    {/* We need to fetch last message content or store it in conversation. 
                                        The schema has lastMessageId. 
                                        Wait, I added lastMessageText to the schema in my python script?
                                        Let's check appwrite.config.json.
                                        I think I removed it in the "robust" update script and only kept lastMessageId.
                                        So we can't show text without fetching.
                                        For MVP, just show date.
                                    */}
                                    {new Date(conv.lastMessageAt || conv.createdAt).toLocaleDateString()}
                                </div>
                            </div>
                        </Link>
                    ))
                )}
            </div>
        </div>
    );
};
