import { Component } from 'react';
import Icon from '@/static/assets/Cart.svg';

export default class Cart extends Component {
    render () {
        return (
            // To be used to trigger cart overlay and set overlayActive state (to gray out) in view components
            <button onClick={() => console.log("Toggled Cart Overlay")}>
                <img src={Icon} alt="View Cart"/>
            </button>
        )
    }
}