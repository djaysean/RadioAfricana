package com.radioafricana

import android.app.Application
import android.os.Build
import android.util.Log
import com.amazon.A3L.messaging.A3LMessaging
import com.amazon.A3L.messaging.registration.InitCallbackResponse
import com.amazon.A3L.messaging.registration.OnInitCallback
import com.facebook.react.PackageList
import com.facebook.react.ReactApplication
import com.facebook.react.ReactHost
import com.facebook.react.ReactNativeApplicationEntryPoint.loadReactNative
import com.facebook.react.defaults.DefaultReactHost.getDefaultReactHost

class MainApplication : Application(), ReactApplication {

  companion object {
    private const val TAG = "RadioAfricanaA3L"
  }

  override val reactHost: ReactHost by lazy {
    getDefaultReactHost(
      context = applicationContext,
      packageList =
        PackageList(this).packages.apply {
          // Packages that cannot be autolinked yet can be added manually here, for example:
          // add(MyReactNativePackage())
        },
    )
  }

  override fun onCreate() {
    super.onCreate()

    initializeA3LMessagingIfAmazon()

    loadReactNative(this)
  }

  private fun initializeA3LMessagingIfAmazon() {
    if (!Build.MANUFACTURER.equals("Amazon", ignoreCase = true)) {
      return
    }

    Log.i(TAG, "Amazon device detected. Initializing A3L Messaging.")

    A3LMessaging.init(
      applicationContext,
      object : OnInitCallback() {
        override fun onReady(response: InitCallbackResponse) {
          if (response.isSuccessful()) {
            Log.i(TAG, "A3L Messaging initialized successfully.")
          } else {
            Log.e(
              TAG,
              "A3L Messaging initialization failed: ${response.getErrorMessage()}",
              response.getException()
            )
          }
        }
      }
    )
  }
}