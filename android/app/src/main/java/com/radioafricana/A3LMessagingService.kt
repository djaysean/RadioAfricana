package com.radioafricana

import android.content.Context
import android.util.Log
import com.amazon.A3L.messaging.A3LMessagingService
import com.amazon.A3L.messaging.RemoteMessage

class A3LMessagingService : A3LMessagingService() {

    companion object {
        private const val TAG = "RadioAfricanaA3L"
    }

    override fun onNewToken(context: Context, token: String) {
        Log.i(TAG, "A3L device token received: $token")
    }

    override fun onMessageReceived(
        context: Context,
        remoteMessage: RemoteMessage
    ) {
        Log.i(TAG, "A3L message received")

        val data = remoteMessage.data

        for ((key, value) in data) {
            Log.i(TAG, "A3L data: $key = $value")
        }

        val notification = remoteMessage.notification

        if (notification != null) {
            Log.i(
                TAG,
                "A3L notification: title=${notification.title}, body=${notification.body}"
            )
        }
    }
}