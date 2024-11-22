package com.example.server.repository;

import com.example.server.model.Position;
import com.example.server.model.UserAccount;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserAccountRepository extends JpaRepository<UserAccount, Long> {
    Optional<UserAccount> findByUsername(String username);

    @Query("SELECT ua FROM UserAccount ua WHERE ua.username = :username OR ua.employee.email = :username")
    Optional<UserAccount> findByUsernameAndEmail(String username);
}
