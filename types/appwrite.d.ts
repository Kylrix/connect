import type { Models } from 'appwrite';

export enum ConversationType {
    DIRECT = "direct",
    GROUP = "group",
    BROADCAST = "broadcast"
}

export enum MessageType {
    TEXT = "text",
    IMAGE = "image",
    VIDEO = "video",
    AUDIO = "audio",
    FILE = "file",
    CALL_SIGNAL = "call_signal",
    SYSTEM = "system"
}

export enum FollowsStatus {
    PENDING = "pending",
    ACCEPTED = "accepted",
    BLOCKED = "blocked"
}

export enum FollowsScope {
    FOLLOW = "follow",
    CONNECTION = "connection"
}

export type Users = Models.Row & {
    username: string;
    displayName?: string;
    avatarUrl?: string;
    avatarFileId?: string;
    bio?: string;
    walletAddress?: string;
    appsActive?: string[];
    publicKey?: string;
    privacySettings?: string; // JSON string
    createdAt: string;
    updatedAt: string;
}

export type Conversations = Models.Row & {
    type: ConversationType;
    participants: string[];
    admins?: string[];
    name?: string;
    avatar?: string;
    lastMessageId?: string;
    lastMessageAt?: string;
    encryptionKey?: string;
    contextType?: string;
    contextId?: string;
    createdAt: string;
    updatedAt: string;
}

export type Messages = Models.Row & {
    conversationId: string;
    senderId: string;
    type: MessageType;
    content?: string;
    attachments?: string[];
    replyTo?: string;
    readBy?: string[];
    createdAt: string;
    updatedAt: string;
}

export type CallLogs = Models.Row & {
    callerId: string;
    receiverId: string;
    type: "audio" | "video";
    status: "completed" | "missed" | "rejected" | "busy";
    duration?: number;
    startedAt: string;
    endedAt?: string;
}

export type AppActivity = Models.Row & {
    userId: string;
    appId: string;
    lastActive: string;
    status?: string;
}

export type CallLinks = Models.Row & {
    slug: string;
    creatorId: string;
    conversationId?: string;
    scheduledAt?: string;
    recurrence?: string;
    expiresAt?: string;
    contextType?: string;
    contextId?: string;
    settings?: string;
    createdAt: string;
}

export type Follows = Models.Row & {
    followerId: string;
    followingId: string;
    status: FollowsStatus;
    scope: FollowsScope;
    type?: "user" | "page" | "group";
    isMuted?: boolean;
    isCloseFriend?: boolean;
    createdAt: string;
}

export type Moments = Models.Row & {
    creatorId: string;
    type: "text" | "image" | "video" | "audio" | "link" | "poll";
    content?: string;
    mediaIds?: string[];
    visibility: "public" | "followers" | "private" | "circle";
    replyToId?: string;
    repostOfId?: string;
    topics?: string[];
    stats?: string;
    expiresAt?: string;
    createdAt: string;
}

export type Interactions = Models.Row & {
    type: "like" | "comment" | "share" | "reaction";
    momentId: string;
    userId: string;
    content?: string;
    emoji?: string;
    createdAt: string;
}
