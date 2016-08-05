import React from 'react';
import chai, {expect} from 'chai';
import sinon from 'sinon';
import chaiEnzyme from 'chai-enzyme';
import { shallow } from 'enzyme';
import Game from './Game';
import axios from 'axios';
import {Promise} from 'es6-promise';
chai.use(chaiEnzyme());

describe('Game container', () => {
  describe('incrementActiveEnemies', () => {
      //Example: using a spy to verify that a function was called
      // with correct parameters
      it ('should call setState with an activeEnemies value incremented by 1', () => {
        const result = shallow(<Game playerSize={2}></Game>);

        const component = result.instance();
        result.setState({
          activeEnemies: 5
        });

        sinon.spy(component, 'setState');
        component.incrementActiveEnemies();
        expect(component.setState.args[0][0]).to.deep.equal({
          activeEnemies: 6
        });
      });
  });

  describe('resetGame', () => {
    //Example: stubbing an existing function by name
    it('should call updateGlobalHighScore if the player\'s score is higher than the current globalHighScore', () => {
      const result = shallow(<Game playerSize={2}></Game>);

      const component = result.instance();
      result.setState({
        playerScore: 100,
        globalHighScore: 10
      });

      sinon.stub(component, 'updateGlobalHighScore'); //This will overwrite the existing function with an empty function
      component.resetGame();
      expect(component.updateGlobalHighScore.called).to.be.true;
    });
  });

  describe('fetchGlobalHighScore', () => {
    //Example: stubbing a third party library function,
    //which also returns a promsie
    it ('should call axios.get', () => {
      sinon.stub(axios, 'get').returns(Promise.resolve());

      const result = shallow(<Game playerSize={2}></Game>);

      const component = result.instance();
      component.fetchGlobalHighScore();
      expect(axios.get.called).to.be.true;

      //Restore the function on the imported library so it
      //doesn't interfere with later tests
      axios.get.restore();
    });

    it ('should update the globalHighScore state with the returned value', (done) => {
      //^ Note that done is provided as an argument above
      //Example: Testing the result to an async function
      sinon.stub(axios, 'get').returns(Promise.resolve({
        data: {
          fields: {
            global_high_score: 3000
          }
        }
      }));

      const result = shallow(<Game playerSize={2}></Game>);
      result.setState({
        globalHighScore: 100
      });

      expect(result.state('globalHighScore')).to.equal(100);
      const component = result.instance();

      component.fetchGlobalHighScore().then(() => {
        expect(result.state('globalHighScore')).to.equal(3000);
        axios.get.restore();
        done(); //Call done after competing all your asserts. This will signal the end of the test
      });
    });
  });
});
