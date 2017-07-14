package com.mbs.service;

import com.mbs.domain.Person;

/**
 * Created by hhuang on 7/4/17.
 */
public interface PersonService {

  Person savePerson(Person person);

  Person getPerson(Long personId);

  void deletePerson(Long personId);

  Person lookup(String tel, String email);

  Iterable<Person> getAllPersons();

}
