package yte.intern.project.manageusers;

import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;
import yte.intern.project.manageactivity.ManageActivityService;
import yte.intern.project.manageactivity.dto.ActivityDTO;
import yte.intern.project.manageactivity.dto.UserDTO;
import yte.intern.project.manageactivity.entity.Activity;
import yte.intern.project.manageactivity.entity.Authority;
import yte.intern.project.manageactivity.entity.Users;
import yte.intern.project.manageactivity.mapper.ActivityMapper;
import yte.intern.project.manageactivity.mapper.UserMapper;
import yte.intern.project.manageactivity.repository.AuthorityRepository;
import yte.intern.project.manageusers.security.service.CustomUserDetailsManager;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.util.List;
import java.util.Set;

@Component
@RequiredArgsConstructor
public class DatabasePopulator {
    private final CustomUserDetailsManager customUserDetailsManager;
    private final UserMapper userMapper;
    private final ActivityMapper activityMapper;
    private final ManageActivityService manageActivityService;
    private final AuthorityRepository authorityRepository;

    @Transactional
    public void populateDatabaseAfterInit() {

        List<Authority> savedAuthorities = authorityRepository.saveAll(Set.of(new Authority(null, "READ"), new Authority(null, "WRITE"), new Authority(null, "EXECUTE")));
        Users adminUser = new Users("admin", "admin", "admin","admin@mail.com","admin", Set.of(), Set.copyOf(savedAuthorities));
        Users normalUser = new Users("user","user", "user", "user@mail.com","user",Set.of(), Set.of(savedAuthorities.get(0)));
        Users sysUser = new Users("sys","sys", "sys","sys@mail", "sys", Set.of(), Set.of());

        Activity activity1 = activityMapper.mapToEntity(new ActivityDTO("pazar kahvaltısı",
                LocalDate.parse("2020-08-08"), LocalDate.parse("2020-08-09")));
        Activity activity2 = activityMapper.mapToEntity(new ActivityDTO("dağ tırmanışı",
                LocalDate.parse("2020-09-08"), LocalDate.parse("2020-09-19")));

        customUserDetailsManager.createUser(adminUser);
        customUserDetailsManager.createUser(normalUser);
        customUserDetailsManager.createUser(sysUser);
        manageActivityService.addActivity(activity1);
        manageActivityService.addActivity(activity2);
    }
}
