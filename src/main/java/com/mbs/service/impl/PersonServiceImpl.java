package com.mbs.service.impl;

import com.mbs.domain.Contact;
import com.mbs.domain.Person;
import com.mbs.repository.ContactRepository;
import com.mbs.repository.PersonRepository;
import com.mbs.service.PersonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Created by hhuang on 7/4/17.
 */
@Service
@Transactional
public class PersonServiceImpl implements PersonService {
  @Autowired
  private PersonRepository personRepository;
  @Autowired
  private ContactRepository contactRepository;

  @Override
  public Person savePerson(Person person) {
    return personRepository.save(person);
  }

  @Override
  public Person lookup(String tel, String email) {
    Contact contact = contactRepository.findByTelAndEmail(tel, email);
    if (contact == null) {
      return null;
    }
    return personRepository.findByContact(contact.getId());
  }

  @Override
  public Person getPerson(Long personId) {
    return personRepository.findOne(personId);
  }

  @Override
  public Iterable<Person> getAllPersons() {
    return personRepository.findAll();
  }

  @Override
  public void deletePerson(Long personId) {
    personRepository.delete(personId);
  }
}
