package yte.intern.project.manageactivity.entity;

import lombok.*;
import yte.intern.project.common.BaseEntity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.SequenceGenerator;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@SequenceGenerator(name = "idgen", sequenceName = "QUESTION_SEQ")
public class Question extends BaseEntity {
    @Column(name = "QUESTION")
    private String question;

    @Column(name = "ANSWER")
    private String answer;

    public Question(String question) { this.question = question; }
}
