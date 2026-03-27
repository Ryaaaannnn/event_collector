import React, { useState } from 'react';
import { Calendar, Clock, MapPin, DollarSign, Image as ImageIcon } from 'lucide-react';

const ManualEntryForm = () => {
    const [formData, setFormData] = useState({
        title: '',
        category: 'Concert',
        date: '',
        time: '',
        venue: '',
        price: '',
        image: null
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Event Created! (Mock)');
        // In real app, save to context or local storage
    };

    return (
        <form onSubmit={handleSubmit} className="glass-panel" style={{ padding: '20px', textAlign: 'left' }}>
            <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '5px' }}>Event Name</label>
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="e.g. Taylor Swift Concert"
                    style={{ width: '100%', padding: '12px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: 'white' }}
                />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
                <div>
                    <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '5px' }}>Date</label>
                    <div style={{ position: 'relative' }}>
                        <Calendar size={16} style={{ position: 'absolute', left: '10px', top: '12px', color: 'var(--text-muted)' }} />
                        <input
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            style={{ width: '100%', padding: '10px 10px 10px 35px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: 'white', colorScheme: 'dark' }}
                        />
                    </div>
                </div>
                <div>
                    <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '5px' }}>Time</label>
                    <div style={{ position: 'relative' }}>
                        <Clock size={16} style={{ position: 'absolute', left: '10px', top: '12px', color: 'var(--text-muted)' }} />
                        <input
                            type="time"
                            name="time"
                            value={formData.time}
                            onChange={handleChange}
                            style={{ width: '100%', padding: '10px 10px 10px 35px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: 'white', colorScheme: 'dark' }}
                        />
                    </div>
                </div>
            </div>

            <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '5px' }}>Venue</label>
                <div style={{ position: 'relative' }}>
                    <MapPin size={16} style={{ position: 'absolute', left: '10px', top: '12px', color: 'var(--text-muted)' }} />
                    <input
                        type="text"
                        name="venue"
                        value={formData.venue}
                        onChange={handleChange}
                        placeholder="e.g. Taipei Arena"
                        style={{ width: '100%', padding: '10px 10px 10px 35px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: 'white' }}
                    />
                </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '5px' }}>Cover Photo</label>
                <button
                    type="button"
                    style={{ width: '100%', padding: '15px', border: '1px dashed var(--text-muted)', borderRadius: '8px', background: 'transparent', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', cursor: 'pointer' }}
                >
                    <ImageIcon size={20} />
                    {formData.image ? 'Change Photo' : 'Upload Scene Photo'}
                </button>
            </div>

            <button type="submit" style={{ width: '100%', padding: '14px', background: 'var(--accent-primary)', color: 'white', border: 'none', borderRadius: '12px', fontWeight: 'bold' }}>
                Save Event
            </button>
        </form>
    );
};

export default ManualEntryForm;
