import { Component } from 'react';

import { NavLink } from 'react-router-dom';
import Logo from '@/static/assets/Logo.svg'
import Trigger from '@/components/cart/Trigger';

import '@/static/navigation.css';

type NavigationState = {
    isCartActive: boolean;
}

export default class Navigation extends Component<{}, NavigationState> {

    handleToggleCart (data: boolean) {
        console.log(data)
    }

    render () {
        return (
            <nav className="relative flex justify-between items-center text-sm p-8 md:px-16 md:py-0">
                {/* Will trigger overlay with categories for mobile */}
                <button className='md:hidden'>MENU</button>
                {/* Responsivity needs a bit of refining but works for now */}
                <div className='hidden md:flex'>
                    <NavLink to="/category/women">WOMEN</NavLink>
                    <NavLink to="/category/men">MEN</NavLink>
                    <NavLink to="/category/kids">KIDS</NavLink>
                </div>
                <NavLink to="/" className="home absolute left-1/2"><img src={Logo} alt="Logo"/></NavLink>
                <Trigger products={1} setToggle={this.handleToggleCart}/>
            </nav>
        )
    }
}