package yte.intern.project.manageusers;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;
import yte.intern.project.manageactivity.dto.UserDTO;
import yte.intern.project.manageactivity.entity.Users;
import yte.intern.project.manageusers.security.login.LoginService;
import yte.intern.project.manageusers.security.service.CustomUserDetailsManager;
import yte.intern.project.manageusers.security.service.CustomUserDetailsService;

@RestController
@RequiredArgsConstructor
public class ManageUsersController {
    private final CustomUserDetailsService userDetailsService;
    private final PasswordEncoder passwordEncoder;
    private final CustomUserDetailsManager userDetailsManager;

    @GetMapping("/hello")
    public String hello()
    {
        return "Welcome to Spring Security.";
    }

    @GetMapping("/user")
    public String user()
    {
        return "Welcome to USER Spring Security page.";
    }

    @GetMapping("/admin")
    public String admin()
    {
        return "Welcome to ADMIN Spring Security page.";
    }


    @PostMapping("/register")
    public void register(@RequestBody Users user) {
        if(user != null)
            userDetailsManager.createUser(user);
    }
}
