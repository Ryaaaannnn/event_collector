import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, ScanLine, Calendar, User } from 'lucide-react';

const Navigation = () => {
    const navItems = [
        { path: '/', icon: Home, label: 'Home' },
        { path: '/scan', icon: ScanLine, label: 'Scan', primary: true },
        { path: '/calendar', icon: Calendar, label: 'Calendar' },
        { path: '/profile', icon: User, label: 'Profile' },
    ];

    return (
        <nav className="glass-nav" style={{
            position: 'fixed',
            bottom: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '100%',
            maxWidth: '480px',
            height: '80px',
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            paddingBottom: '20px', // Safe area for iOS
            zIndex: 100
        }}>
            {navItems.map((item) => (
                <NavLink
                    key={item.label}
                    to={item.path}
                    className={({ isActive }) =>
                        `nav-item ${isActive ? 'active' : ''}`
                    }
                    style={({ isActive }) => ({
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        textDecoration: 'none',
                        color: isActive ? 'var(--accent-primary)' : 'var(--text-secondary)',
                        transition: 'all 0.3s ease',
                        transform: item.primary ? 'translateY(-20px)' : 'none' // Float the scan button
                    })}
                >
                    <div style={{
                        background: item.primary ? 'var(--accent-primary)' : 'transparent',
                        padding: item.primary ? '12px' : '8px',
                        borderRadius: '50%',
                        boxShadow: item.primary ? 'var(--shadow-glow)' : 'none',
                        color: item.primary ? 'white' : 'inherit'
                    }}>
                        <item.icon size={item.primary ? 28 : 24} />
                    </div>
                    <span style={{
                        fontSize: '10px',
                        marginTop: '4px',
                        opacity: item.primary ? 0 : 1
                    }}>
                        {item.label}
                    </span>
                </NavLink>
            ))}
        </nav>
    );
};

export default Navigation;
