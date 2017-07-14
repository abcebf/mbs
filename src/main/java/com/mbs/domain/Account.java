package com.mbs.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import java.math.BigDecimal;

/**
 * Created by hhuang on 6/30/17.
 */
@Entity
@Table(name = "ACCOUNTS")
public class Account {
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "ACCOUNT_ID")
  @SequenceGenerator(name = "ACCOUNT_ID",
      sequenceName = "account_seq", allocationSize = 1)
  @Column(name = "ID", nullable = false)
  private Long id;
  private String accountName;
  private BigDecimal balance;
  private String currencyCode;
  private String description;

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getAccountName() {
    return accountName;
  }

  public void setAccountName(String accountName) {
    this.accountName = accountName;
  }

  public BigDecimal getBalance() {
    return balance;
  }

  public void setBalance(BigDecimal balance) {
    this.balance = balance;
  }

  public String getCurrencyCode() {
    return currencyCode;
  }

  public void setCurrencyCode(String currencyCode) {
    this.currencyCode = currencyCode;
  }

  public String getDescription() {
    return description;
  }

  public void setDescription(String description) {
    this.description = description;
  }
}
