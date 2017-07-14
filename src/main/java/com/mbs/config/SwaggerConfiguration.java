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

import com.google.common.base.Predicate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.Contact;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

import static com.google.common.base.Predicates.or;
import static springfox.documentation.builders.PathSelectors.regex;

@Configuration
@EnableSwagger2
@EnableAutoConfiguration
public class SwaggerConfiguration {

  private final Logger logger = LoggerFactory.getLogger(this.getClass());

  /**
   * giftCardApi.
   *
   * @return Docket
   */
  @Bean
  public Docket marketingBonusEditorApi() {

    logger.info("Configuring Swagger");

    return new Docket(DocumentationType.SWAGGER_2)
        .groupName("mbs-api")
        .apiInfo(apiInfo()
        ).select().paths(walletMarketingBonusEditorPaths()).build();
  }

  private ApiInfo apiInfo() {

    return new ApiInfoBuilder().title("Micro Business Service API")
        .description("microservices to support micro business service")
        .contact(getApiContact()).version("v1").build();
  }

  @SuppressWarnings("unchecked")
  private Predicate<String> walletMarketingBonusEditorPaths() {

    return or(regex("/mbs/.*"));
  }

  @SuppressWarnings("unchcked")
  private Contact getApiContact() {
    return new Contact("mbs", "www.mbs.com", "hslcalgary@gmail.com");
  }

}
