package yte.intern.project.manageactivity.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import yte.intern.project.manageactivity.entity.Activity;
import yte.intern.project.manageactivity.entity.Users;

import java.util.List;
import java.util.Optional;

public interface ActivityRepository extends JpaRepository<Activity, Long> {
    Optional<Activity> findByName(String name);
    void deleteByName(String name);
    List<Activity> findByOwnerUsername(String username);
}
