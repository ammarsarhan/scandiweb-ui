import { Component } from 'react'
import { CartContext } from './context/CartContext';

import View from '@/View';
import Navigation from '@/components/Navigation';
import CartDropdown from '@/components/cart/CartDropdown';

import { BrowserRouter as Router } from 'react-router-dom';

import { CartItemType } from './types/cart';

export default class App extends Component {
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
        },
        // Add function to increment quantity of product
        incrementProduct: (index: number) => {
            let newCart = this.state.cartItems;
            newCart[index].quantity += 1;
            this.setState({cartItems: newCart});
        },
        // Add function to decrement quantity of product
        decrementProduct: (index: number) => {
            let newCart = this.state.cartItems;
            newCart[index].quantity -= 1;

            if (newCart[index].quantity < 1) {
                newCart.splice(index, 1);
            }

            this.setState({cartItems: newCart});
        },
        // Add function to add product to cart
        addProductToCart: (item: CartItemType) => {
            let duplicateFlag = false;
    
            // Filling selectionIndices array with 0 (start of attributes index as default)
            item.selectionIndices = Array(item.product.attributes.length).fill(0);
    
            // Checking for duplicates of products in cart already
            this.state.cartItems.map((cartItem, index) => {
                if (cartItem.product === item.product) {
                    // If the selectionIndices are the same, then it's a duplicate
                    // Javascript treats Arrays byref, so we need to stringify them
                    if (JSON.stringify(cartItem.selectionIndices) === JSON.stringify(item.selectionIndices)) {
                        // Create new array for React to detect value change
                        let newCart = this.state.cartItems;
                        newCart[index].quantity += 1;
                        this.setState({cartItems: newCart});
                        
                        duplicateFlag = true;
                    }
                }
    
                return null;
            })
    
            // If no duplicates are found, push the item to the cart
            if (duplicateFlag === false) {
                // Create new array for React to detect value change
                this.setState({cartItems: [...this.state.cartItems, item]});
            }
        }
    }

    render () {
        return (
            <Router>
                <CartContext.Provider value={this.state}>
                    <Navigation/>
                    <div className='relative'>
                        <CartDropdown/>
                        <View/>
                    </div>
                </CartContext.Provider>
            </Router>
        )
    }
}