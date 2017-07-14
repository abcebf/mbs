package com.mbs.domain;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
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
  private Long id;
  private String firstName;
  private String midName;
  private String lastName;
  private Gendar gender;
  @ManyToOne
  @JoinColumn(name = "contact_id")
  private Contact contact;
  private String description;


  public Long getId() {
    return id;
  }

  public void setId(Long id) {
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

  @Enumerated(EnumType.STRING)
  public Gendar getGender() {
    return gender;
  }

  public void setGender(Gendar gender) {
    this.gender = gender;
  }

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

  public enum Gendar {
    MALE, FEMALE
  }
}
