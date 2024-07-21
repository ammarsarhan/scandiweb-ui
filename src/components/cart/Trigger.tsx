import { Component } from 'react';
import Icon from '@/static/assets/Cart.svg';
import { CartContext } from '@/context/CartContext';

type TriggerState = {
    products: number;
}

export default class Trigger extends Component<{}, TriggerState> {
    static contextType = CartContext;

    // Setting mock data to render component layout
    state = {
        products: 2
    }

    handleTriggerClicked = () => {
        // this.context will be set on runtime by contextType
        const { switchDropdownActive } = this.context;
        switchDropdownActive();
    }

    // Function to render counter on cart icon if products in cart
    renderCounter () {
        if (this.state.products > 0) {
            return (
                <div className='flex-center absolute -top-3 -right-3 bg-black w-5 h-5 rounded-full'>
                    <span className='font-semibold text-white text-sm align-middle'>{this.state.products}</span>
                </div>
            )
        }
    }
    
    render () {
        return (
            // Trigger cart overlay and set overlayActive state (to gray out) in view components
            <button className='relative' onClick={this.handleTriggerClicked}>
                {this.renderCounter()}
                <img src={Icon} alt="View Cart"/>
            </button>
        )
    }
}