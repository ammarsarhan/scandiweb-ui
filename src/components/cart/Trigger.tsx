import { Component } from 'react';
import Icon from '@/static/assets/Cart.svg';
import { CartContextType, CartContext } from '@/context/CartContext';

type TriggerState = {
    products: number;
}

export default class Trigger extends Component<{}, TriggerState> {
    static contextType = CartContext;

    handleTriggerClicked = () => {
        // this.context will be set on runtime by contextType
        const { switchDropdownActive } = this.context as CartContextType;
        switchDropdownActive();
    }

    // Function to render counter on cart icon if products in cart
    renderCounter () {
        const { getQuantity } = this.context as CartContextType;

        if (getQuantity() > 0) {
            return (
                <div className='flex-center absolute -top-3 -right-3 bg-black w-5 h-5 rounded-full'>
                    <span className='font-semibold text-white text-sm align-middle'>{getQuantity()}</span>
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