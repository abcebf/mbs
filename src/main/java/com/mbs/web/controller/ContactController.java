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
import com.mbs.service.ContactService;
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
public class ContactController {
  @SuppressWarnings("unused")
  private static final Logger logger = LoggerFactory.getLogger(ContactController.class);

  @Autowired
  private ContactService contactService;


  /**
   * lookup Person.
   *
   * @param id id.
   * @return Person
   */
  @RequestMapping(method = RequestMethod.GET, value = "/contacts/{id}",
      produces = MbsMediaType.APPLICATION_JSON_UTF8_VALUE)
  @ApiOperation(value = "Lookup contact by Id")
  public ResponseEntity<Contact> lookup(
      @ApiParam(value = "contact id", required = true) @PathVariable("id") final Long id) {
    Contact contact = contactService.getContact(id);

    if (contact == null) {
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);

    }

    return new ResponseEntity<>(contact, HttpStatus.OK);
  }

  /**
   * lookup Person.
   *
   * @param tel   String.
   * @param email String.
   * @return Person
   */
  @RequestMapping(method = RequestMethod.GET, value = "/contacts/{tel},{email}",
      produces = MbsMediaType.APPLICATION_JSON_UTF8_VALUE)
  @ApiOperation(value = "Lookup contact by tel and email")
  public ResponseEntity<Contact> lookup(
      @ApiParam(value = "tel", required = true) @PathVariable("tel") final String tel,
      @ApiParam(value = "email", required = true) @PathVariable("email") final String email) {
    Contact contact = contactService.lookup(tel, email);

    if (contact == null) {
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    return new ResponseEntity<>(contact, HttpStatus.OK);
  }

  /**
   * create a Person.
   *
   * @param request PersonRequest
   * @return Person
   */
  @RequestMapping(method = RequestMethod.PUT, value = "/contacts",
      produces = MbsMediaType.APPLICATION_JSON_UTF8_VALUE)
  @ApiOperation(value = "create a contact")
  public ResponseEntity<Contact> create(
      @ApiParam(value = "contact details", required = true)
      @Valid
      @RequestBody ContactRequest request) {

    Contact contact = new Contact();
    contact.setTel(request.getTel());
    contact.setEmail(request.getEmail());
    contact.setAddress(request.getAddress());
    contact.setCity(request.getCity());
    contact.setCountry(request.getCountry());
    contact.setPostCode(request.getPostCode());

    contact.setCreatedBy("henry");
    contact.setCreatedDate(DateTime.now());
    contact.setLastModifiedBy("henry");
    contact.setLastModifiedDate(DateTime.now());

    contact = contactService.saveContact(contact);

    return new ResponseEntity<>(contact, HttpStatus.OK);
  }


  /**
   * update a Person.
   *
   * @param request ContactRequest
   * @return Contact
   */
  @RequestMapping(method = RequestMethod.POST, value = "/contacts/{id}",
      produces = MbsMediaType.APPLICATION_JSON_UTF8_VALUE)
  @ApiOperation(value = "update a contact")
  public ResponseEntity<Contact> update(
      @ApiParam(value = "contact id", required = true)
      @PathVariable("id") final Long id,
      @ApiParam(value = "contact details", required = true)
      @Valid
      @RequestBody ContactRequest request) {

    Contact contact = contactService.getContact(id);
    if (contact == null) {
      return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
    contact.setTel(request.getTel());
    contact.setEmail(request.getEmail());
    contact.setAddress(request.getAddress());
    contact.setCity(request.getCity());
    contact.setCountry(request.getCountry());
    contact.setPostCode(request.getPostCode());

    contact.setLastModifiedBy("henry");
    contact.setLastModifiedDate(DateTime.now());

    contact = contactService.saveContact(contact);

    return new ResponseEntity<>(contact, HttpStatus.OK);
  }

  private static class ContactRequest {
    private String email;
    private String tel;
    private String address;
    private String city;
    private String province;
    private String country;
    private String postCode;

    public String getEmail() {
      return email;
    }

    public void setEmail(String email) {
      this.email = email;
    }

    public String getTel() {
      return tel;
    }

    public void setTel(String tel) {
      this.tel = tel;
    }

    public String getAddress() {
      return address;
    }

    public void setAddress(String address) {
      this.address = address;
    }

    public String getCity() {
      return city;
    }

    public void setCity(String city) {
      this.city = city;
    }

    public String getProvince() {
      return province;
    }

    public void setProvince(String province) {
      this.province = province;
    }

    public String getCountry() {
      return country;
    }

    public void setCountry(String country) {
      this.country = country;
    }

    public String getPostCode() {
      return postCode;
    }

    public void setPostCode(String postCode) {
      this.postCode = postCode;
    }
  }
}
