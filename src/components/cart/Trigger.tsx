import { Component } from 'react';
import Icon from '@/static/assets/Cart.svg';

type TriggerState = {
    isActive: boolean
}

export default class Trigger extends Component<{}, TriggerState> {
    render () {
        return (
            // To be used to trigger cart overlay and set overlayActive state (to gray out) in view components
            <button>
                <img src={Icon} alt="View Cart"/>
            </button>
        )
    }
}