package com.vhvfollowup.VHV_backend.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Data;



import java.util.Date;
@Entity
@Data
@Table(name = "patientRecordedData")
public class PatientRecordedData {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotNull(message = "First name is required")
    private String firstName;

    private String middleName;
    @NotNull(message = "Surname is required")
    private String surName;
    @NotNull(message = "Birth date is required")
    private Date birthDate;
    @NotNull(message="Age is required")
    private String age;
    @NotNull(message = "Passport ID is required")
    private String passportId;
    @NotNull(message = "Blood type is required")
    private String bloodType;
    @NotNull(message = "Type of patient is required")
    private String typeOfPatient;
    @NotNull(message = "Diseases are required")
    private String typeDieases;
    @NotNull(message = "Address is required")
    private String address;
    @NotNull(message = "Phone number is required")
    private String phNum;

}
