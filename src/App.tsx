import { Component } from 'react'
import { CartContext } from './context/CartContext';

import View from '@/View';
import Navigation from '@/components/Navigation';
import CartDropdown from '@/components/cart/CartDropdown';


export default class App extends Component<{}, {dropdownActive: boolean}> {
    switchDropdownActive = () => {
        this.state.dropdownActive ? this.setState({dropdownActive: false}) : this.setState({dropdownActive: true});
    }

    state = {
        dropdownActive: true,
        switchDropdownActive: this.switchDropdownActive
    }

    render () {
        return (
            <CartContext.Provider value={this.state}>
                <Navigation/>
                <div className='relative'>
                    <CartDropdown/>
                    <View/>
                </div>
            </CartContext.Provider>
        )
    }
}