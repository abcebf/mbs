package com.mbs.repository;

import com.mbs.domain.Person;
import org.springframework.data.repository.CrudRepository;

import javax.transaction.Transactional;

/**
 * Created by hhuang on 6/30/17.
 */
//@Transactional
public interface PersonRepository extends CrudRepository<Person, Long> {
  Person findByContact(Long contactId);
}
