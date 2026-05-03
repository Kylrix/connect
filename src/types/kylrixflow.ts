import type { Models } from 'appwrite';

export type Event = Models.Document & {
    $collectionId: string;
    $tableId: string;
    title: string;
    description?: string | null;
    startTime: string;
    endTime: string;
    location?: string | null;
    url?: string | null;
    coverImage?: string | null;
    attendees: string[];
    isPublic: boolean;
    userId: string;
    tags?: string[] | null;
};

export type Calendar = Models.Document & {
    $collectionId: string;
    $tableId: string;
    userId: string;
    name: string;
    color: string;
    isDefault: boolean;
};

export type Task = Models.Document & {
    $collectionId: string;
    $tableId: string;
    userId: string;
    title: string;
    description?: string | null;
    status: string;
    priority: string;
    dueDate?: string | null;
    tags: string[];
    assigneeIds: string[];
    attachmentIds: string[];
    parentId?: string | null;
    eventId?: string | null;
    recurrenceRule?: string | null;
};

export type EventGuest = Models.Document & {
    $collectionId: string;
    $tableId: string;
    eventId: string;
    userId: string;
    status: string;
    invitedBy: string;
};

export type FocusSession = Models.Document & {
    $collectionId: string;
    $tableId: string;
    userId: string;
    startTime: string;
    endTime?: string | null;
    duration: number;
    taskId?: string | null;
    status: string;
};
