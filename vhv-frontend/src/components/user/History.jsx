import React, { useEffect, useState } from "react";
import axios from "axios";
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
      if (Array.isArray(response.data)) {
        setPatient(response.data);
      } else {
        throw new Error("Unexpected API response format.");
      }
    } catch (err) {
      setError("Failed to fetch patient history. Please try again.");
      setPatient([]); // Ensure fallback to an empty array
    } finally {
      setIsLoading(false);
    }
  };

  // Helper function to format the date
  const formatDate = (dateString) => {
    if (!dateString) return "N/A"; // Handle invalid or missing dates
    const date = new Date(dateString); // Convert to Date object
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    }); // Customize format as needed
  };

  return (
    <div className="container mt-5">
      {isLoading && <Loader />}
      {error && <p className="alert alert-danger">{error}</p>}

      <h2 className="mb-4">History</h2>

      <table className="table table-hover table-bordered table-responsive">
        <thead className="table-white">
          <tr>
            <th>Passport & National ID</th>
            <th>Name</th>
            <th>Phone number</th>
            <th>Address</th>
            <th>Recorded Date</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(patient) && patient.length > 0 ? (
            patient.map((patient) => (
              <tr key={patient.id}>
                <td>{patient.passportId}</td>
                <td>{patient.name}</td>
                <td>{patient.phNum}</td>
                <td>{patient.address}</td>
                <td>{formatDate(patient.recDate)}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">
                No patient history found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default History;
