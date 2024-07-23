// Much more efficient and pragmatic method of passing data between components
// using React Context API instead of prop drilling

import { CartItemType } from '@/types/cart';
import { createContext } from "react";

const initialCartSettings = {
    dropdownActive: false,
    switchDropdownActive: () => {},
    cartItems: []  
}

export type CartContextType = {
    dropdownActive: boolean;
    switchDropdownActive: () => void;
    cartItems: CartItemType[];
}

export const CartContext = createContext(initialCartSettings as CartContextType);