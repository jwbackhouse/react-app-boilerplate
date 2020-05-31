import React from 'react';
import { shallow } from 'enzyme';
import { Header } from '../../components/Header';
import { firebase } from '../../firebase/firebase';

let startLogout, wrapper;
beforeEach(() => {
  startLogout = jest.fn();
  wrapper = shallow(<Header startLogout={startLogout} />);
});

test('Should render Header correctly', () => {
  expect(wrapper).toMatchSnapshot();
});

test('Should call the startLogout action when logout button clicked', () =>{
  wrapper.find('button').simulate('click');
  expect(startLogout).toBeCalled();
  // expect(firebase.auth().currentUser).toEqual(null);
});