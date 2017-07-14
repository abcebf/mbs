package com.mbs.repository;

import com.mbs.domain.Account;
import com.mbs.domain.User;
import org.springframework.data.repository.CrudRepository;

/**
 * Created by hhuang on 6/30/17.
 */
//@Transactional
public interface UserRepository extends CrudRepository<User, String> {

}
