package yte.intern.project;

import lombok.RequiredArgsConstructor;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import yte.intern.project.manageusers.DatabasePopulator;

import javax.annotation.PostConstruct;

@SpringBootApplication
@RequiredArgsConstructor
public class ProjectApplication {

	private final DatabasePopulator databasePopulator;

	public static void main(String[] args) {

		SpringApplication.run(ProjectApplication.class, args);
		System.out.println("working...");
	}

	@PostConstruct
	public void initSecurityData() {
		databasePopulator.populateDatabaseAfterInit();
	}
}
