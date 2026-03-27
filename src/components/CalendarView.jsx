import React, { useState } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths, getDay } from 'date-fns';
import { ChevronLeft, ChevronRight, Calendar as CalIcon } from 'lucide-react';
import { mockTickets } from '../data/mockTickets';
import TicketCard from './TicketCard';

const CalendarView = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());

    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(currentDate);
    const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

    // Padding days for grid alignment
    const startDay = getDay(monthStart);
    const paddingDays = Array(startDay).fill(null);

    const eventsOnDate = (date) => {
        return mockTickets.filter(ticket => isSameDay(new Date(ticket.date), date));
    };

    const selectedEvents = eventsOnDate(selectedDate);

    const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
    const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));

    return (
        <div style={{ padding: '0 20px 100px 20px' }}>
            <header style={{ paddingTop: '40px', marginBottom: '20px' }}>
                <h1 className="animate-fade-in" style={{ fontSize: '32px' }}>
                    My <span style={{ color: 'var(--accent-primary)' }}>Calendar</span>
                </h1>
            </header>

            {/* Month Navigator */}
            <div className="glass-panel" style={{ padding: '20px', marginBottom: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <button onClick={prevMonth} style={{ background: 'transparent', color: 'white' }}><ChevronLeft /></button>
                    <h2 style={{ fontSize: '18px' }}>{format(currentDate, 'MMMM yyyy')}</h2>
                    <button onClick={nextMonth} style={{ background: 'transparent', color: 'white' }}><ChevronRight /></button>
                </div>

                {/* Days Header */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', marginBottom: '10px', textAlign: 'center', fontSize: '12px', color: 'var(--text-secondary)' }}>
                    {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
                        <div key={i}>{d}</div>
                    ))}
                </div>

                {/* Calendar Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '8px' }}>
                    {paddingDays.map((_, i) => <div key={`pad-${i}`} />)}

                    {daysInMonth.map((day) => {
                        const events = eventsOnDate(day);
                        const isSelected = isSameDay(day, selectedDate);
                        const isToday = isSameDay(day, new Date());

                        return (
                            <button
                                key={day.toString()}
                                onClick={() => setSelectedDate(day)}
                                style={{
                                    aspectRatio: '1/1',
                                    borderRadius: '50%',
                                    background: isSelected ? 'var(--accent-primary)' : (isToday ? 'rgba(255,255,255,0.1)' : 'transparent'),
                                    color: isSelected ? 'white' : 'var(--text-primary)',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    position: 'relative',
                                    fontSize: '14px'
                                }}
                            >
                                <span>{format(day, 'd')}</span>
                                {events.length > 0 && (
                                    <div style={{
                                        position: 'absolute',
                                        bottom: '4px',
                                        width: '4px',
                                        height: '4px',
                                        borderRadius: '50%',
                                        background: isSelected ? 'white' : events[0].color
                                    }} />
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Selected Date Events */}
            <div className="animate-fade-in">
                <h3 style={{ marginBottom: '16px', color: 'var(--text-secondary)' }}>
                    {format(selectedDate, 'EEEE, MMMM do')}
                </h3>

                {selectedEvents.length > 0 ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {selectedEvents.map((ticket, i) => (
                            <TicketCard key={ticket.id} ticket={ticket} index={i} />
                        ))}
                    </div>
                ) : (
                    <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)', border: '1px dashed var(--bg-glass)', borderRadius: '16px' }}>
                        <CalIcon size={40} style={{ marginBottom: '10px', opacity: 0.5 }} />
                        <p>No events scheduled</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CalendarView;
