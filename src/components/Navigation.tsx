import { Component } from 'react';

import { NavLink } from 'react-router-dom';
import Logo from '@/static/assets/Logo.svg'
import Cart from '@/components/Cart';

import '@/static/navigation.css';

export default class Navigation extends Component {
    render () {
        return (
            <nav className="relative flex justify-between items-center text-sm h-20 px-16">
                <button className='sm:hidden'>MENU</button>
                <div className='hidden sm:flex'>
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