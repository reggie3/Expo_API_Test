import React from 'react';
import ExpoAPITest from './ExpoAPITest';

import renderer from 'react-test-renderer';

it('renders without crashing', () => {
  const rendered = renderer.create(<ExpoAPITest />).toJSON();
  expect(rendered).toBeTruthy();
});
