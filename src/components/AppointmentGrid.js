// components/AppointmentGrid.js
import React from 'react';
import AppointmentRow from './AppointmentRow';

function AppointmentGrid({ appointments, onAddAppointment, onShowCalendar }) {
    return (
        <div>
            <button onClick={onShowCalendar}>Show Calendar</button>
            <table>
                {/* Table header here */}
                <tbody>
                    {appointments.map((appointment) => (
                        <AppointmentRow key={appointment.id} appointment={appointment} onAddAppointment={onAddAppointment} />
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default AppointmentGrid;
