// css
import "./schedule.css";

// from react-big-calendar package
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Modal from "react-modal";
import React, { useState, useEffect } from "react";
import DatePicker from "react-date-picker";
import useAuth from "../../hooks/useAuth";
import useApi from "../../hooks/useApi";
// icons
// import { FaCheck } from "react-icons/fa";
// import { FaTrashAlt } from "react-icons/fa";

const locales = {
  "en-US": require("date-fns/locale/en-US"),
};
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const Mainschedule = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [vol] = useState(useAuth());
  const [allEvents, setAllEvents] = useState([]);
  const api = useApi()
  const [isClosingModal, setIsClosingModal] = useState(false);

  function handleEventClick(event) {
    setSelectedEvent(event);
    setIsModalOpen(true);
  }

  const [isSignedUp, setIsSignedUp] = useState(false);

  function handleAddClass() {
    console.log(vol)
    fetch(`${api}/schedule/pickup`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        volunteer: vol.email, // Replace with the actual volunteer ID
        scheduleId: selectedEvent.id, // Assuming you have an "id" property in the selectedEvent
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error adding class:", error);
      });
  }
   
  const [isDropped, setIsDropped] = useState(false);

  function handleDropClass() {
    
    fetch(`${api}/schedule/drop/${selectedEvent.id}`, {
      method: "PUT",
    })
      .then((response) => response.json())
      .then((data) => {
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error dropping class:", error);
      });
  }

  useEffect(() => {
    fetch(`${api}/schedule`, {
      method: "GET",
    })
      .then((response) => {
        return response.json().then((data) => ({
          status: response.status,
          data: data,
        }));
      })
      .then((result) => {
        const { status, data } = result;
        const filteredEvents = data
          .filter((event) => {
            console.log(event)
            return !event.status || event.volunteer?.email === vol?.email;
          })
          .map((event) => ({
            title: event.course.name,
            start: new Date(event.timeframe), // Calendar portion of timeframe
            end: new Date(event.timeframe), // Calendar portion of timeframe
            time: new Date(event.timeframe).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }), // Clock portion of timeframe
            description: event.course.desc,
            org: event.organization.ref.name,
            id: event._id,
            status: event.status,
          }));

        setAllEvents(filteredEvents);
      });
  }, []);



  function handleEventClick(event) {
    setSelectedEvent(event);
    setIsModalOpen(true);
  }

  return (
    <div>
      <div className={isModalOpen ? "hide-dates" : ""}>
        <div className={isModalOpen ? "hide-calendar-content" : ""}>
          <Calendar
            localizer={localizer}
            events={allEvents}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500, margin: "50px" }}
            onSelectEvent={handleEventClick} // Call the handleEventClick function on event click
          />
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => {
          setIsClosingModal(true); // Set the flag when the modal is closing
          setIsModalOpen(false);
        }}
        contentLabel="Event Details"
        style={{
          content: {
            width: "400px",
            maxHeight: "70%",
            margin: "auto",
          },
        }}
      >
        {selectedEvent && (
          <div>
            <h2>{selectedEvent.title}</h2>
            <p>Organization: {selectedEvent.org}</p>{" "}
            {/* Display the selectedEvent.org */}
            <p>Day: {selectedEvent.start.toLocaleDateString()}</p>{" "}
            {/* Display only the date */}
            <p>Time: {selectedEvent.time}</p>{" "}
            {/* Display the selectedEvent.time */}
            <h2>Course Description</h2>
            <p>{selectedEvent.description.toString()}</p>
            {selectedEvent.status ? (
              <button onClick={handleDropClass}>Drop Class</button>
            ) : (
              <button onClick={handleAddClass}>Pickup Class</button>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Mainschedule;
