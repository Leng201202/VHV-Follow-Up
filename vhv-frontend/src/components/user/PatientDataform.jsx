import axios from "axios";
import React, { useState } from "react";

const PatientDataForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    surName: "",
    birthDate: "",
    age: "",
    passportId: "",
    bloodType: "",
    typeOfPatient: "",
    typeDieases: "",
    address: "",
    phNum: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    console.log("Form Data Submitted:", formData);
  
    try {
      // Make POST request to backend API
      const response = await fetch("https://vhv-backend-944519399532.us-central1.run.app/user/recordpatientdata", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Indicate JSON data
        },
        body: JSON.stringify(formData), // Convert formData to JSON
      });
  
      // Check if the response is successful
      if (!response.ok) {
        const errorText = await response.text(); // Read server's error message
        console.error("Server Error:", errorText);
        alert(`Error: ${errorText}`);
        return;
      }
  
      // Parse the response (assuming it's JSON)
      const result = await response.text();
      console.log("Data Submitted Successfully:", result);
  
      // Reset the form or show a success message
      alert("Patient data submitted successfully!");
    } catch (error) {
      console.error("Network Error:", error);
      alert("A network error occurred. Please try again later.");
    }
  };
  
  return (
    <div className="form-container" style={{ maxWidth: "900px", margin: "20px auto", backgroundColor: "#f9f9f9", padding: "20px", borderRadius: "10px" }}>
      <h2 style={{ textAlign: "center", color: "#555" }}>Record Patient Information</h2>
      <form onSubmit={handleSubmit} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
        {/* First Name */}
        <div>
          <label style={{ display: "block", fontWeight: "bold" }}>First Name</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            style={{ width: "100%", padding: "10px", borderRadius: "4px", border: "1px solid #ccc" ,borderRadius:"15px" }}
            required
          />
        </div>
        {/* Middle Name */}
        <div>
          <label style={{ display: "block", fontWeight: "bold" }}>Middle Name</label>
          <input
            type="text"
            name="middleName"
            value={formData.middleName}
            onChange={handleChange}
            style={{ width: "100%", padding: "10px", borderRadius: "4px", border: "1px solid #ccc",borderRadius:"15px" }}
          />
        </div>
        {/* Surname */}
        <div>
          <label style={{ display: "block", fontWeight: "bold" }}>Surname</label>
          <input
            type="text"
            name="surName"
            value={formData.surName}
            onChange={handleChange}
            style={{ width: "100%", padding: "10px", borderRadius: "4px", border: "1px solid #ccc",borderRadius:"15px" }}
            required
          />
        </div>
        {/* Birth Date */}
        <div>
          <label style={{ display: "block", fontWeight: "bold" }}>Birth Date</label>
          <input
            type="date"
            name="birthDate"
            value={formData.birthDate}
            onChange={handleChange}
            style={{ width: "100%", padding: "10px", borderRadius: "4px", border: "1px solid #ccc",borderRadius:"15px" }}
            required
          />
        </div>
        {/* Age */}
        <div>
          <label style={{ display: "block", fontWeight: "bold" }}>Age</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            style={{ width: "100%", padding: "10px", borderRadius: "4px", border: "1px solid #ccc",borderRadius:"15px" }}
            required
          />
        </div>
        {/* Passport/National ID */}
        <div>
          <label style={{ display: "block", fontWeight: "bold" }}>Passport/Nation ID</label>
          <input
            type="text"
            name="passportId"
            value={formData.passportId}
            onChange={handleChange}
            style={{ width: "100%", padding: "10px", borderRadius: "4px", border: "1px solid #ccc",borderRadius:"15px" }}
            required
          />
        </div>
        {/* Blood Type */}
        <div>
          <label style={{ display: "block", fontWeight: "bold" }}>Blood Type</label>
          <input
            type="text"
            name="bloodType"
            value={formData.bloodType}
            onChange={handleChange}
            style={{ width: "100%", padding: "10px", borderRadius: "4px", border: "1px solid #ccc",borderRadius:"15px" }}
            required
          />
        </div>
        {/* Type of Patient */}
        <div>
          <label style={{ display: "block", fontWeight: "bold" }}>Type of Patient</label>
          <div>
            <label style={{fontSize:'17px'}}>
              <input type="radio" name="typeOfPatient" value="Minority affected" onChange={handleChange} style={{width:'20px',height:'20px',border:'4px solid grey',borderRadius:'8px',cursor:'pointer'}}/>
              Minority affected
            </label><br/>
            <label>
              <input type="radio" name="typeOfPatient" value="A significant affected" onChange={handleChange} style={{width:'20px',height:'20px',border:'4px solid grey',borderRadius:'8px',cursor:'pointer'}}/>
              A significant affected
            </label><br/>
            <label>
              <input type="radio" name="typeOfPatient" value="Entirely affected" onChange={handleChange} style={{width:'20px',height:'20px',border:'4px solid grey',borderRadius:'8px',cursor:'pointer'}} />
               Entirely affected
            </label>
          </div>
        </div>
        {/* Diseases */}
      <div style={{ gridColumn: "span 2" }}>
        <label style={{ display: "block", fontWeight: "bold" }}>Type of NCDs Diseases</label>
        <div>
          <label style={{ fontSize: "15px" }}>
            <input
              type="radio"
              name="typeDieases"
              value="Hypertension"
              checked={formData.typeDieases === "Hypertension"}
              onChange={handleChange}
              style={{ width: "20px", height: "20px", border: "4px solid grey", cursor: "pointer" }}
            />
            Hypertension
          </label><br />
          <label style={{ fontSize: "15px" }}>
            <input
              type="radio"
              name="typeDieases"
              value="Obesity"
              checked={formData.typeDieases === "Obesity"}
              onChange={handleChange}
              style={{ width: "20px", height: "20px", border: "4px solid grey", cursor: "pointer" }}
            />
            Obesity
          </label><br />
          <label style={{ fontSize: "15px" }}>
            <input
              type="radio"
              name="typeDieases"
              value="High Blood Pressure"
              checked={formData.typeDieases === "High Blood Pressure"}
              onChange={handleChange}
              style={{ width: "20px", height: "20px", border: "4px solid grey", cursor: "pointer" }}
            />
            High Blood Pressure
          </label><br />
          <label style={{ fontSize: "15px" }}>
            <input
              type="radio"
              name="typeDieases"
              value="Diabetes"
              checked={formData.typeDieases === "Diabetes"}
              onChange={handleChange}
              style={{ width: "20px", height: "20px", border: "4px solid grey", cursor: "pointer" }}
            />
            Diabetes
          </label><br />
          <label style={{ fontSize: "15px" }}>
            <input
              type="radio"
              name="typeDieases"
              value="CVS Risk"
              checked={formData.typeDieases === "CVS Risk"}
              onChange={handleChange}
              style={{ width: "20px", height: "20px", border: "4px solid grey", cursor: "pointer" }}
            />
            CVS Risk
          </label><br />
          <label style={{ fontSize: "15px" }}>
            <input
              type="radio"
              name="typeDieases"
              value="Kidney Diseases"
              checked={formData.typeDieases === "Kidney Diseases"}
              onChange={handleChange}
              style={{ width: "20px", height: "20px", border: "4px solid grey", cursor: "pointer" }}
            />
            Kidney Diseases
          </label>
        </div>
      </div>

        {/* Address */}
        <div>
          <label style={{ display: "block", fontWeight: "bold" }}>Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            style={{ width: "100%", padding: "10px", borderRadius: "4px", border: "1px solid #ccc" }}
            required
          />
        </div>
        {/* Phone Number */}
        <div>
          <label style={{ display: "block", fontWeight: "bold" }}>Phone Number</label>
          <input
            type="text"
            name="phNum"
            value={formData.phNum}
            onChange={handleChange}
            style={{ width: "100%", padding: "10px", borderRadius: "4px", border: "1px solid #ccc" }}
            required
          />
        </div>
        {/* Submit Button */}
        <div style={{ gridColumn: "span 2", textAlign: "center" }}>
          <button
            type="submit"
            style={{
              padding: "10px 15px",
              backgroundColor: "grey",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default PatientDataForm;
