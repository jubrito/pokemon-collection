import React from 'react';
import { shallow } from 'enzyme'

describe('Hello, Enzyme!', () => {
  it('renders', () => {
    const hello = <h1>Hello, Enzyme!</h1>
    const wrapper = shallow(<div>
      <h1>Hello, Enzyme!</h1>
    </div>)
    expect(wrapper.find('h1').html()).toMatch(/Hello, Enzyme/);
    // expect(wrapper.contains(hello)).toEqual(true);
  })

  it('renders snapshots, too', () => {
    const wrapper = shallow(<div>
      <h1>Hello, Enzyme!</h1>
    </div>)
    expect(wrapper).toMatchSnapshot()
  })
})