package com.vhvfollowup.VHV_backend.Service;

import com.vhvfollowup.VHV_backend.model.User;
import com.vhvfollowup.VHV_backend.repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.regex.Pattern;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public ResponseEntity<?> login(User user) {
        // Look for the user by username
        Optional<User> existingUserOptional = userRepository.findByUsername(user.getUsername());

        // Check if the user exists and if the password matches
        if (existingUserOptional.isPresent()) {
            User existingUser = existingUserOptional.get(); // Get the actual user object
            if (user.getPassword().equals(existingUser.getPassword())) {
                String role = String.valueOf(existingUser.getRole());
                if (role != null) {
                    return ResponseEntity.ok(role);
                } else {
                    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                            .body("User role not found");
                } // Return success if credentials match
            }
        }

        // If the user doesn't exist or the passwords don't match, return an error message
        return ResponseEntity.badRequest().body("Invalid username or password");
    }


    public void signupUser(User user) {
        // Validate the user object
        if (user.getUsername() == null || user.getPassword() == null || user.getEmail() == null) {
            throw new IllegalArgumentException("Username, password, and email are required");
        }

        // Check if the user already exists (optional)
        if (userRepository.existsByUsername(user.getUsername())) {
            throw new IllegalArgumentException("Username already exists");
        }

        // Here you can add more validation logic as needed (e.g., email format)
        if (!isValidEmail(user.getEmail())) {
            throw new IllegalArgumentException("Invalid email format");
        }
        // Save the user to the database
        userRepository.save(user);
        // You may want to the password before saving
        user.setPassword(user.getPassword()); // Implement hashPassword method
        userRepository.save(user); // Save the user entity
    }
    private boolean isValidEmail(String email) {
        // Simple regex for email validation
        String emailRegex = "^[a-zA-Z0-9_+&*-]+(?:\\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,7}$";
        Pattern pattern = Pattern.compile(emailRegex);
        return pattern.matcher(email).matches();
    }

    public User getUserByUsername(String username) {
        return userRepository.findByUsername(username).orElse(null);
    }
}