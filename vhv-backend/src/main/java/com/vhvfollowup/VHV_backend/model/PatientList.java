package com.vhvfollowup.VHV_backend.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "patientList")
public class PatientList {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String passportId;
    private String Name;
    private String phNum;
    private String Address;
}
