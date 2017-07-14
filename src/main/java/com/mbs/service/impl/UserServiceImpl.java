package com.mbs.service.impl;

import com.mbs.domain.User;
import com.mbs.repository.UserRepository;
import com.mbs.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Created by hhuang on 7/5/17.
 */
@Service
@Transactional
public class UserServiceImpl implements UserService {
  @Autowired
  private UserRepository userRepository;

  @Override
  public User createUser(User user) {
    return userRepository.save(user);
  }

  @Override
  public User changePassword(String userName, String password) {
    User user = userRepository.findOne(userName);
    user.setPassword(password);
    return userRepository.save(user);
  }

  private User setUserStatus(String userName, User.Status status) {
    User user = userRepository.findOne(userName);
    user.setStatus(status);
    return userRepository.save(user);
  }

  @Override
  public User activateUser(String userName) {
    return setUserStatus(userName, User.Status.ACTIVE);
  }

  @Override
  public User deactivateUser(String userName) {
    return setUserStatus(userName, User.Status.INACTIVE);
  }

  @Override
  public User deleteUser(String userName) {
    return setUserStatus(userName, User.Status.DELETED);
  }

  @Override
  public String resetPassword(String userName, String email) {
    return null;
  }

  @Override
  public boolean authenticate(String userName, String password) {
    return false;
  }
}
