package com.vhvfollowup.VHV_backend.Service;

import com.vhvfollowup.VHV_backend.model.ListofPatient;
import com.vhvfollowup.VHV_backend.model.PatientList;
import com.vhvfollowup.VHV_backend.repo.ListofPatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VhvService {
    @Autowired
    private ListofPatientRepository listofPatientRepository;
    public void processAndSaveListofPatients(List<PatientList> selectedPatients){
        for(PatientList patientList:selectedPatients){
            ListofPatient listofPatient=new ListofPatient();
            listofPatient.setPassportId(patientList.getPassportId());
            listofPatient.setName((patientList.getName()));
            listofPatient.setPhnum(patientList.getPhNum());
            listofPatient.setId(patientList.getId());
            listofPatient.setAddress(patientList.getAddress());

            listofPatientRepository.save(listofPatient);
        }
    }
}
