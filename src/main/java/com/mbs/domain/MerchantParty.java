package com.mbs.domain;

import javax.persistence.CascadeType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.MappedSuperclass;

/**
 * Created by hhuang on 6/29/17.
 */
@MappedSuperclass
public class MerchantParty extends AudibleEntity {
  @ManyToOne
  @JoinColumn(name = "person_id")
  private Person person;
  @ManyToOne
  @JoinColumn(name = "contact_id")
  private Contact contact;
  @ManyToOne
  @JoinColumn(name = "account_id")
  private Account account;
  private String description;

  public Person getPerson() {
    return person;
  }

  public void setPerson(Person person) {
    this.person = person;
  }

  public Contact getContact() {
    return contact;
  }

  public void setContact(Contact contact) {
    this.contact = contact;
  }

  public Account getAccount() {
    return account;
  }

  public void setAccount(Account account) {
    this.account = account;
  }

  public String getDescription() {
    return description;
  }

  public void setDescription(String description) {
    this.description = description;
  }
}
