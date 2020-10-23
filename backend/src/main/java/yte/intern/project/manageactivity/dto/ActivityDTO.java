package yte.intern.project.manageactivity.dto;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Getter;

import javax.persistence.Column;
import javax.validation.constraints.AssertTrue;
import javax.validation.constraints.FutureOrPresent;
import javax.validation.constraints.Min;
import javax.validation.constraints.Size;
import java.time.LocalDate;

@Getter
@Builder
public class ActivityDTO {
    @Size(max = 255, message = "Name can't be longer than 255 characters!")
    public final String name;

    @FutureOrPresent
    public final LocalDate startDate;

    @FutureOrPresent
    public final LocalDate endDate;

    @AssertTrue
    public boolean isEndDateValid() {
        return getEndDate().isAfter(getStartDate());
    }

    @JsonCreator
    public ActivityDTO(@JsonProperty("name") String name,
                      @JsonProperty("startDate") LocalDate startDate,
                      @JsonProperty("endDate") LocalDate endDate) {
        this.name = name;
        this.startDate = startDate;
        this.endDate = endDate;
    }
}
