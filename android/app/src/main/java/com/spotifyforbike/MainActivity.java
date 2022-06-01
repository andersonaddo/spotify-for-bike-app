package com.spotifyforbike;

import com.facebook.react.ReactActivity;

import android.os.Bundle; //Added for react-navigation

public class MainActivity extends ReactActivity {

  //Added for react-navigation
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(null);
  }

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "spotifyforbike";
  }
}
