package yte.intern.project.manageactivity;

import lombok.RequiredArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import yte.intern.project.manageactivity.dto.ActivityDTO;
import yte.intern.project.manageactivity.entity.Activity;
import yte.intern.project.manageactivity.entity.EnrolledUser;
import yte.intern.project.manageactivity.entity.Question;
import yte.intern.project.manageactivity.entity.Users;
import yte.intern.project.manageactivity.mapper.ActivityMapper;
import yte.intern.project.manageactivity.repository.UsersRepository;
import yte.intern.project.manageusers.security.service.CustomUserDetailsService;

import javax.validation.Valid;
import javax.validation.constraints.Size;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Stream;

@RestController
@RequiredArgsConstructor
@Validated
@RequestMapping("/activities")
public class ManageActivityController {

    private final ManageActivityService manageActivityService;
    private final ActivityMapper activityMapper;
    private final CustomUserDetailsService userDetailsService;
    private final UsersRepository usersRepository;

    @GetMapping
    public List<ActivityDTO> listAllActivityDTOs() {
        List<Activity> activity = manageActivityService.listAllActivities();
        System.out.println(activity);
        return activityMapper.mapToDto(activity);
    }

    @GetMapping("/1/{username}")
    public List<Activity> listAllActivitiesByOwner(@PathVariable String username) {
        List<Activity> activity = manageActivityService.getActivityByOwner(username);
        System.out.println(activity);
        return activity;
    }

    @GetMapping("/{name}/enrolledUsers")
    public Set<EnrolledUser> listAllEnrolledUsers(@PathVariable String name) {
        Activity activity = manageActivityService.getActivityByName(name);
        System.out.println(activity.getEnrolledUsers());
        return activity.getEnrolledUsers();
    }

    @GetMapping("/2/{name}")
    public Activity getActivityByName(@PathVariable String name) {
        return manageActivityService.getActivityByName(name);
    }

    @GetMapping("/{name}")
    public ActivityDTO getActivityDTOByName(@PathVariable String name) {
        Activity activity = manageActivityService.getActivityByName(name);
        return activityMapper.mapToDto(activity);
    }

    @GetMapping("/{name}/questions")
    public List<Question> getQuestions(@PathVariable String name) {
        return manageActivityService.getQuestions(name);
    }

    @PostMapping
    public Activity addActivity(@Valid @RequestBody Activity activity) {
        return manageActivityService.addActivity(activity);
    }

    @PutMapping("/{name}/addQuestions")
    public List<Question> addQuestionsToActivity(@PathVariable String name,
                                   @Valid @RequestBody List<Question> questions) {
        return manageActivityService.addQuestions(name, questions);
    }

    @PutMapping("/{name}/answersOfQuestions")
    public List<Question> addAnswersToActivity(@PathVariable String name,
                                                @Valid @RequestBody List<Question> questions) {
        return manageActivityService.addAnswers(name, questions);
    }

    @PutMapping("/{name}")
    public Activity updateActivity(@PathVariable String name,
                                     @Valid @RequestBody Activity activity) {
        return manageActivityService.updateActivity(name, activity);
    }

    @PutMapping("/{name}/{username}")
    public boolean enrollUserToActivity(@PathVariable String name, @PathVariable String username,
                                     @Valid @RequestBody List<Question> answers) {
        System.out.println("Username is:" + username);
        Optional<Users> user = usersRepository.findByUsername(username);

        Set<EnrolledUser> enrolledUsers = listAllEnrolledUsers(name);
        Stream<EnrolledUser> enrolledUserStream = enrolledUsers.stream()
                            .filter(c -> user.get().getId() == c.getUser_id());

        if(user.isPresent() && enrolledUserStream.findAny().isEmpty())
            return manageActivityService.joinedActivity(name, user.get(), answers);
        System.out.println("USER NOT FOUND OR USER ALREADY ENROLLED");
        return false;
    }

    @DeleteMapping("/{name}")
    public void deleteActivity(@PathVariable String name) {
        manageActivityService.deleteActivity(name);
    }

}
