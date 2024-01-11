import React, { useEffect, useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import useApi from "../../hooks/useApi";
const Calendar = ({ vol }) => {
  const api = useApi()
  const [schedule, setSchedule] = useState([
    {
      timeframe: "",
      course: {
        name: "",
      },
      organization: {
        ref: {
          name: "",
          phone: "",
        },
        name: "",
      },
    },
  ]);

  useEffect(() => {
    fetch(`${api}/schedule/volunteer/${vol._id}`, {
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

        if (status !== 200) {
          console.log("no schedules");
          return;
        }
        console.log(data);
        setSchedule(data);
      })
      .catch((error) => {
        // Handle error
      });
  }, [vol]);

  return (
    <div>
      <div className="table-wrapper">
        <table className="course-list">
          <thead>
            <tr>
              <th>Date</th>
              <th>Time</th>
              <th>Course</th>
              <th>Org</th>
              <th>Ref Name</th>
              <th>Ref Phone</th>
            </tr>
          </thead>
          <tbody>
            {schedule.map((entry, index) => (
              <tr key={index}>
                <td>{new Date(entry.timeframe).toLocaleDateString()}</td>
                <td>
                  {new Date(entry.timeframe).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </td>
                <td>{entry.course.name}</td>
                <td>{entry.organization.name}</td>
                <td>{entry.organization.ref.name}</td>
                <td>{entry.organization.ref.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Calendar;
