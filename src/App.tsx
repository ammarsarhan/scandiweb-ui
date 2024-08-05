import { Component } from 'react'
import { CartContext } from './context/CartContext';

import View from '@/View';
import Navigation from '@/components/Navigation';
import CartDropdown from '@/components/cart/CartDropdown';

import { BrowserRouter as Router } from 'react-router-dom';
import { CartItemType } from './types/cart';

import convertTypeToString from '@/utils/parse';

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
            let newCart = [...this.state.cartItems];
            newCart[index].quantity += 1;
            this.setState({cartItems: newCart});
        },
        // Add function to decrement quantity of product
        decrementProduct: (index: number) => {
            // Create a new array with the current items
            let newCart = [...this.state.cartItems];
            
            const updatedItem = { 
                ...newCart[index], 
                quantity: newCart[index].quantity - 1 
            };
            
            // If the quantity is less than 1, remove the item
            if (updatedItem.quantity < 1) {
                newCart = newCart.filter((_, i) => i !== index);
            } else {
                // Otherwise, update the item in the new array
                newCart[index] = updatedItem;
            }
            
            this.setState({ cartItems: newCart });
        },
        // Add function to add product to cart
        addProductToCart: (item: CartItemType) => {
            let duplicateFlag = false;
            
            // Filling selectionIndices array with 0 (start of attributes index as default)
            if (JSON.stringify(item.selectionIndices) === JSON.stringify([])) {
                item.selectionIndices = Array(item.product.attributes.length).fill(0);
            }
            
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
        },
        // Add function to increment quantity of product
        placeOrder: () => {
            // Format to stay datetime compliant with MySQL database
            const time = new Date().toISOString().slice(0, 19).replace('T', ' ');
            // Prepare the products array for the mutation
            let products = convertTypeToString(this.state.cartItems);
            // GraphQL does not handle \ well, so we need to escape them
            products = products.replace(/\\/g, '\\\\\\\\');

            const url = 'http://18.194.213.95/api/';

            const mutation = 
            `mutation {
                createOrder(products: ${products}, createdAt: "${time}")
            }`;
            
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 
                    query: mutation
                })
            })
            .catch(error => {
              console.error('Fetch:', error);
              return;
            });            

            // Clear cart and reset dropdown
            this.setState({cartItems: [], dropdownActive: false});
        },
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