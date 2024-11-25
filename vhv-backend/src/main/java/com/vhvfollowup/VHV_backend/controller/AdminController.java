package com.vhvfollowup.VHV_backend.controller;

import com.vhvfollowup.VHV_backend.Service.UserService;
import com.vhvfollowup.VHV_backend.Service.VhvService;
import com.vhvfollowup.VHV_backend.model.PatientHistory;
import com.vhvfollowup.VHV_backend.model.PatientList;
import com.vhvfollowup.VHV_backend.model.PatientRecordedData;
import com.vhvfollowup.VHV_backend.model.User;
import com.vhvfollowup.VHV_backend.repo.ListofPatientRepository;
import com.vhvfollowup.VHV_backend.repo.PatientHistoryRespository;
import com.vhvfollowup.VHV_backend.repo.PatientListRepository;
import com.vhvfollowup.VHV_backend.repo.PatientRecordedDataRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
@CrossOrigin
@RestController
@RequestMapping("/admin")
public class AdminController {
    @Autowired
    private UserService userService;
    @Autowired
    PatientListRepository patientListRepository;
    @Autowired
    ListofPatientRepository listofPatientRepository;
    @Autowired
    private VhvService vhvService;
    @Autowired
    PatientHistoryRespository patientHistoryRespository;
    @Autowired
    PatientRecordedDataRepository patientRecordedDataRepository;

    //For Edit and Sent List of Patient from patient data from Hospital

    @GetMapping("listofpatient")
    public ResponseEntity<List<PatientList>> retrieveAll() {
        // TODO: get all concert
        List<PatientList> patientList = patientListRepository.findAll();

        return new ResponseEntity<>(patientList, HttpStatus.OK);

    }
    @GetMapping("listofpatient/{id}")
    public ResponseEntity<PatientList> retrievePatientId(@PathVariable("id") long id) { // TODO: add @PathVariable for id

        // TODO: find concert by ID suing em.find(...
        Optional<PatientList> patientList = patientListRepository.findById(id);
        if (patientList.isPresent()) {
            PatientList entity = patientList.get();
            return new ResponseEntity<>(entity, HttpStatus.OK);
        } else {
            // Handle the case when no entity is found
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

    }
    @PostMapping("sendData")
    public ResponseEntity<String > sendDatatoUser(@RequestBody List<PatientList> selectedPatients){
        try{
            vhvService.processAndSaveListofPatients(selectedPatients);
            return ResponseEntity.status(HttpStatus.OK).body("Data successfully sent to VHV staff");
        } catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to send data.");
        }
    }
    @PutMapping("listofpatient/{id}")
    public ResponseEntity<String> updatePatientList(@RequestBody PatientList patientList, @PathVariable("id") long id) {
        // Retrieve the patient from the database
        Optional<PatientList> existingPatientOpt = patientListRepository.findById(id);

        // Check if the patient exists in the database
        if (existingPatientOpt.isEmpty()) {
            return new ResponseEntity<>("Patient not found", HttpStatus.NOT_FOUND);
        }

        // Retrieve the actual PatientList object
        PatientList existingPatient = existingPatientOpt.get();

        // Update the details (Optional: Set properties manually if needed)
        existingPatient.setName(patientList.getName());
        existingPatient.setAddress(patientList.getAddress());
        existingPatient.setPassportId(patientList.getPassportId());
        existingPatient.setPhNum(patientList.getPhNum());

        // Save the updated patient object back to the repository
        patientListRepository.save(existingPatient);

        return new ResponseEntity<>("Patient updated successfully", HttpStatus.OK);
    }
    @DeleteMapping("/listofpatient/{id}")
    public ResponseEntity<String> delete(@PathVariable("id") long id) { // TODO: add @PathVariable for id

        Optional<PatientList> optionalEntity = patientListRepository.findById(id);

        if (optionalEntity.isPresent()) {
            PatientList patient = optionalEntity.get();
            // Do something with the entity
            // TODO: delete concert using em.remove
            patientListRepository.delete(patient);
        } else {
            // Return a HTTP 404 response if the specified Concert isn't found.
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);

    }

    //For Retrieve Data that the user recorded from Patient

    @GetMapping("/patientrecordeddata")
    public ResponseEntity<List<PatientHistory>> retrieveRecorded() {
        List<PatientHistory> recordedData = patientHistoryRespository.findAll();
        return new ResponseEntity<>(recordedData, HttpStatus.OK);

    }
    @GetMapping("/patientrecordeddata/{id}")
    public ResponseEntity<PatientRecordedData> retrieveData(@PathVariable("id") long id) {
        Optional<PatientRecordedData> data = patientRecordedDataRepository.findById(id);
        if (data.isPresent()) {
           PatientRecordedData entity = data.get();
            return new ResponseEntity<>(entity, HttpStatus.OK);
        } else {
            // Handle the case when no entity is found
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
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
