package com.mbs.service;

import com.mbs.domain.User;

/**
 * Created by hhuang on 7/4/17.
 */
public interface UserService {

  User createUser(User user);

  User changePassword(String userName, String password);

  User activateUser(String userName);

  User deactivateUser(String userName);

  User deleteUser(String userName);

  String resetPassword(String userName, String email);

  boolean authenticate(String userName, String password);

}
