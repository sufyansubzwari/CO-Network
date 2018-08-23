import React from 'react';
import { Meteor } from 'meteor/meteor';
import { configure, mount } from 'enzyme';
import { expect } from 'chai';
import Message from './index';

import Adapter from 'enzyme-adapter-react-16';
import theme from '../../../theme';
import { ThemeProvider } from 'styled-components';

configure({ adapter: new Adapter() });

if(Meteor.isClient) {
  describe("<Message />", () => {

    it("should be mount", () => {
      const wrapper = mount(
        <ThemeProvider theme={theme}>
          <Message type="error" content='Ops'/>
        </ThemeProvider>
      );
    });
    it("should be render text", () => {
      const wrapper = mount(
        <ThemeProvider theme={theme}>
          <Message type="error" content='Ops'/>
        </ThemeProvider>
      );
      expect(wrapper.find('div').text()).to.equal('Ops');
    });

  });
}