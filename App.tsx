/**
 * Radio Africana Mobile
 */

import React, {useEffect} from 'react';

import AppNavigator from './src/navigation';
import {initializeNotifications} from './src/services/notifications';

export default function App() {
  useEffect(() => {
    let unsubscribe: (() => void) | undefined;

    initializeNotifications()
      .then(cleanup => {
        unsubscribe = cleanup;
      })
      .catch(error => {
        console.error(
          'Failed to initialize Radio Africana notifications:',
          error,
        );
      });

    return () => {
      unsubscribe?.();
    };
  }, []);

  return <AppNavigator />;
}