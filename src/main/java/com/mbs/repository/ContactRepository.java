package com.mbs.repository;

import com.mbs.domain.Contact;
import org.springframework.data.repository.CrudRepository;

import javax.transaction.Transactional;

/**
 * Created by hhuang on 6/30/17.
 */
@Transactional
public interface ContactRepository extends CrudRepository<Contact, Long> {

}
