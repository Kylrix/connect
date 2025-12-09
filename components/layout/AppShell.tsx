'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const AppShell = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname();

    const navItems = [
        { label: 'Chats', href: '/', icon: '💬' },
        { label: 'Calls', href: '/calls', icon: '📞' },
        { label: 'People', href: '/people', icon: '👥' },
        { label: 'Profile', href: '/profile', icon: '👤' },
    ];

    return (
        <div className="app-container">
            {/* Desktop Sidebar */}
            <aside className="sidebar">
                <div style={{ padding: '20px', borderBottom: '1px solid rgba(128,128,128,0.1)' }}>
                    <h1 style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>WhisperrConnect</h1>
                </div>
                <nav style={{ flex: 1, padding: '10px' }}>
                    {navItems.map((item) => (
                        <Link 
                            key={item.href} 
                            href={item.href}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                padding: '12px',
                                borderRadius: '8px',
                                marginBottom: '4px',
                                backgroundColor: pathname === item.href ? 'rgba(0,112,243,0.1)' : 'transparent',
                                color: pathname === item.href ? '#0070f3' : 'inherit',
                                fontWeight: pathname === item.href ? '600' : 'normal'
                            }}
                        >
                            <span style={{ marginRight: '12px' }}>{item.icon}</span>
                            {item.label}
                        </Link>
                    ))}
                </nav>
            </aside>

            {/* Main Content */}
            <main className="main-content">
                {children}
            </main>

            {/* Mobile Bottom Nav */}
            <nav className="bottom-nav">
                {navItems.map((item) => (
                    <Link 
                        key={item.href} 
                        href={item.href}
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            fontSize: '0.8rem',
                            color: pathname === item.href ? '#0070f3' : 'inherit'
                        }}
                    >
                        <span style={{ fontSize: '1.2rem', marginBottom: '2px' }}>{item.icon}</span>
                        {item.label}
                    </Link>
                ))}
            </nav>
        </div>
    );
};
