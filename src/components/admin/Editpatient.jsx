import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Loader from "../common/Loader";
import "./Patient.css";

const Editpatient = () => {
  const [patient, setPatient] = useState({
    passportId: "",
    name: "",
    phNum: "",
    address: "",
  });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const apiBaseUrl = "https://vhv-backend-944519399532.us-central1.run.app/admin/listofpatient";

  useEffect(() => {
    fetchPatientDetails();
  }, []);

  const fetchPatientDetails = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${apiBaseUrl}/${id}`);
      setPatient(response.data || { passportId: "", name: "", phNum: "", address: "" }); // Ensure default values
    } catch (err) {
      console.error("Error fetching patient details:", err.message);
      setError("Failed to fetch patient details.");
      setPatient({ passportId: "", name: "", phNum: "", address: "" }); // Ensure default values
    } finally {
      setIsLoading(false);
    }
  };

  const handelInput = (e) => {
    const { name, value } = e.target;
    setPatient({ ...patient, [name]: value });
  };

  const handelSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const response = await axios.put(`${apiBaseUrl}/${id}`, patient, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        console.log("Patient updated successfully!");
        navigate("/admin/listofpatient"); // Navigate to the patient list
      } else {
        setError("Failed to update patient info.");
      }
    } catch (err) {
      console.error("Error updating patient info:", err.message);
      setError("An error occurred while updating patient info.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="patient-form">
      <div className="heading">
        {isLoading && <Loader />}
        {error && <p className="error">{error}</p>}
        <p>Edit Patient Info</p>
      </div>
      <form onSubmit={handelSubmit}>
        <div className="mb-3">
          <label htmlFor="Passport" className="form-label">
            Passport Number or National ID
          </label>
          <input
            type="text"
            className="form-control"
            id="Passport"
            name="passportId"
            value={patient.passportId||""}
            onChange={handelInput}
          />
        </div>
        <div className="mb-3 mt-3">
          <label htmlFor="Name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="Name"
            name="name"
            value={patient.name || ""}
            onChange={handelInput}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="Phone" className="form-label">
            Phone Number
          </label>
          <input
            type="tel"
            className="form-control"
            id="Phone"
            name="phNum"
            value={patient.phNum || ""}
            onChange={handelInput}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="Address" className="form-label">
            Address
          </label>
          <textarea
            className="form-control"
            id="Address"
            name="address"
            value={patient.address || ""}
            onChange={handelInput}
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary submit-btn">
          Save
        </button>
      </form>
    </div>
  );
};

export default Editpatient;
