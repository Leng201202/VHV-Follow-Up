package com.vhvfollowup.VHV_backend.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "ListofPatient")
public class ListofPatient {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "passport_id")
    private String passportId;
    private String Name;
    private String Phnum;
    private String Address;
}