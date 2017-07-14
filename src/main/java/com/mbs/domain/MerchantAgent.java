package com.mbs.domain;

import javax.persistence.CascadeType;
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
@Table(name = "MERCHANT_AGENTS")
public class MerchantAgent extends MerchantParty {
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "MERCHANT_AGENT_ID")
  @SequenceGenerator(name = "MERCHANT_AGENT_ID",
      sequenceName = "AGENT_SEQ", allocationSize = 1)
  @Column(name = "ID", nullable = false)
  private Long id;
  @ManyToOne
  @JoinColumn(name = "MERCHANT_ID")
  private Merchant merchant;

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public Merchant getMerchant() {
    return merchant;
  }

  public void setMerchant(Merchant merchant) {
    this.merchant = merchant;
  }


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
