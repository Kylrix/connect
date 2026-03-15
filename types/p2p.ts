export type AttachmentEntityType = 'vault' | 'note' | 'flow' | 'form';
export type AttachmentSubType = 'totp' | 'password' | 'task' | 'ghost_note' | 'form_template';

export interface AttachmentMetadata {
    type: 'attachment';
    entity: AttachmentEntityType;
    subType: AttachmentSubType;
    referenceId: string;
    payload: {
        label: string;
        preview?: string;
        expiry?: string;
        // For TOTP Double-Pulse
        currentCode?: string;
        nextCode?: string;
        // For Tasks
        isCompleted?: boolean;
        // For Forms
        formTitle?: string;
    };
}
