package yte.intern.project.manageactivity.dto;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@Builder
public class UserDTO {

    private final String username;
    private final String password;

    @JsonCreator
    public UserDTO(@JsonProperty("username") String username,
                       @JsonProperty("password") String password) {
        this.username = username;
        this.password = password;
    }
}
