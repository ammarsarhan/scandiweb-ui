import { Component } from 'react';
import Icon from '@/static/assets/Cart.svg';

export default class Cart extends Component {
    render () {
        return (
            <button onClick={() => console.log("Toggled Cart Overlay")}>
                <img src={Icon} alt="View Cart"/>
            </button>
        )
    }
}