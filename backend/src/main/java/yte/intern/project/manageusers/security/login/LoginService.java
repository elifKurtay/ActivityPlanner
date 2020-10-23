package yte.intern.project.manageusers.security.login;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.stereotype.Service;
import yte.intern.project.manageactivity.dto.UserDTO;
import yte.intern.project.manageusers.security.util.JwtUtil;

@Service
@RequiredArgsConstructor
public class LoginService {
    private final DaoAuthenticationProvider authenticationProvider;

    @Value(value = "${security.secretKey}")
    private String secretKey;

    public LoginResponse authenticate(final LoginRequest loginRequest) {

        Authentication usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword());

        try {
            Authentication user = authenticationProvider.authenticate(usernamePasswordAuthenticationToken);
            String token = JwtUtil.generateToken(user, secretKey, 15);
            return new LoginResponse(token);
        } catch (AuthenticationException e) {
            e.printStackTrace();
        }

        return null;
    }
}
