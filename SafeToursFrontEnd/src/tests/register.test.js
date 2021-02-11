import React from 'react';
import {shallow} from 'enzyme';
import Register from '../components/register'

describe('Register-Component', () => {
    it('without error', () => {
        expect(shallow(<Register/>).find('form.reg').exists()).toBe(true)
    });
    it('renders username input', () => {
        expect(shallow(<Register/>).find('#username').length).toEqual(1)
    });
    it('renders password input', () => {
        expect(shallow(<Register/>).find('#password').length).toEqual(1)
    });

    it('renders email input', () => {
        expect(shallow(<Register/>).find('#email').length).toEqual(1)
    });

});

describe('username input', () => {
    it('respond to change  Register Component', () => {
        const wrapper = shallow(<Register/>);
        wrapper.find('#username').simulate('change', {
            target: {
                name: 'username', value:
                    'it18032598'
            }
        });
        expect(wrapper.state('username')).toEqual('it18032598');
    })
})

describe('email input', () => {
    it('respond to change  Register Component', () => {
        const wrapper = shallow(<Register/>);
        wrapper.find('#email').simulate('change', {
            target: {
                name: 'email', value:
                    'it18032598@sliit.lk'
            }
        });
        expect(wrapper.state('username')).toEqual('it18032598@sliit.lk');
    })
})
describe('password input', () => {
    it('should respond to change event and change the state of the Login Component', () => {
        const wrapper = shallow(<Register/>);
        wrapper.find('#password').simulate('change', {
            target: {
                name: 'password', value:
                    'Homagama502'
            }
        });
        expect(wrapper.state('password')).toEqual('Homagama502');
    })
})