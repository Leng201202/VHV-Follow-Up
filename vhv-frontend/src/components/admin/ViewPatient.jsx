import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const ViewPatient = () => {
  const { id } = useParams(); // Extract patient ID from URL
  const navigate = useNavigate();
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPatientDetails = async () => {
      try {
        const response = await fetch(`https://vhv-backend-944519399532.us-central1.run.app/admin/patientrecordeddata/${id}`); // Use dynamic ID
        if (!response.ok) {
          throw new Error(`Failed to fetch patient details (Status: ${response.status})`);
        }
        const data = await response.json();
        setPatient(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPatientDetails();
  }, [id]);

  if (loading) {
    return <div style={styles.container}>Loading...</div>;
  }

  if (error) {
    return <div style={styles.container}>Error: {error}</div>;
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Patient Details</h1>
      {patient ? (
        <div style={styles.card}>
          <p><strong>First-Name:</strong> {patient.firstName}</p>
          <p><strong>Middle-Name:</strong> {patient.middleName}</p>
          <p><strong>Surname:</strong> {patient.surName}</p>
          <p><strong>Age:</strong> {patient.age}</p>
          <p><strong>BirthDate:</strong> {patient.birthDate}</p>
          <p><strong>Passport ID:</strong> {patient.passportId}</p>
          <p><strong>Contact:</strong> {patient.phNum}</p>
          <p><strong>Address:</strong> {patient.address}</p>
          <p><strong>Blood Type:</strong> {patient.bloodType}</p>
          <p><strong>Patient Saturatin</strong> {patient.typeOfPatient}</p>
          <p><strong>Type of NCDs:</strong> {patient.typeDieases}</p>
        </div>
      ) : (
        <p>No patient details available</p>
      )}
      <button style={styles.backButton} onClick={() => navigate(-1)}>
        Back
      </button>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    color: '#333',
    maxWidth: '600px',
    margin: '0 auto',
    textAlign: 'center',
  },
  heading: {
    color: '#4CAF50',
    marginBottom: '20px',
  },
  card: {
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#f9f9f9',
    textAlign: 'left',
  },
  backButton: {
    display: 'block',
    margin: '20px auto 0',
    padding: '10px 20px',
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
  },
};

export default ViewPatient;
