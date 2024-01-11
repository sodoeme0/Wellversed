import React, { useState } from "react";
import User from "./user.css";
import { useEffect } from "react";
import DatePicker from 'react-date-picker';
import useApi from "../../hooks/useApi";
const Registerclassform = ({org}) => {
  const [courses, setCourses] = useState([{ name: "", _id: "" }]);
  const [course, setCourse] = useState({desc:""}); // Initialize course state
  const [selectedDate, setSelectedDate] = useState(new Date());
  const api = useApi()


  const [formData, setFormData] = useState({
    course: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCourse = (event) => {
    const selectedCourseId = event.target.value;

    const selectedCourse = courses.find(
      (course) => course._id === selectedCourseId
    );
    setCourse(selectedCourse);
  };

  const handleSubmit = (event) => { 
    event.preventDefault();
 //post form

 fetch(`${api}/schedule/create`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({course: course._id, "timeframe": selectedDate, organization: org._id }),
})
  .then((response) => {
    return response.json().then((data) => ({
      status: response.status,
      data: data,
    }));
  })
  .then((result) => {
    const { status, data } = result;
    console.log("Response Status:", status);
    console.log("Response Data:", data);
    

    // Handle the response from the server
    console.log(data);
    window.location.reload()
  })
  .catch((error) => {
    console.error("Error fetching: ", error);
  });
  };



  useEffect(() => {
    fetch(`${api}/course`, {
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

        if (status != 200) {
          alert(data.message);
          return;
        }
        setCourses(data);
      })
      .catch((error) => {
        //console.error("Error fetching: ", error);
      });


     
  }, []);


  return (
    <div>
      {/* <h2>Registration Form</h2> */}
      <form className="req-form" onSubmit={handleSubmit}>
        
      <div>
        <label className="req-label">Select Date:</label>
        <input
          className="req-input"
          type="datetime-local"
          name="selectedDate"
          value={selectedDate}
          onChange={(event) => setSelectedDate(event.target.value)}
        />
      </div>
        
        <div>
          <label className="req-label">Name of Course:</label>
          <select
            className="req-input"
            name="course"
            value={formData.course}
            onChange={(event) => {
              handleChange(event); // Call your existing handleChange function
              handleCourse(event);
            }}
          >
            <option value="">Select a course</option>
            {courses.map((course) => (
              <option key={course._id} value={course._id}>
                {course.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="req-label">Course Description:</label>
        </div>
        <textarea
          className="req-input"
          name="courseDesc"
          value={course!=undefined ? course.desc : " "}
          disabled
        />
        <button className="req-btn" type="submit">
          Register
        </button>
      </form>
    </div>
  );
};

export default Registerclassform;
