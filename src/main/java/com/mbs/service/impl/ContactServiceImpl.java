package com.mbs.service.impl;

import com.mbs.domain.Contact;
import com.mbs.repository.ContactRepository;
import com.mbs.service.ContactService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Created by hhuang on 7/5/17.
 */
@Service
@Transactional
public class ContactServiceImpl implements ContactService {
  @Autowired
  private ContactRepository contactRepository;

  @Override
  public Contact saveContact(Contact contact) {
    return contactRepository.save(contact);
  }

  @Override
  public Contact getContact(Long contactId) {
    return contactRepository.findOne(contactId);
  }

  @Override
  public Contact lookup(String tel, String email) {
    return contactRepository.findByTelAndEmail(tel, email);
  }
}
