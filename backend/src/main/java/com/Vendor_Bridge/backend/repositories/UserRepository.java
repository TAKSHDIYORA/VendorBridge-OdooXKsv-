package com.Vendor_Bridge.backend.repositories;

import com.Vendor_Bridge.backend.models.Role;
import com.Vendor_Bridge.backend.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User,Long> {
    public Optional<User> findByEmail(String email);
    public List<User> findByRole(Role role);
}
