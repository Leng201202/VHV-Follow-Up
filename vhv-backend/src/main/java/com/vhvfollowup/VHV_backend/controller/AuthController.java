package com.vhvfollowup.VHV_backend.controller;
import com.vhvfollowup.VHV_backend.repo.UserRepository;
import jakarta.servlet.http.HttpSession;
import com.vhvfollowup.VHV_backend.Service.UserService;
import com.vhvfollowup.VHV_backend.model.User;
import org.apache.tomcat.util.net.openssl.ciphers.Authentication;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.servlet.server.Session;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("api")
public class AuthController {
    @Autowired
    private final UserService userService;
    @Autowired
    private UserRepository userRepository;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    // Signup endpoint for regular users
    @PostMapping("signup")
    public ResponseEntity<String> signup(@RequestBody User user) {
        try {
            userService.signupUser(user);
            return ResponseEntity.ok("User  registered successfully");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // Login endpoint for all users
    @PostMapping("login")
    public ResponseEntity<?> login(@RequestBody User user) {
        // Call the UserService to authenticate the user
        ResponseEntity<?> response = userService.login(user);
        // Return the response from the UserService
        return response;
    }
    
}
