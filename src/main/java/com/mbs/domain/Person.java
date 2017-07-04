package com.mbs.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

/**
 * Created by hhuang on 6/29/17.
 */
@Entity
@Table(name = "PERSONS")
public class Person extends AudibleEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "PERSON_ID")
  @SequenceGenerator(name = "PERSON_ID",
      sequenceName = "person_seq", allocationSize = 1)
  @Column(name = "ID", nullable = false)
  private long id;
  private String firstName;
  private String midName;
  private String lastName;
  private String gender;
  private Contact contact;
  private String description;


  public long getId() {
    return id;
  }

  public void setId(long id) {
    this.id = id;
  }

  public String getFirstName() {
    return firstName;
  }

  public void setFirstName(String firstName) {
    this.firstName = firstName;
  }

  public String getMidName() {
    return midName;
  }

  public void setMidName(String midName) {
    this.midName = midName;
  }

  public String getLastName() {
    return lastName;
  }

  public void setLastName(String lastName) {
    this.lastName = lastName;
  }

  public String getGender() {
    return gender;
  }

  public void setGender(String gender) {
    this.gender = gender;
  }

  @ManyToOne
  @JoinColumn(name = "contact_id")
  public Contact getContact() {
    return contact;
  }

  public void setContact(Contact contact) {
    this.contact = contact;
  }

  public String getDescription() {
    return description;
  }

  public void setDescription(String description) {
    this.description = description;
  }
}
