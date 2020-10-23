package yte.intern.project.manageactivity;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import yte.intern.project.manageactivity.entity.Activity;
import yte.intern.project.manageactivity.entity.EnrolledUser;
import yte.intern.project.manageactivity.entity.Question;
import yte.intern.project.manageactivity.entity.Users;
import yte.intern.project.manageactivity.repository.ActivityRepository;
import yte.intern.project.manageactivity.repository.UsersRepository;

import javax.persistence.EntityNotFoundException;
import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class ManageActivityService {

    private final ActivityRepository activityRepository;
    private final UsersRepository usersRepository;

    //GET
    public List<Activity> listAllActivities() {
        return activityRepository.findAll();
    }

    public Activity getActivityByName(String name) {
        return activityRepository.findByName(name).orElseThrow(EntityNotFoundException::new);
    }

    public List<Activity> getActivityByOwner(String username) {
        List<Activity> activityList = activityRepository.findByOwnerUsername(username);
        return activityList;
    }

    //POST
    public Activity addActivity(Activity activity) {
        return activityRepository.save(activity);
    }

    //PUT
    @Transactional
    public Activity updateActivity(String name, Activity activity) {
        Optional<Activity> oldActivity = activityRepository.findByName(name);
        if(oldActivity.isPresent()) {
            Activity newVersion = updateActivityFromDB(activity, oldActivity.get());
            return activityRepository.save(newVersion);
        } else {
            throw new EntityNotFoundException();
        }
    }

    @Transactional
    public boolean joinedActivity(String name, Users users, List<Question> answers) {
        Optional<Activity> oldActivity = activityRepository.findByName(name);
        if(oldActivity.isPresent() ) {
            if(oldActivity.get().getRemainingQuota() <= 0)
                return false;
            oldActivity.get().setRemainingQuota(oldActivity.get().getRemainingQuota() - 1);
            EnrolledUser user = new EnrolledUser(users.getId(), users.getName(), users.getSurname(),
                    users.getEmail(), answers);
            oldActivity.get().getEnrolledUsers().add(user);
            users.getEnrolledActivities().add(oldActivity.get());
            activityRepository.save(oldActivity.get());
            return true;
        } else {
            System.out.println("old activity not found");
            throw new EntityNotFoundException();
        }
    }

    @Transactional
    public  List<Question> getQuestions(String name) {
        Optional<Activity> oldActivity = activityRepository.findByName(name);
        if(oldActivity.isPresent() ) {
            return oldActivity.get().getQuestions();
        } else {
            System.out.println("old activity not found");
            throw new EntityNotFoundException();
        }
    }

    @Transactional
    public  List<Question> addQuestions(String name, List<Question> questions) {
        Optional<Activity> oldActivity = activityRepository.findByName(name);
        if(oldActivity.isPresent() ) {
            oldActivity.get().setQuestions(questions);
            activityRepository.save(oldActivity.get());
            return oldActivity.get().getQuestions();
        } else {
            System.out.println("old activity not found");
            throw new EntityNotFoundException();
        }
    }

    @Transactional
    public  List<Question> addAnswers(String name, List<Question> questions) {
        Optional<Activity> oldActivity = activityRepository.findByName(name);
        if(oldActivity.isPresent() ) {
            List<Question> oldQuestions = oldActivity.get().getQuestions();
            int i = 0;
            for (Question question: oldQuestions ) {
                i++;
            }
            oldActivity.get().setQuestions(oldQuestions);
            activityRepository.save(oldActivity.get());
            return oldActivity.get().getQuestions();
        } else {
            System.out.println("old activity not found");
            throw new EntityNotFoundException();
        }
    }

    private Activity updateActivityFromDB(Activity activity, Activity activityFromDB) {
        activityFromDB.setName(activity.getName());
        activityFromDB.setStartDate(activity.getStartDate());
        activityFromDB.setEndDate(activity.getEndDate());

        int oldQuota = activityFromDB.getQuota();
        activityFromDB.setQuota(activity.getQuota());
        int rem = activityFromDB.getRemainingQuota();

        if(rem != oldQuota) rem += activity.getQuota() - oldQuota;
        else rem = activity.getQuota();

        activityFromDB.setRemainingQuota(rem);
        return activityFromDB;
    }

    //DELETE
    public void deleteActivity(String name) {
        activityRepository.deleteByName(name);
    }


}
