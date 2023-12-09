import React, { useState } from 'react';
import { format } from 'date-fns';
import DatePicker from 'react-datepicker';
import { AiOutlineCalendar, AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import { MdAdd, MdEdit, MdDone } from 'react-icons/md';
import Modal from 'react-modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './stylesheets/FitnessPage.css';
import 'react-datepicker/dist/react-datepicker.css';
import CalendarPage from './components/CalendarPage';

Modal.setAppElement('#root'); // Set the root element for accessibility

const FitnessTrainer = () => {
  const [clients, setClients] = useState([
    { id: 1, firstName: 'John', lastName: 'Doe', location: 'New York', appointments: [] },
    { id: 2, firstName: 'Jane', lastName: 'Smith', location: 'Los Angeles', appointments: [] },
    // Add more clients as needed
  ]);

  const [editedClient, setEditedClient] = useState(null);
  const [editedAppointment, setEditedAppointment] = useState({ clientID: null, appointment: null });
  const [newAppointment, setNewAppointment] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);

  const handleFirstNameChange = (id, value) => {
    setClients((prevClients) =>
      prevClients.map((client) => (client.id === id ? { ...client, firstName: value } : client))
    );
  };

  const handleLastNameChange = (id, value) => {
    setClients((prevClients) =>
      prevClients.map((client) => (client.id === id ? { ...client, lastName: value } : client))
    );
  };

  const handleLocationChange = (id, value) => {
    setClients((prevClients) =>
      prevClients.map((client) => (client.id === id ? { ...client, location: value } : client))
    );
  };

  const handleEditClient = (client) => {
    setEditedClient({ ...client });
  };

  const handleSaveClient = () => {
    setClients((prevClients) =>
      prevClients.map((client) => (client.id === editedClient.id ? editedClient : client))
    );
    setEditedClient(null);
    toast.success('Client information updated successfully!');
  };

  const handleEditAppointment = (clientID, appointment) => {
    setEditedAppointment({ clientID, appointment });
    setShowDatePicker(true);
  };

  const handleSaveAppointment = () => {
    if (editedAppointment.clientID !== null) {
      setClients((prevClients) =>
        prevClients.map((client) =>
          client.id === editedAppointment.clientID
            ? {
              ...client,
              appointments: client.appointments.map((app) =>
                app === editedAppointment.appointment ? new Date(newAppointment) : app
              ),
            }
            : client
        )
      );
      setEditedAppointment({ clientID: null, appointment: null });
      setShowDatePicker(false);
      toast.success('Appointment edited successfully!');
    }
  };

  const handleAddAppointment = (id) => {
    if (newAppointment) {
      setClients((prevClients) =>
        prevClients.map((client) =>
          client.id === id
            ? {
              ...client,
              appointments: [...client.appointments, new Date(newAppointment)],
              newAppointment: new Date(),
            }
            : client
        )
      );
      setShowDatePicker(false);
      toast.success('Appointment added successfully!');
    }
  };

  const handleDeleteAppointment = (clientID, appointment) => {
    setEditedAppointment({ clientID, appointment });
    setShowDeleteModal(true);
  };

  const confirmDeleteAppointment = () => {
    if (editedAppointment.clientID !== null) {
      setClients((prevClients) =>
        prevClients.map((client) =>
          client.id === editedAppointment.clientID
            ? {
              ...client,
              appointments: client.appointments.filter((app) => app !== editedAppointment.appointment),
            }
            : client
        )
      );
      setEditedAppointment({ clientID: null, appointment: null });
      setShowDeleteModal(false);
      setShowDeleteConfirmation(true);
      toast.success('Appointment deleted successfully!');
    }
  };

  return (
    <div className="fitness-trainer-container">

      <table className="user-table">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Location</th>
            <th>Appointments</th>
            <th>Edit</th>
            <th>Add Appointment</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => (
            <tr key={client.id} className="client-row">
              <td>
                {editedClient?.id === client.id ? (
                  <input
                    type="text"
                    value={editedClient.firstName}
                    onChange={(e) => setEditedClient((prev) => ({ ...prev, firstName: e.target.value }))}
                  />
                ) : (
                  client.firstName
                )}
              </td>
              <td>
                {editedClient?.id === client.id ? (
                  <input
                    type="text"
                    value={editedClient.lastName}
                    onChange={(e) => setEditedClient((prev) => ({ ...prev, lastName: e.target.value }))}
                  />
                ) : (
                  client.lastName
                )}
              </td>
              <td>
                {editedClient?.id === client.id ? (
                  <input
                    type="text"
                    value={editedClient.location}
                    onChange={(e) => setEditedClient((prev) => ({ ...prev, location: e.target.value }))}
                  />
                ) : (
                  client.location
                )}
              </td>
              <td className="appointments-field">
                {client.appointments.length > 0 ? (
                  <ul className="appointment-list">
                    {client.appointments.map((appointment, index) => (
                      <li key={index} className="appointment-item">
                        {editedAppointment.clientID === client.id &&
                          editedAppointment.appointment?.getTime() === appointment.getTime() ? (
                          <>
                            <DatePicker
                              selected={new Date(newAppointment)}
                              onChange={(date) => setNewAppointment(date)}
                              showTimeSelect
                              dateFormat="MM/dd/yyyy HH:mm"
                            />
                            <button onClick={handleSaveAppointment}>
                              <MdDone />
                            </button>
                          </>
                        ) : (
                          <>
                            {format(new Date(appointment), 'MM/dd/yyyy HH:mm')}
                            <button onClick={() => handleEditAppointment(client.id, appointment)}>
                              <MdEdit />
                            </button>
                            <button onClick={() => handleDeleteAppointment(client.id, appointment)}>
                              <AiOutlineDelete />
                            </button>
                          </>
                        )}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No appointments</p>
                )}
              </td>

              <td>
                {editedClient?.id === client.id ? (
                  <button onClick={handleSaveClient}>
                    <MdDone />
                  </button>
                ) : (
                  <button onClick={() => handleEditClient(client)}>
                    <AiOutlineEdit />
                  </button>
                )}
              </td>
              <td>
                <div className="add-appointment-container">
                  <div className="date-picker-wrapper">
                    <DatePicker
                      selected={newAppointment}
                      onChange={(date) => setNewAppointment(date)}
                      showTimeSelect
                      dateFormat="MM/dd/yyyy HH:mm"
                      placeholderText="Select Date and Time"
                      onClickOutside={() => setShowDatePicker(false)}
                    />
                    <button
                      className="calendar-icon"
                      onClick={() => setShowDatePicker(!showDatePicker)}
                    >
                      <AiOutlineCalendar />
                    </button>
                  </div>
                  <button onClick={() => handleAddAppointment(client.id)}>
                    <MdAdd /> Add
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        className={`show-calendar-button ${showCalendar ? 'hide' : ''}`}
        onClick={() => setShowCalendar(!showCalendar)}
      >
        {showCalendar ? 'Hide Calendar' : 'Show Calendar'}
      </button>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={showDeleteModal}
        onRequestClose={() => {
          setShowDeleteModal(false);
          setShowDeleteConfirmation(false); // Close confirmation modal when closing delete modal
        }}
        contentLabel="Confirm Delete"
        className="modal delete-modal center"
        overlayClassName="overlay"
      >
        <h2>Confirm Delete</h2>
        <p>Are you sure you want to delete this appointment?</p>
        <button onClick={() => setShowDeleteConfirmation(false)}>Cancel</button>
        <button onClick={confirmDeleteAppointment}>Delete</button>
      </Modal>

      {/* Additional Confirmation Modal for Delete */}
      <Modal
        isOpen={showDeleteConfirmation}
        onRequestClose={() => setShowDeleteConfirmation(false)}
        contentLabel="Delete Confirmation"
        className="modal delete-confirmation-modal center"
        overlayClassName="overlay"
      >
        <h2>Appointment Deleted</h2>
        <p>The appointment has been successfully deleted.</p>
        <button onClick={() => setShowDeleteConfirmation(false)}>OK</button>
      </Modal>

      {showCalendar && <CalendarPage appointments={clients} setShowCalendar={setShowCalendar} />}

      {/* Toast Notifications */}
      <ToastContainer />
    </div>
  );
};

export default FitnessTrainer;
