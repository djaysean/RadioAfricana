/**
 * @format
 */

import React from 'react';
import ReactTestRenderer from 'react-test-renderer';

jest.mock('../src/navigation', () => {
  const ReactLib = require('react');
  const {View} = require('react-native');

  return function MockAppNavigator() {
    return ReactLib.createElement(View, {
      testID: 'mock-app-navigator',
    });
  };
});

jest.mock('../src/services/notifications', () => ({
  initializeNotifications: jest.fn(() => Promise.resolve(() => {})),
}));

import App from '../App';

test('renders correctly', async () => {
  await ReactTestRenderer.act(() => {
    ReactTestRenderer.create(<App />);
  });
});