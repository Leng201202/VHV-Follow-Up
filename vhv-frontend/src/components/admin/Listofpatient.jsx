import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Loader from "../common/Loader";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap-icons/font/bootstrap-icons.css";

const Listofpatient = () => {
  const showListofPatientApi = "https://vhv-backend-944519399532.us-central1.run.app/admin/listofpatient";
  const sendDataApi = "https://vhv-backend-944519399532.us-central1.run.app/admin/sendData";

  const [patient, setPatient] = useState([]); // Array of patients
  const [selectedPatients, setSelectedPatient] = useState([]); // Array of selected patient IDs
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state

  // Handle individual selection of a patient
  const handleCheckboxChange = (id) => {
    setSelectedPatient((prevSelected) => 
      prevSelected.includes(id) 
        ? prevSelected.filter((patientId) => patientId !== id)  // Remove if already selected
        : [...prevSelected, id]  // Add if not selected
    );
  };

  // Handle Select All checkbox
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      const allIds = patient.map((patient) => patient.id);
      setSelectedPatient(allIds);  // Select all patients
    } else {
      setSelectedPatient([]);  // Deselect all patients
    }
  };

  // Handle Delete action for individual patient
  const handleDelete = async (id) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${showListofPatientApi}/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete patient");
      }
      // Update state after deletion
      setPatient((prevPatients) => prevPatients.filter((item) => item.id !== id));
      setSelectedPatient((prevSelected) => prevSelected.filter((patientId) => patientId !== id));
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle the Submit action (send selected patient data)
  const handleSubmit = async () => {
    const selectedData = patient.filter((patient) =>
      selectedPatients.includes(patient.id)
    );

    if (selectedData.length === 0) {
      alert("No items selected!");
      return;
    }

    try {
      setIsLoading(true);
      const response = await axios.post(sendDataApi, selectedData, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.status === 200) {
        alert("Data sent successfully to VHV users!");
        setSelectedPatient([]); // Clear selected checkboxes
      } else {
        alert("Failed to send data.");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred while sending data.");
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch patients from the API when the component mounts
  useEffect(() => {
    getPatients();
  }, []);

  const getPatients = async () => {
    try {
      const response = await axios.get(showListofPatientApi);
      setPatient(response.data);  // Set the patient data to state
    } catch (err) {
      console.error("Error fetching patient list:", err.message, err.response);
    }
  };

  // Display a message when no patients are found
  if (!Array.isArray(patient) || patient.length === 0) {
    return <h1 className="text-center mt-5">No Patient List found</h1>;
  } else {
    return (
      <div className="container mt-5">
        {isLoading && <Loader />}
        {error && <p className="text-danger">Error: {error}</p>}

        <h2 className="mb-4">List of Patients</h2>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <span className="text-muted">Selected: {selectedPatients.length}</span>
          </div>
        </div>

        <table className="table table-hover table-bordered">
          <thead className="table-white">
            <tr>
              <th>
                <input
                  type="checkbox"
                  onChange={handleSelectAll}
                  checked={selectedPatients.length === patient.length && patient.length > 0}
                />
              </th>
              <th>Passport ID or National ID</th>
              <th>Name</th>
              <th>Phone number</th>
              <th>Address</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {patient.map((patientData) => (
              <tr key={patientData.id}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedPatients.includes(patientData.id)}
                    onChange={() => handleCheckboxChange(patientData.id)}
                  />
                </td>
                <td>{patientData.passportId}</td>
                <td>{patientData.name}</td>
                <td>{patientData.phNum}</td>
                <td>{patientData.address}</td>
                <td>
                  <Link
                    to={`/admin/listofpatient/${patientData.id}`}
                    className="btn btn-sm btn me-2"
                  >
                    <i className="bi bi-pencil-square"></i> Edit
                  </Link>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(patientData.id)}
                  >
                    <i className="bi bi-trash"></i> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Submit button for selected patients */}
        <button
          className="btn btn-primary"
          onClick={handleSubmit}
          disabled={selectedPatients.length === 0}
        >
          Submit Selected
        </button>
      </div>
    );
  }
};

export default Listofpatient;
