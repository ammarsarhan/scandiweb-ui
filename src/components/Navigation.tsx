import { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Trigger from '@/components/cart/Trigger';

import Logo from '@/static/assets/Logo.svg'
import '@/static/navigation.css';

type NavigationState = {
    isNavigationActive: boolean;
}

export default class Navigation extends Component<{}, NavigationState> {
    state = {
        isNavigationActive: false
    }

    switchNavigationOpen = () => {
        if (this.state.isNavigationActive) {
            this.setState({isNavigationActive: false})
            document.body.style.overflow = 'auto';
        } else {
            this.setState({isNavigationActive: true})
            document.body.style.overflow = 'hidden';
        }
    }

    render () {
        return (
            <>
                <nav className="relative flex justify-between items-center text-sm p-8 md:px-16 md:py-0">
                    {/* Will trigger overlay with categories for mobile */}
                    <button className='md:hidden' onClick={this.switchNavigationOpen}>MENU</button>

                    {/* Responsivity needs a bit of refining but works for now */}
                    <div className='hidden md:flex'>
                        <NavLink to="/all">ALL</NavLink>
                        <NavLink to="/clothes">CLOTHES</NavLink>
                        <NavLink to="/tech">TECH</NavLink>
                    </div>
                    <NavLink to="/" className="home absolute left-[calc(50%-20.5px)]"><img src={Logo} alt="Logo"/></NavLink>
                    <Trigger/>
                </nav>
                {
                    this.state.isNavigationActive && 
                    <div className='w-screen h-screen fixed bg-white z-50 flex flex-col items-center p-5'>
                        <NavLink to="/all" className="w-full" onClick={this.switchNavigationOpen}>ALL</NavLink>
                        <NavLink to="/clothes" className="w-full" onClick={this.switchNavigationOpen}>CLOTHES</NavLink>
                        <NavLink to="/tech" className="w-full" onClick={this.switchNavigationOpen}>TECH</NavLink>
                    </div>
                }
            </>
        )
    }
}