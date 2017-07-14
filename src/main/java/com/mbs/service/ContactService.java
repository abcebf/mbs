package com.mbs.service;

import com.mbs.domain.Contact;

/**
 * Created by hhuang on 7/4/17.
 */
public interface ContactService {

  Contact saveContact(Contact contact);

  Contact getContact(Long contactId);

  Contact lookup(String tel, String email);
}
