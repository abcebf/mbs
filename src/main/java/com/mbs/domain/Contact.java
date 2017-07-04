package com.mbs.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

/**
 * Created by hhuang on 6/30/17.
 */
@Entity
@Table(name = "CONTACTS")
public class Contact extends AudibleEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "CONTACT_ID")
  @SequenceGenerator(name = "CONTACT_ID",
      sequenceName = "contact_seq", allocationSize = 1)
  @Column(name = "ID", nullable = false)
  private long id;
  private String email;
  private String tel;
  private String address;
  private String city;
  private String province;
  private String country;
  private String postCode;

  public long getId() {
    return id;
  }

  public void setId(long id) {
    this.id = id;
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public String getTel() {
    return tel;
  }

  public void setTel(String tel) {
    this.tel = tel;
  }

  public String getAddress() {
    return address;
  }

  public void setAddress(String address) {
    this.address = address;
  }

  public String getCity() {
    return city;
  }

  public void setCity(String city) {
    this.city = city;
  }

  public String getProvince() {
    return province;
  }

  public void setProvince(String province) {
    this.province = province;
  }

  public String getCountry() {
    return country;
  }

  public void setCountry(String country) {
    this.country = country;
  }

  public String getPostCode() {
    return postCode;
  }

  public void setPostCode(String postCode) {
    this.postCode = postCode;
  }
}
