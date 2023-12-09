// CalendarPage.jsx
import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import '../stylesheets/CalendarPage.css'; // Import the CSS file
import "react-big-calendar/lib/css/react-big-calendar.css";

moment.locale("en-GB");
const localizer = momentLocalizer(moment);

const CalendarPage = ({ appointments, setShowCalendar }) => {
    const events = appointments.map((appointment) => ({
        title: `${appointment.firstName} ${appointment.lastName}`,
        start: new Date(appointment.appointments[0]),
        end: new Date(appointment.appointments[0]),
    }));

    return (
        <div className="calendar-page">
            <button className="close-button" onClick={() => setShowCalendar(false)}>
                Close Calendar
            </button>
            <div className="calendar-container">
                <div style={{ height: 700 }}>
                    <Calendar
                        localizer={localizer}
                        events={events}
                        startAccessor="start"
                        endAccessor="end"
                        style={{ width: '100%' }}
                    />
                </div>
            </div>
        </div>
    );
};

export default CalendarPage;
