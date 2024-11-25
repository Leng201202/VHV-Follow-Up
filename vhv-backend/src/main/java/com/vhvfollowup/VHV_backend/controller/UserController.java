package com.vhvfollowup.VHV_backend.controller;

import com.vhvfollowup.VHV_backend.Service.UserService;
import com.vhvfollowup.VHV_backend.model.ListofPatient;
import com.vhvfollowup.VHV_backend.model.PatientHistory;
import com.vhvfollowup.VHV_backend.model.PatientRecordedData;
import com.vhvfollowup.VHV_backend.model.User;
import com.vhvfollowup.VHV_backend.repo.ListofPatientRepository;
import com.vhvfollowup.VHV_backend.repo.PatientHistoryRespository;
import com.vhvfollowup.VHV_backend.repo.PatientRecordedDataRepository;
import jakarta.validation.Valid;
import org.apache.tomcat.util.net.openssl.ciphers.Authentication;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@CrossOrigin
@RestController
@RequestMapping("user")
public class UserController {
    @Autowired
    private UserService userService;
    @Autowired
    private ListofPatientRepository listofPatientRepository;
    @Autowired
    private PatientHistoryRespository patientHistoryRespository;
    @Autowired
    private PatientRecordedDataRepository patientRecordedDataRepository;
    @GetMapping("/listofpatient")
    public ResponseEntity<?> retrieveListofPatient() {
        List<ListofPatient> listofPatients = listofPatientRepository.findAll();
        if (listofPatients.isEmpty()) {
            // Return a message that the list is empty
            return new ResponseEntity<>("No patient list to records found.", HttpStatus.OK);
        }
        return new ResponseEntity<>(listofPatients, HttpStatus.OK);
    }
    @DeleteMapping("/listofpatient/{id}")
    public ResponseEntity<?> deletePatient(@PathVariable Long id) {
        // Check if the patient exists
        Optional<ListofPatient> patientOptional = listofPatientRepository.findById(id);
        if (patientOptional.isPresent()) {
            listofPatientRepository.deleteById(id); // Delete the patient
            return new ResponseEntity<>("Patient deleted successfully", HttpStatus.OK);
        } else {
            // If the patient does not exist, return a 404 error
            return new ResponseEntity<>("Patient not found", HttpStatus.NOT_FOUND);
        }
    }
    @PostMapping("/recordpatientdata")
    public ResponseEntity<String> createPatient(@RequestBody PatientRecordedData patientRecordedData) {
        // Save the patient record
        patientRecordedDataRepository.save(patientRecordedData);
        // Create and populate PatientHistory object
        PatientHistory patientHistory = new PatientHistory();
        patientHistory.setId(patientRecordedData.getId());
        patientHistory.setPassportId(patientRecordedData.getPassportId());
        patientHistory.setName(patientRecordedData.getFirstName()+" "+patientRecordedData.getMiddleName()+" "+patientRecordedData.getSurName());
        patientHistory.setPhNum(patientRecordedData.getPhNum());
        patientHistory.setAddress(patientRecordedData.getAddress());
        LocalDateTime currentDate = LocalDateTime.now();
        patientHistory.setRecDate(currentDate);

        // Save the patient history record
        patientHistoryRespository.save(patientHistory);
        // Return success response
        return new ResponseEntity<>("Recorded",HttpStatus.OK);
    }
    @GetMapping("/history")
    public ResponseEntity<?> retrievePatientHistory() {
        List<PatientHistory> patientHistories = patientHistoryRespository.findAll();
        if (patientHistories.isEmpty()) {
            // Return a message that the list is empty
            return new ResponseEntity<>("No patient history records found.", HttpStatus.OK);
        }
        return new ResponseEntity<>(patientHistories, HttpStatus.OK);
    }
    //profile
    @GetMapping("/my-profile")
    public ResponseEntity<?> getMyProfile(@RequestParam String username) {
        // Fetch the user by username
        User user = userService.getUserByUsername(username);

        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }

        // Create a profile response
        Map<String, Object> profile = new HashMap<>();
        profile.put("username", user.getUsername());
        profile.put("email", user.getEmail());
        profile.put("role", user.getRole()); // Optional if you don't have roles

        return ResponseEntity.ok(profile);
    }

}


