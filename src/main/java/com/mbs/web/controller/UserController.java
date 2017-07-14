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

import com.mbs.domain.Person;
import com.mbs.domain.User;
import com.mbs.service.PersonService;
import com.mbs.service.UserService;
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
public class UserController {
  @SuppressWarnings("unused")
  private static final Logger logger = LoggerFactory.getLogger(UserController.class);
  @Autowired
  private UserService userService;
  @Autowired
  private PersonService personService;


  /**
   * create a Person.
   *
   * @param request UserRequest
   * @return User
   */
  @RequestMapping(method = RequestMethod.PUT, value = "/users",
      produces = MbsMediaType.APPLICATION_JSON_UTF8_VALUE)
  @ApiOperation(value = "register a user")
  public ResponseEntity<User> create(
      @ApiParam(value = "user details", required = true)
      @Valid
      @RequestBody UserRequest request) {

    Person person = personService.getPerson(request.getPersonId());
    if (person == null) {
      return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
    User user = new User();
    user.setUserName(request.getUserName());
    user.setPassword(request.getPassword());
    user.setPerson(person);
    user.setStatus(User.Status.INACTIVE);

    user.setCreatedBy("henry");
    user.setCreatedDate(DateTime.now());
    user.setLastModifiedBy("henry");
    user.setLastModifiedDate(DateTime.now());
    user = userService.createUser(user);

    return new ResponseEntity<>(user, HttpStatus.OK);
  }

  /**
   * update a Person.
   *
   * @param userName String
   * @return User
   */
  @RequestMapping(method = RequestMethod.POST, value = "/users/{userName}/activate",
      produces = MbsMediaType.APPLICATION_JSON_UTF8_VALUE)
  @ApiOperation(value = "activate an user")
  public ResponseEntity<User> activate(
      @ApiParam(value = "user name", required = true)
      @PathVariable("userName") final String userName) {

    User user = userService.activateUser(userName);

    return new ResponseEntity<>(user, HttpStatus.OK);
  }

  private static class UserRequest {
    private String userName;
    private String password;
    private Long personId;

    public String getUserName() {
      return userName;
    }

    public void setUserName(String userName) {
      this.userName = userName;
    }

    public String getPassword() {
      return password;
    }

    public void setPassword(String password) {
      this.password = password;
    }

    public Long getPersonId() {
      return personId;
    }

    public void setPersonId(Long personId) {
      this.personId = personId;
    }
  }
}
