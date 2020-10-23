package yte.intern.project.manageactivity.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import org.aspectj.weaver.patterns.TypePatternQuestions;
import org.springframework.security.core.CredentialsContainer;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import yte.intern.project.common.BaseEntity;

import javax.persistence.*;
import java.util.Collection;
import java.util.Set;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@SequenceGenerator(name = "idgen", sequenceName = "USER_SEQ")
public class Users extends BaseEntity implements UserDetails, CredentialsContainer{
    @Column(name = "NAME")
    private String name;

    @Column(name = "SURNAME")
    private String surname;

    @Column(name = "USERNAME", unique = true)
    private String username;

    @Column(name = "EMAIL", unique = true)
    private String email;

    @Column(name = "PASSWORD")
    private String password;

    @ManyToMany(mappedBy = "enrolledUsers", cascade = CascadeType.ALL)
    private Set<Activity> enrolledActivities;

    @JsonIgnore
    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinTable(
            name = "USER_AUTHORITIES",
            joinColumns = @JoinColumn(name= "USER_ID"),
            inverseJoinColumns = @JoinColumn(name = "AUTHORITY_ID")
    )
    private Set<Authority> authorities;


    @Override
    public void eraseCredentials() {
        password = null;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
