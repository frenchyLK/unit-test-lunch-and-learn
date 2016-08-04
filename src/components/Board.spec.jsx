import React from 'react';
import chai, {expect} from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { shallow } from 'enzyme';
import Board from './Board';
chai.use(chaiEnzyme());

describe('Board', () => {
  it('should render an element', () => {
    const result = shallow(<Board dimension='11'/>);

    expect(result.find('div')).to.have.length(1);
  });
});
