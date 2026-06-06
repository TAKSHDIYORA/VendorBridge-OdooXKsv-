package com.Vendor_Bridge.backend;

import com.Vendor_Bridge.backend.models.Role;
import com.Vendor_Bridge.backend.models.User;
import com.Vendor_Bridge.backend.repositories.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
public class BackendApplication {
	@Bean
	public CommandLineRunner initAdminAccount(UserRepository userRepository, PasswordEncoder passwordEncoder) {
		return args -> {
			// Check if the admin already exists so we don't duplicate it on every restart
			if (userRepository.findByEmail("admin@vendorbridge.com").isEmpty()) {
				User admin = new User();
				admin.setEmail("admin@vendorbridge.com");
				// Hash the password before saving!
				admin.setPassword(passwordEncoder.encode("admin@123"));
				admin.setRole(Role.ADMIN);

				userRepository.save(admin);
				System.out.println("✅ Default Admin account created successfully!");
			}
		};
	}

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}

}
