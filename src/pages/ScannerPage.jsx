import React, { useState } from 'react';
import Scanner from '../components/Scanner';
import ManualEntryForm from '../components/ManualEntryForm';

const ScannerPage = () => {
    const [mode, setMode] = useState('scan'); // 'scan' or 'manual'

    return (
        <div style={{ padding: '0 20px 100px 20px', textAlign: 'center' }}>
            <header style={{ paddingTop: '40px', marginBottom: '30px' }}>
                <h1 className="animate-fade-in" style={{ fontSize: '32px', marginBottom: '10px' }}>
                    Add <span style={{ color: 'var(--accent-secondary)' }}>Event</span>
                </h1>

                {/* Toggle Switch */}
                <div style={{ background: 'var(--bg-glass)', display: 'inline-flex', padding: '4px', borderRadius: '20px', marginTop: '10px' }}>
                    <button
                        onClick={() => setMode('scan')}
                        style={{
                            padding: '8px 20px',
                            borderRadius: '16px',
                            background: mode === 'scan' ? 'var(--bg-secondary)' : 'transparent',
                            color: mode === 'scan' ? 'white' : 'var(--text-secondary)',
                            fontWeight: mode === 'scan' ? 'bold' : 'normal',
                            transition: 'all 0.3s'
                        }}
                    >
                        Scan
                    </button>
                    <button
                        onClick={() => setMode('manual')}
                        style={{
                            padding: '8px 20px',
                            borderRadius: '16px',
                            background: mode === 'manual' ? 'var(--bg-secondary)' : 'transparent',
                            color: mode === 'manual' ? 'white' : 'var(--text-secondary)',
                            fontWeight: mode === 'manual' ? 'bold' : 'normal',
                            transition: 'all 0.3s'
                        }}
                    >
                        Manual
                    </button>
                </div>
            </header>

            <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
                {mode === 'scan' ? (
                    <div>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '20px' }}>
                            Take a photo or upload a screenshot of your e-ticket.
                        </p>
                        <Scanner />
                    </div>
                ) : (
                    <ManualEntryForm />
                )}
            </div>

        </div>
    );
};

export default ScannerPage;
