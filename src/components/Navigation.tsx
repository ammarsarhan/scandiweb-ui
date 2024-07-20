import { Component } from 'react';

import { NavLink } from 'react-router-dom';
import Logo from '@/static/assets/Logo.svg'
import Cart from '@/components/Cart';

import '@/static/navigation.css';

export default class Navigation extends Component {
    render () {
        return (
            <nav className="relative flex justify-between items-center text-sm h-20 px-16">
                {/* Will trigger overlay with categories for mobile */}
                <button className='md:hidden'>MENU</button>
                {/* Responsivity needs a bit of refining but works for now */}
                <div className='hidden md:flex'>
                    <NavLink to="/category/women">WOMEN</NavLink>
                    <NavLink to="/category/men">MEN</NavLink>
                    <NavLink to="/category/kids">KIDS</NavLink>
                </div>
                <NavLink to="/" className="home absolute left-1/2"><img src={Logo} alt="Logo"/></NavLink>
                <Cart/>
            </nav>
        )
    }
}