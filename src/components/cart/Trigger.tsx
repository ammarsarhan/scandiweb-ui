import { Component } from 'react';
import { CartContext } from '@/context/CartContext';
import Icon from '@/static/assets/Cart.svg';

type TriggerState = {
    products: number;
}

export default class Trigger extends Component<{}, TriggerState> {    
    render () {
        return (
            // Trigger cart overlay and set overlayActive state (to gray out) in view components
            <CartContext.Consumer>
                {(context) => {
                    return (
                        <button className='relative' onClick={context.switchDropdownActive}>
                            { context.getQuantity() > 0 && 
                            <div className='flex-center absolute -top-3 -right-3 bg-black w-5 h-5 rounded-full'>
                                <span className='font-semibold text-white text-sm align-middle'>{context.getQuantity()}</span>
                            </div>
                            }
                            <img src={Icon} alt="View Cart"/>
                        </button>
                    )
                }}
            </CartContext.Consumer>
        )
    }
}