import React from "react";
import { mount ,configure} from "enzyme";
import sinon from "sinon";
import { expect } from "chai";
import Title from "./index";

import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe("<Title />", () => {

  it("should be mount", () => {
    const wrapper = mount(<Title>Hola</Title>);
  });
  it("should be render text", () => {
    const wrapper = mount(<Title>Hola</Title>);
    expect(wrapper.find('h1').text()).to.equal('Hola');
  });
  it("should have class", () => {
    const wrapper = mount(<Title>Hola</Title>);
    expect(wrapper.find('h1').hasClass('center')).to.equal(true);
  });

});
