package com.mbs;


import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.support.SpringBootServletInitializer;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Scope;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

//@ComponentScan
//@EntityScan("com.mbs.domain")
@EnableJpaRepositories("com.mbs.repository")
@SpringBootApplication
public class Application /*extends SpringBootServletInitializer*/ {

//  @Override
//  protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
//    return application.sources(Application.class);
//  }

  public static void main(String[] args) throws Exception {
    SpringApplication.run(Application.class, args);
  }

}
