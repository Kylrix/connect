import React from 'react';
import { Link, Typography } from '@mui/material';

interface FormattedTextProps {
    text: string;
    variant?: any;
    sx?: any;
}

export const FormattedText: React.FC<FormattedTextProps> = ({ text, variant = 'body1', sx = {} }) => {
    if (!text) return null;

    // Regex to match URLs
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    
    // Split text by URLs
    const parts = text.split(urlRegex);
    
    return (
        <Typography variant={variant} sx={{ ...sx, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
            {parts.map((part, i) => {
                if (part.match(urlRegex)) {
                    return (
                        <Link 
                            key={i} 
                            href={part} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            sx={{ 
                                color: '#6366F1', 
                                textDecoration: 'none',
                                fontWeight: 700,
                                '&:hover': { textDecoration: 'underline' }
                            }}
                        >
                            {part}
                        </Link>
                    );
                }
                return part;
            })}
        </Typography>
    );
};
