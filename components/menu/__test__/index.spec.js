import expect from 'expect';
import React from 'react';
import { mount, shallow } from 'enzyme';
import { IconMenu } from '../IconMenu';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-addons-test-utils';
import Menu from '../Menu';
import MenuItem, {MenuItem as RawMenuItem} from '../MenuItem';

describe('IconMenu', () => {
  describe('#on mount', () => {
    describe('when \'active\' prop is not set', () => {
      it('sets \'active\' Menu prop correctly', () => {
        const wrapper = shallow(<IconMenu />);
        expect(wrapper.find('Menu').props().active).toBe(false);
      });
    });

    describe('when \'active\' prop is set to false', () => {
      it('sets \'active\' Menu prop correctly', () => {
        const wrapper = shallow(<IconMenu active={false} />);
        expect(wrapper.find('Menu').props().active).toBe(false);
      });
    });

    describe('when \'active\' prop is set to true', () => {
      it('sets \'active\' Menu prop correctly', () => {
        const wrapper = shallow(<IconMenu active />);
        expect(wrapper.find('Menu').props().active).toBe(true);
      });

      it('sets \'active\' Menu prop correctly after IconButton click', () => {
        const wrapper = mount(<IconMenu active />);
        wrapper.find('IconButton').simulate('click');
        expect(wrapper.find('Menu').props().active).toBe(false);
      });
    });
  });
});

describe('MenuItem', function () {
  describe('#onClick', function () {
    it('passes to listener the event', function () {
      let listenerCalled = false;
      const handleClick = function (event) {
        listenerCalled = true;
        expect(event).toExist();
        expect(event.target).toExist();
      };

      const tree = ReactTestUtils.renderIntoDocument(
        <Menu>
          <MenuItem key="1" onClick={handleClick}/>
        </Menu>);

      const menuItem = ReactTestUtils.findRenderedComponentWithType(tree, RawMenuItem);
      ReactTestUtils.Simulate.click(ReactDOM.findDOMNode(menuItem));

      expect(listenerCalled).toBe(true);
    });
  });
});
