package com.mbs.repository;

import com.mbs.domain.MerchantAgent;
import org.springframework.data.repository.CrudRepository;

import javax.transaction.Transactional;

/**
 * Created by hhuang on 6/30/17.
 */
@Transactional
public interface MerchantAgentRepository extends CrudRepository<MerchantAgent, Long> {

}
