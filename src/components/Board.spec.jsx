import React from 'react';
import chai, {expect} from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { shallow } from 'enzyme';
import Board from './Board';
chai.use(chaiEnzyme());

describe('Board component render', () => {
  //Example: a very basic assert
  it('should render a div element', () => {
    const result = shallow(<Board dimension='11'/>);

    expect(result.find('div')).to.have.length(1);
  });

  //Example: multiple asserts
  it('should apply a width and height of the given dimension', () => {
    const result = shallow(<Board dimension='15'/>);

    const style = result.prop('style');
    expect(style.width).to.equal('15px');
    expect(style.height).to.equal('15px');
  });
});
