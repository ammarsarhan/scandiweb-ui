// Much more efficient and pragmatic method of passing data between components
// using React Context API instead of prop drilling

import { CartItemType } from '@/types/cart';
import { createContext } from "react";

const initialCartSettings = {
    dropdownActive: false,
    switchDropdownActive: () => {},
    cartItems: [],
    getQuantity: () => 0,
    getTotal: () => 0,
    addProductToCart: () => {},
    incrementProduct: () => {},
    decrementProduct: () => {},
    placeOrder: () => {},
}

export type CartContextType = {
    dropdownActive: boolean;
    switchDropdownActive: () => void;
    cartItems: CartItemType[];
    getQuantity: () => number;
    getTotal: () => number;
    addProductToCart: (item: CartItemType) => void;
    incrementProduct: (index: number) => void;
    decrementProduct: (index: number) => void;
    placeOrder: () => void;
}

export const CartContext = createContext(initialCartSettings as CartContextType);