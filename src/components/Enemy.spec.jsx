import React from 'react';
import chai, {expect} from 'chai';
import sinon from 'sinon';
import chaiEnzyme from 'chai-enzyme';
import { shallow } from 'enzyme';
import Enemy from './Enemy';
chai.use(chaiEnzyme());

describe('Enemy component', () => {
  describe('componentDidUpdate', () => {
    //Example: providing an empty stubbed function as an argument
    it('should call onCollide if the player item equals the enemy position', () => {
      const onCollide = sinon.stub();

      const result = shallow(<Enemy
        size={5}
        info={{top: 0, left: 0, dir: 'LEFT'}}
        playerPosition={{top: 0, left:0}}
        onCollide={onCollide}
      />);

      const component = result.instance();
      component.componentDidUpdate();
      expect(onCollide.called).to.be.true;
    });

    //Example: verifying that a function was called
    it('should call onCollide if the player item overlaps the enemy position', () => {
      const onCollide = sinon.stub();

      const result = shallow(<Enemy
        size={5}
        info={{top: 3, left: 3, dir: 'LEFT'}}
        playerPosition={{top: 0, left:0}}
        onCollide={onCollide}
      />);

      const component = result.instance();
      component.componentDidUpdate();
      expect(onCollide.called).to.be.true;
    });

    //Example: verifying that a function was not called
    it('should not call onCollide if the player item does not overlap the enemy position', () => {
      const onCollide = sinon.stub();

      const result = shallow(<Enemy
        size={5}
        info={{top: 3, left: 3, dir: 'LEFT'}}
        playerPosition={{top: 10, left:10}}
        onCollide={onCollide}
      />);

      const component = result.instance();
      component.componentDidUpdate();
      expect(onCollide.called).not.to.be.true;
    });
  });
});
