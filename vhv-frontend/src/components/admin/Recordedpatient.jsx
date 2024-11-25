import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Loader from "../common/Loader";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap-icons/font/bootstrap-icons.css";

const History = () => {
  const showListofHistoryApi =
    "https://vhv-backend-944519399532.us-central1.run.app/user/history";
  const [patient, setPatient] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    getHistory();
  }, []);

  const getHistory = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(showListofHistoryApi);
      setPatient(response.data);
    } catch (err) {
      console.error("Error fetching patient list:", err.message, err.response);
    }finally{
      setIsLoading(false);
    }
  };
   // Helper function to format the date
   const formatDate = (dateString) => {
    const date = new Date(dateString);  // Convert to Date object
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });  // Customize format as needed
  };


  if (patient.length === 0) {
    return <h1 className="text-center mt-5">No Patient Recorded</h1>;
  } else {
    return (
      <div className="container mt-5">
        {isLoading && <Loader />}
        {error && <p className="text-danger">Error: {error}</p>}

        <h2 className="mb-4">Recorded Patients</h2>
  

        <table className="table table-hover table-bordered">
          <thead className="table-white">
            <tr>
              <th>Passport & National ID</th>
              <th>Name</th>
              <th>Phone number</th>
              <th>Address</th>
              <th>Recorded Date</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
              {Array.isArray(patient) && patient.map((patient, i) => (
                  <tr key={patient.id}>
                    <td>{patient.passportId}</td>
                    <td>{patient.name}</td>
                    <td>{patient.phNum}</td>
                    <td>{patient.address}</td>
                    <td>{formatDate(patient.recDate)}</td>
                    <td>
                      <Link
                        to={`${patient.id}`}
                        className="btn btn-sm btn me-2"
                      >
                        <i className="bi bi-pencil-square"></i> Details
                      </Link>
                    </td>
                  </tr>
                ))}
          
          </tbody>
        </table>
      </div>
    );
  }
};

export default History;
