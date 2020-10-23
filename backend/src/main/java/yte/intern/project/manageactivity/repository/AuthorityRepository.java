package yte.intern.project.manageactivity.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import yte.intern.project.manageactivity.entity.Authority;

public interface AuthorityRepository extends JpaRepository<Authority, Long> {
}
