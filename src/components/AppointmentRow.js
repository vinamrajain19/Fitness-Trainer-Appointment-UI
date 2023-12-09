// components/AppointmentRow.js
import React, { useState } from 'react';

function AppointmentRow({ appointment, onAddAppointment }) {
    const [newAppointment, setNewAppointment] = useState('');

    const handleAddAppointment = () => {
        if (newAppointment) {
            onAddAppointment(appointment.id, newAppointment);
            setNewAppointment('');
        }
    };

    // Similar functions for editing and deleting appointments

    return (
        <tr>
            {/* Editable fields here */}
            <td>
                <ul>
                    {appointment.appointments.map((apt) => (
                        <li key={apt}>{apt}</li>
                    ))}
                </ul>
                <input type="datetime-local" value={newAppointment} onChange={(e) => setNewAppointment(e.target.value)} />
                <button onClick={handleAddAppointment}>Add Appointment</button>
            </td>
        </tr>
    );
}

export default AppointmentRow;
