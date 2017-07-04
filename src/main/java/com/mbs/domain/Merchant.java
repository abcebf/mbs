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
@Table(name = "MERCHANTS")
public class Merchant extends MerchantParty {
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "MERCHANT_ID")
  @SequenceGenerator(name = "MERCHANT_ID",
      sequenceName = "merchant_seq", allocationSize = 1)
  @Column(name = "ID", nullable = false)
  private long id;

  private String name;

  private Person refPerson;


  public long getId() {
    return id;
  }

  public void setId(long id) {
    this.id = id;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  @ManyToOne
  @JoinColumn(name = "ref_person_id")
  public Person getRefPerson() {
    return refPerson;
  }

  public void setRefPerson(Person refPerson) {
    this.refPerson = refPerson;
  }
}
