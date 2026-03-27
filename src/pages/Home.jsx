import React from 'react';
import TicketCard from '../components/TicketCard';
import { mockTickets } from '../data/mockTickets';
import { Search, Filter } from 'lucide-react';

const Home = () => {
    return (
        <div style={{ padding: '0 20px 100px 20px' }}>
            {/* Header */}
            <header style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingtop: '20px',
                marginBottom: '24px',
                position: 'sticky',
                top: 0,
                backgroundColor: 'var(--bg-secondary)',
                zIndex: 50,
                paddingTop: '20px',
                paddingBottom: '10px'
            }}>
                <h1 className="animate-fade-in" style={{ fontSize: '28px' }}>
                    My <span style={{ color: 'var(--accent-primary)' }}>Events</span>
                </h1>
                <div style={{ display: 'flex', gap: '16px' }}>
                    <button style={{ background: 'none', color: 'white' }}><Search size={24} /></button>
                    <button style={{ background: 'none', color: 'white' }}><Filter size={24} /></button>
                </div>
            </header>

            {/* Ticket List */}
            <div className="ticket-list">
                {mockTickets.map((ticket, index) => (
                    <TicketCard key={ticket.id} ticket={ticket} index={index} />
                ))}
            </div>
        </div>
    );
};

export default Home;
