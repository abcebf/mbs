/*
 * Copyright 2016, Paysafe Group PLC, 2 Place Alexis Nihon, suite 700, Westmount, Quebec, Canada
 * All rights reserved.
 *
 * This software is the confidential and proprietary information of Paysafe Group PLC
 * ("Confidential Information"). You shall not disclose such Confidential Information and shall use
 * it only in accordance with the terms of the license agreement you entered into with Optimal
 * Payments.
 */

package com.mbs.web.controller;

import com.mbs.domain.Contact;
import com.mbs.domain.Person;
import com.mbs.service.ContactService;
import com.mbs.service.PersonService;
import com.mbs.web.controller.utils.MbsMediaType;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.joda.time.DateTime;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping("mbs")
public class PersonController {
  @SuppressWarnings("unused")
  private static final Logger logger = LoggerFactory.getLogger(PersonController.class);

  @Autowired
  private PersonService personService;
  @Autowired
  private ContactService contactService;

  /**
   * lookup Person.
   *
   * @return Person
   */
  @RequestMapping(method = RequestMethod.GET, value = "/persons",
      produces = MbsMediaType.APPLICATION_JSON_UTF8_VALUE)
  @ApiOperation(value = "Lookup person by Id")
  public ResponseEntity<Iterable<Person>> lookup() {
    Iterable<Person> persons = personService.getAllPersons();

    if (persons == null) {
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    return new ResponseEntity<>(persons, HttpStatus.OK);
  }

  /**
   * lookup Person.
   *
   * @param id id.
   * @return Person
   */
  @RequestMapping(method = RequestMethod.GET, value = "/persons/{id}",
      produces = MbsMediaType.APPLICATION_JSON_UTF8_VALUE)
  @ApiOperation(value = "Lookup person by Id")
  public ResponseEntity<Person> lookup(
      @ApiParam(value = "person id", required = true) @PathVariable("id") final Long id) {
    Person person = personService.getPerson(id);

    if (person == null) {
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);

    }

    return new ResponseEntity<>(person, HttpStatus.OK);
  }

  /**
   * lookup Person.
   *
   * @param tel   String.
   * @param email String.
   * @return Person
   */
  @RequestMapping(method = RequestMethod.GET, value = "/persons/{tel}/{email}",
      produces = MbsMediaType.APPLICATION_JSON_UTF8_VALUE)
  @ApiOperation(value = "Lookup person by tel and email")
  public ResponseEntity<Person> lookup(
      @ApiParam(value = "tel", required = true) @PathVariable("tel") final String tel,
      @ApiParam(value = "email", required = true) @PathVariable("email") final String email) {
    Person person = personService.lookup(tel, email);

    if (person == null) {
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    return new ResponseEntity<>(person, HttpStatus.OK);
  }

  /**
   * create a Person.
   *
   * @param request PersonRequest
   * @return Person
   */
  @RequestMapping(method = RequestMethod.PUT, value = "/persons",
      produces = MbsMediaType.APPLICATION_JSON_UTF8_VALUE)
  @ApiOperation(value = "create a person")
  public ResponseEntity<Person> create(
      @ApiParam(value = "person details", required = true)
      @Valid
      @RequestBody PersonRequest request) {

    Contact contact = contactService.getContact(request.getContactId());
    if (contact == null) {
      return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
    Person person = new Person();
    person.setContact(contact);

    person.setFirstName(request.getFirstName());
    person.setMidName(request.getMidName());
    person.setLastName(request.getLastName());
    person.setGender(request.getGender());
    person.setDescription(request.getDescription());

    person.setCreatedBy("henry");
    person.setCreatedDate(DateTime.now());
    person.setLastModifiedBy("henry");
    person.setLastModifiedDate(DateTime.now());

    person = personService.savePerson(person);

    return new ResponseEntity<>(person, HttpStatus.OK);
  }


  /**
   * update a Person.
   *
   * @param request PersonRequest
   * @return Person
   */
  @RequestMapping(method = RequestMethod.POST, value = "/persons/{id}",
      produces = MbsMediaType.APPLICATION_JSON_UTF8_VALUE)
  @ApiOperation(value = "update a person")
  public ResponseEntity<Person> update(
      @ApiParam(value = "person id", required = true)
      @PathVariable("id") final Long personId,
      @ApiParam(value = "person details", required = true)
      @Valid
      @RequestBody PersonRequest request) {

    Contact contact = contactService.getContact(request.getContactId());
    if (contact == null) {
      return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
    Person person = personService.getPerson(personId);
    person.setContact(contact);

    person.setFirstName(request.getFirstName());
    person.setMidName(request.getMidName());
    person.setLastName(request.getLastName());
    person.setGender(request.getGender());
    person.setDescription(request.getDescription());

    person.setLastModifiedBy("henry");
    person.setLastModifiedDate(DateTime.now());

    person = personService.savePerson(person);

    return new ResponseEntity<>(person, HttpStatus.OK);
  }

  private static class PersonRequest {
    private String firstName;
    private String midName;
    private String lastName;
    private Person.Gendar gender;
    private long contactId;
    private String description;

    public String getFirstName() {
      return firstName;
    }

    public void setFirstName(String firstName) {
      this.firstName = firstName;
    }

    public String getMidName() {
      return midName;
    }

    public void setMidName(String midName) {
      this.midName = midName;
    }

    public String getLastName() {
      return lastName;
    }

    public void setLastName(String lastName) {
      this.lastName = lastName;
    }

    public Person.Gendar getGender() {
      return gender;
    }

    public void setGender(Person.Gendar gender) {
      this.gender = gender;
    }

    public long getContactId() {
      return contactId;
    }

    public void setContactId(long contactId) {
      this.contactId = contactId;
    }

    public String getDescription() {
      return description;
    }

    public void setDescription(String description) {
      this.description = description;
    }
  }
}
