package com.welltrack.well;

import org.springframework.stereotype.Service;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // Register a new user
    public User register(User user) {
        // Check if the username already exists
        if (userRepository.findByUsername(user.getUsername()) != null) {
            throw new IllegalArgumentException("Username is already taken");
        }

        // Hash the password before saving
        String hashedPassword = hashPassword(user.getPassword());
        user.setPassword(hashedPassword);

        return userRepository.save(user);
    }

    // Authenticate a user
    public boolean authenticate(String username, String password) {
        User user = userRepository.findByUsername(username);

        // Validate password
        return user != null && validatePassword(password, user.getPassword());
    }

    // Hash the password
    private String hashPassword(String password) {
        return Integer.toHexString(password.hashCode());
    }

    // Validate the password
    private boolean validatePassword(String rawPassword, String hashedPassword) {
        return hashPassword(rawPassword).equals(hashedPassword);
    }
}
