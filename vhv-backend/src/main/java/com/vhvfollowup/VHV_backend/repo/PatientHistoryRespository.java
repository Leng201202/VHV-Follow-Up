package com.vhvfollowup.VHV_backend.repo;

import com.vhvfollowup.VHV_backend.model.PatientHistory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PatientHistoryRespository extends JpaRepository<PatientHistory,Long> {
    List<PatientHistory> findAll();
}
