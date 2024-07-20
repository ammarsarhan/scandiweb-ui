import { NavLink } from 'react-router-dom';
import Logo from '@/static/assets/Logo.svg'
import Cart from '@/components/Cart';

import '@/static/navigation.css';

export default function Navigation () {
    return (
        <nav className="relative flex justify-between items-center text-sm h-20 px-16">
            <button className='sm:hidden'>MENU</button>
            <div className='hidden sm:flex'>
                <NavLink to="/">WOMEN</NavLink>
                <NavLink to="/random">MEN</NavLink>
                <NavLink to="/gibberish">KIDS</NavLink>
            </div>
            <img src={Logo} alt="Logo" className='absolute left-1/2'/>
            <Cart/>
        </nav>
    )
}