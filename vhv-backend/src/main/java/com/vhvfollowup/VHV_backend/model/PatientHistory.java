package com.vhvfollowup.VHV_backend.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.Date;

@Entity
@Data
@Table(name = "History")
public class PatientHistory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String passportId;
    private String Name;
    private String phNum;
    private String Address;
    @Column(name = "rec_date")
    private LocalDateTime recDate;
}
