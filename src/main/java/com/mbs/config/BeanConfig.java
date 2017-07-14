/*
 * Copyright 2016, Paysafe Group PLC, 2 Place Alexis Nihon, suite 700, Westmount, Quebec, Canada
 * All rights reserved.
 *
 * This software is the confidential and proprietary information of Paysafe Group PLC
 * ("Confidential Information"). You shall not disclose such Confidential Information and shall use
 * it only in accordance with the terms of the license agreement you entered into with Optimal
 * Payments.
 */


package com.mbs.config;

import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

@Component
public class BeanConfig {
  /**
   * corsConfigurer.
   *
   * @return WebMvcConfigurer
   */
  @Bean
  public WebMvcConfigurer corsConfigurer() {
    return new WebMvcConfigurerAdapter() {
      @Override
      public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/mbs/**")
//            .allowedOrigins("*")
            .allowedMethods("GET", "PUT", "POST", "DELETE", "OPTIONS");
//            .allowedHeaders("*");
      }
    };
  }
}
