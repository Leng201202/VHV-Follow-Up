import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../common/Loader";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap-icons/font/bootstrap-icons.css";

const GetPatientList = () => {
  const showListofPatientApi =
    "https://vhv-backend-944519399532.us-central1.run.app/user/listofpatient";
  const [patient, setPatient] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleDelete = async (id) => {
    setIsLoading(true);
    setError(null); // Clear any existing errors
    try {
      const response = await fetch(`${showListofPatientApi}/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete item");
      }
      setPatient((prevPatients) =>
        prevPatients.filter((item) => item.id !== id)
      );
    } catch (err) {
      setError("Failed to delete patient. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getPatients();
  }, []);

  const getPatients = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(showListofPatientApi);
      if (Array.isArray(response.data)) {
        setPatient(response.data);
      } else {
        throw new Error("API response is not an array.");
      }
    } catch (err) {
      console.error("Error fetching patient list:", err.message);
      setError("Failed to fetch patient list. Please try again.");
      setPatient([]); // Fallback to an empty array
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      {isLoading && <Loader />}
      {error && <p className="alert alert-danger">{error}</p>}

      <h2 className="mb-4">Patient List to Recorded</h2>

      <table className="table table-hover table-bordered table-responsive">
        <thead className="table-white">
          <tr>
            <th>Passport & National ID</th>
            <th>Name</th>
            <th>Phone number</th>
            <th>Address</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(patient) && patient.length > 0 ? (
            patient.map((patient) => (
              <tr key={patient.id}>
                <td>{patient.passportId}</td>
                <td>{patient.name}</td>
                <td>{patient.phnum}</td>
                <td>{patient.address}</td>
                <td>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => handleDelete(patient.id)}
                  >
                    <i className="bi bi-trash"></i> Done
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">
                No patients found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default GetPatientList;
