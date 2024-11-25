package com.vhvfollowup.VHV_backend.repo;

import com.vhvfollowup.VHV_backend.model.PatientRecordedData;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PatientRecordedDataRepository extends JpaRepository<PatientRecordedData,Long> {
}
