import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, Calendar as CalIcon, QrCode } from 'lucide-react';

const TicketCard = ({ ticket, index }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="ticket-card"
            style={{
                position: 'relative',
                background: 'linear-gradient(145deg, rgba(30,30,35,0.9), rgba(10,10,12,0.95))',
                borderRadius: '16px',
                overflow: 'hidden',
                marginBottom: '20px',
                boxShadow: `0 10px 30px -10px ${ticket.color}40`,
                border: '1px solid rgba(255,255,255,0.05)',
                display: 'flex',
                flexDirection: 'column'
            }}
        >
            {/* Decorative colored strip */}
            <div style={{
                height: '4px',
                width: '100%',
                background: `linear-gradient(90deg, ${ticket.color}, transparent)`
            }} />

            {/* Main Content */}
            <div style={{ padding: '20px', position: 'relative' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                    <span style={{
                        fontSize: '10px',
                        textTransform: 'uppercase',
                        letterSpacing: '1px',
                        color: ticket.color,
                        fontWeight: 700,
                        border: `1px solid ${ticket.color}60`,
                        padding: '2px 8px',
                        borderRadius: '12px'
                    }}>
                        {ticket.category}
                    </span>
                    <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{ticket.price}</span>
                </div>

                <h3 style={{ marginBottom: '16px', fontSize: '18px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {ticket.title}
                </h3>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '13px', color: '#ccc' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <CalIcon size={14} color={ticket.color} />
                        {ticket.date}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Clock size={14} color={ticket.color} />
                        {ticket.time}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', gridColumn: 'span 2' }}>
                        <MapPin size={14} color={ticket.color} />
                        <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {ticket.venue}
                        </span>
                    </div>
                </div>
            </div>

            {/* Perforation Line */}
            <div style={{
                position: 'relative',
                height: '2px', // Thin line
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
            }}>
                <div style={{ width: '12px', height: '24px', borderRadius: '0 12px 12px 0', border: '1px solid transparent', boxShadow: 'inset -2px 0 5px rgba(0,0,0,0.5)', background: 'var(--bg-secondary)', marginTop: '-12px' }} />
                <div style={{ flex: 1, borderTop: '2px dashed rgba(255,255,255,0.1)' }} />
                <div style={{ width: '12px', height: '24px', borderRadius: '12px 0 0 12px', border: '1px solid transparent', boxShadow: 'inset 2px 0 5px rgba(0,0,0,0.5)', background: 'var(--bg-secondary)', marginTop: '-12px' }} />
            </div>

            {/* Stub / Barcode Area */}
            <div style={{
                padding: '15px 20px',
                background: 'rgba(0,0,0,0.3)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <div style={{ fontSize: '10px', color: '#666', fontFamily: 'monospace' }}>
                    ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}
                </div>
                <QrCode size={20} color="var(--text-muted)" />
            </div>

        </motion.div>
    );
};

export default TicketCard;
