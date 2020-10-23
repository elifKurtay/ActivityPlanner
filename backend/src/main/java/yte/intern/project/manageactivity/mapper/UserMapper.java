package yte.intern.project.manageactivity.mapper;

import org.mapstruct.Mapper;
import yte.intern.project.manageactivity.dto.UserDTO;
import yte.intern.project.manageactivity.entity.Users;

import java.util.List;

@Mapper(componentModel = "spring")
public interface UserMapper {
    UserDTO mapToDto(Users user);
    List<UserDTO> mapToDto(List<Users> users);

    Users mapToEntity(UserDTO userDTO);
    List<Users> mapToEntity(List<UserDTO> userDTOS);
}
