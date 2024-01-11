// import React from 'react';
import React, { useState } from 'react';
import './courselist.css';
import Modal from "react-modal";
import Registerclassform from "./registerclassform";
import { Link } from "react-router-dom";
import { useEffect } from 'react';
import useApi from '../../hooks/useApi';



const Courselist = ({org}) => {
    const api = useApi()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [schedule, setSchedule] = useState([{
      date: "",
      course: { name: "" },
      status: "",
      volunteer: { name: " ", email: " " },
    }]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  function show (){
    console.log(schedule)
  
  }
useEffect(() => {

  fetch(`${api}/schedule/organization/${org?._id}`,
    {
      method: "GET",
    }
)
.then((response) => {
  return response.json().then((data) => ({
    status: response.status,
    data: data,
  }));
})
.then((result) => {
  const { status, data } = result;

  if (status !== 200) {
    console.log("no schedules");
    return;
  }
  console.log(data)
  setSchedule(data);
})
.catch((error) => {
  //console.error("Error fetching: ", error);
});
}, [org]);

  return (
    <div>
        <div className="table-wrapper">
      
        <h3 className='course-list-title' onClick={show}>Current Courses</h3>
        <table className='course-list'>
            <tr>
           <th>Date</th>
           <th>Time</th>
           <th>Event</th>
           <th>Instructor Signed Up</th>
           <th>Instructor Information</th>
           </tr>
           {schedule.map((item) => (
      <tr key={item._id}>
        <td>{new Date(item.timeframe).toLocaleDateString()}</td>
        <td>{new Date(item.timeframe).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
        <td>{item.course.name}</td>
        <td style={{ color: item.status ? 'green' : 'red' }}>
          {item.status ? 'Yes' : 'No'}
        </td>
        <td>
          {item.volunteer ? `Name: ${item.volunteer.name}; Email: ${item.volunteer.email}` : ""}
        </td>
      </tr>
    ))}
        </table>
        <br/>
        <div className='courselist-btn-styling'>
        
        <button className='courselist-btn'onClick={openModal} 
        style={{
            marginLeft: '80px',
            textDecoration: 'none',
             padding: '10px',
             background: 'rgb(148, 13, 13)',
             color: 'white',
             borderRadius: '30px',
             border: 'none',
             cursor: 'pointer',
             width: '30%',
             textAlign: 'center',
             fontSize: '1em'
            }}
            >Request To Add Opportunities</button>
        </div>

        {/* Modal */}
        <Modal 
        isOpen={isModalOpen} 
        onRequestClose={closeModal}  
        style={{
          content: {
            width: "700px",
            maxHeight: "70%",
            margin: "auto",
          },
        }}>
          <h2>Volunteer Request Form</h2>
          <br/>
          <br/>
          {/* Add modal content here */}
          <Registerclassform org={org}/>

          {/* <button onClick={closeModal}>Close</button> */}
        </Modal>
        
      </div>

      </div>
    
  )
}

export default Courselist;

