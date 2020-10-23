package yte.intern.project.manageusers.security.service;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import yte.intern.project.manageactivity.entity.Users;
import yte.intern.project.manageactivity.repository.UsersRepository;

@Service
public class CustomUserDetailsService implements UserDetailsService {
    private final UsersRepository userRepository;

    public CustomUserDetailsService(final UsersRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public Users loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository.findByUsername(username).orElseThrow(
                () -> new UsernameNotFoundException(username)
        );
    }

}
