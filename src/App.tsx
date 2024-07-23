import { Component } from 'react'
import { CartContext } from './context/CartContext';

import View from '@/View';
import Navigation from '@/components/Navigation';
import CartDropdown from '@/components/cart/CartDropdown';

import { CartItemType } from './types/cart';

export default class App extends Component<{}, {dropdownActive: boolean}> {
    state = {
        dropdownActive: false,
        // Define function to set dropdown state by switching current value to opposite
        switchDropdownActive: () => this.state.dropdownActive ? this.setState({dropdownActive: false}) : this.setState({dropdownActive: true}),
        cartItems: [] as CartItemType[],
        // Define function to map through array and get the total quantity of products
        getQuantity: () => {
            let quantity: number = 0;
            this.state.cartItems.map((cartItem) => {
                quantity += cartItem.quantity;
                return null;
            })

            return quantity;
        },
        // Define function to map through array and get the total price
        getTotal: () => {
            let total: number = 0;
            this.state.cartItems.map((cartItem) => {
                total += cartItem.product.prices[0].amount * cartItem.quantity;
                return null;
            })

            return total;
        }
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