import React from 'react';

import { shallow } from 'enzyme';

import Home from '../../../pages/Home';

import { Link } from 'react-router-dom';

// describe: test suit, making test output more readble
// containing all Home Component tests
describe('Home', () => {
    // all the tests for this suit
    // in order to test the component we need a instance of it where we can easily examin and make assumptions against it
    // ENZYME SHALLOW function: it allows us to render a react component to an object in memory insted of the DOM (faster)
    // it wraps that object in a wrapper that give us functions to easily examin the rendered component
    const wrapper = shallow(<Home />);
    it('should show loading screen', () => { // 'what the test is for', body of the test
        const loadingScreen = wrapper.find('div div section');
        expect(loadingScreen.text()).toBe('Loading...');
    })
    it('should show pokemon list', () => { // 'what the test is for', body of the test
        // const pokemonListItem = wrapper.find(`div div section ul li Link to"/${Link}` );

        expect(wrapper).toMatchSnapshot();
    })

    it('should be false', () => {
        const foo= true;
        expect(foo).toBe(true);
    })
});