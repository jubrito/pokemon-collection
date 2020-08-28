// import React from 'react';
// import { render } from '@testing-library/react';
// import App from './App';

// test('renders learn react link', () => {
//   const { getByText } = render(<App />);
//   const linkElement = getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

import React from 'react';
import { shallow } from 'enzyme';
import App from '../App';
test('renders the component', () => {
  const component = shallow(<App />);
  expect(component).toMatchSnapshot();
});