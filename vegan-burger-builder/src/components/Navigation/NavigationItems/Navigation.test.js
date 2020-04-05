import React from 'react';
import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';
import Adapter from 'enzyme-adapter-react-16';
import { configure, shallow } from 'enzyme';

configure({ adapter: new Adapter() });

describe('<NavigationItems />', () => {

    let wrapper;
    beforeAll(() => {
        wrapper = shallow(<NavigationItems />);
    })
    
    it('should render only 2 <NavigationItem /> if not authenticated', () => {
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    })

    it('should render 3 <NavigationItem /> if authenticated', () => {
        wrapper.setProps({ isAuth: true });
        expect(wrapper.find(NavigationItem)).toHaveLength(3);
    })

    it('should contain Logout navigation item if authenticated', () => {
        wrapper.setProps({ isAuth: true });
        expect(wrapper.contains(<NavigationItem link="/logout">Logout</NavigationItem>)).toEqual(true);
    })
})