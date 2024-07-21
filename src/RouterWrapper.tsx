import { Component } from 'react';
import { BrowserRouter } from "react-router-dom"

import App from '@/App';
import Navigation from '@/components/Navigation';
import CartDropdown from '@/components/cart/CartDropdown';

export default class RouterWrapper extends Component {
    render () {
        return (
            <BrowserRouter>
                <Navigation/>
                <div className='relative'>
                    <CartDropdown isActive={true}/>
                    <App/>
                </div>
            </BrowserRouter>
        )
    }
}