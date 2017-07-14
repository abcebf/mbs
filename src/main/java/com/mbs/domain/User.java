package com.mbs.domain;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

/**
 * Created by hhuang on 6/29/17.
 */
@Entity
@Table(name = "USERS")
public class User extends AudibleEntity {
  @Id
  private String userName;

  private String password;
  @ManyToOne
  @JoinColumn(name = "PERSON_ID")
  private Person person;
  private Status status;

  public String getUserName() {
    return userName;
  }

  public void setUserName(String userName) {
    this.userName = userName;
  }

  public String getPassword() {
    return password;
  }

  public void setPassword(String password) {
    this.password = password;
  }

  @Enumerated(EnumType.STRING)
  public Status getStatus() {
    return status;
  }

  public void setStatus(Status status) {
    this.status = status;
  }

  public Person getPerson() {
    return person;
  }

  public void setPerson(Person person) {
    this.person = person;
  }

  public enum Status {
    ACTIVE, INACTIVE, DELETED
  }
}
