package yte.intern.project.manageactivity.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import yte.intern.project.manageactivity.entity.Users;

import java.util.Optional;

public interface UsersRepository extends JpaRepository<Users, Long> {
    Optional<Users> findByUsername(String username);

    void deleteByUsername(String username);

    boolean existsByUsername(String username);
}
