import React from 'react';
import {shallow} from 'enzyme';
import Login from '../components/login'

describe('Login-Component', () => {
    it('without error', () => {
        expect(shallow(<Login/>).find('form').exists()).toBe(true)
    });
    it('renders username input', () => {
        expect(shallow(<Login/>).find('#username').length).toEqual(1)
    });
    it('renders password input', () => {
        expect(shallow(<Login/>).find('#password').length).toEqual(1)
    });

});

describe('username input', () => {
    it('respond to change Login Component', () => {
        const wrapper = shallow(<Login/>);
        wrapper.find('#username').simulate('change', {
            target: {
                name: 'username', value:
                    'it18032598'
            }
        });
        expect(wrapper.state('username')).toEqual('it18032598');
    })
})
describe('password input', () => {
    it('respond to change Login Component', () => {
        const wrapper = shallow(<Login/>);
        wrapper.find('#password').simulate('change', {
            target: {
                name: 'password', value:
                    'Homagama502'
            }
        });
        expect(wrapper.state('password')).toEqual('Homagama502');
    })
})
