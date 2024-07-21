import { Component } from 'react';
import Icon from '@/static/assets/Cart.svg';

type TriggerProps = {
    products: number;
    setToggle: (data: boolean) => void;
}

export default class Trigger extends Component<TriggerProps, {isActive: boolean}> {
    // Switch & pass state to Navigation component to toggle overlay
    handleToggle = () => {
        if (this.state.isActive) {
            this.props.setToggle(false)
            this.setState({isActive: false})
        } else {
            this.props.setToggle(true)
            this.setState({isActive: true})
        }
    }

    // Function to render counter on cart icon if products in cart
    renderCounter () {
        if (this.props.products > 0) {
            return (
                <div className='flex-center absolute -top-3 -right-3 bg-black w-5 h-5 rounded-full'>
                    <span className='font-semibold text-white text-sm align-middle'>{this.props.products}</span>
                </div>
            )
        }
    }

    // Set inital overlay state to false
    componentDidMount() {
        this.setState({isActive: false})
    }

    render () {
        return (
            // To be used to trigger cart overlay and set overlayActive state (to gray out) in view components
            <button className='relative' onClick={this.handleToggle}>
                {this.renderCounter()}
                <img src={Icon} alt="View Cart"/>
            </button>
        )
    }
}