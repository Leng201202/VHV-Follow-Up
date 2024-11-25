package com.vhvfollowup.VHV_backend.repo;

import com.vhvfollowup.VHV_backend.model.PatientList;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PatientListRepository extends JpaRepository<PatientList,Long> {
    List<PatientList> findAll();
}
