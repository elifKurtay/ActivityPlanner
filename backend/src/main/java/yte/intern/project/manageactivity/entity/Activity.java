package yte.intern.project.manageactivity.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;
import yte.intern.project.common.BaseEntity;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.List;
import java.util.Set;

@Entity
@Getter
@Setter
@SequenceGenerator(name = "idgen", sequenceName = "ACTIVITY_SEQ")
public class Activity extends BaseEntity {
    @Column(name = "NAME", unique = true)
    private String name;

    @Column(name = "START_DATE")
    private LocalDate startDate;

    @Column(name = "END_DATE")
    private LocalDate endDate;

    @Column(name = "QUOTA")
    private int quota;

    @Column(name = "REMAINING_QUOTA")
    private int remainingQuota;

    @Column(name = "OWNER")
    private String ownerUsername;

    @JsonIgnore
    @ManyToMany( fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinTable(
            name = "enrollment",
            joinColumns = @JoinColumn(name = "ACTIVITY_ID"),
            inverseJoinColumns = @JoinColumn(name = "USER_ID")
    )
    private Set<EnrolledUser> enrolledUsers;


    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "activity_id")
    List<Question> questions;
}
