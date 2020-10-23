package yte.intern.project.manageactivity.mapper;

import org.mapstruct.Mapper;
import yte.intern.project.manageactivity.dto.ActivityDTO;
import yte.intern.project.manageactivity.entity.Activity;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ActivityMapper {
    ActivityDTO mapToDto(Activity activity);
    List<ActivityDTO> mapToDto(List<Activity> activities);

    Activity mapToEntity(ActivityDTO activityDTO);
    List<Activity> mapToEntity(List<ActivityDTO> activityDTOS);
}
