package yte.intern.project.manageusers.security.login;

import lombok.Getter;

@Getter
public class LoginResponse {

    private final String token;

    public LoginResponse(final String token) {
        this.token = token;
    }
}
