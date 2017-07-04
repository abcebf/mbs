package com.mbs.repository;

import com.mbs.domain.Merchant;
import org.springframework.data.repository.CrudRepository;

import javax.transaction.Transactional;

/**
 * Created by hhuang on 6/30/17.
 */
@Transactional
public interface MerchantRepository extends CrudRepository<Merchant, Long> {

}
