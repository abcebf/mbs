package com.mbs.web.controller.utils;

import org.springframework.http.MediaType;

import java.nio.charset.Charset;

/**
 * Created by hhuang on 7/4/17.
 */
public class MbsMediaType {
  public static final MediaType APPLICATION_JSON_UTF8 = new MediaType(
      MediaType.APPLICATION_JSON.getType(), MediaType.APPLICATION_JSON.getSubtype(),
      Charset.forName("utf8"));

  public static final String APPLICATION_JSON_UTF8_VALUE = "application/json; charset=utf-8";
}
