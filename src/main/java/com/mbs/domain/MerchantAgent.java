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
@Table(name = "MERCHANT_AGENTS")
public class MerchantAgent extends MerchantParty {
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "MERCHANT_AGENT_ID")
  @SequenceGenerator(name = "MERCHANT_AGENT_ID",
      sequenceName = "AGENT_SEQ", allocationSize = 1)
  @Column(name = "ID", nullable = false)
  private long id;
  private Merchant merchant;

  public long getId() {
    return id;
  }

  public void setId(long id) {
    this.id = id;
  }

  @ManyToOne
  @JoinColumn(name = "MERCHANT_ID")
  public Merchant getMerchant() {
    return merchant;
  }

  public void setMerchant(Merchant merchant) {
    this.merchant = merchant;
  }
}
