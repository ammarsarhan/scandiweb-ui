// Much more efficient and pragmatic method of passing data between components
// using React Context API instead of prop drilling

import { ProductType } from "@/types/product";
import { createContext } from "react";

const initialCartSettings = {
    dropdownActive: false,
    switchDropdownActive: () => {},
    cartItems: []  
}

export type CartContextType = {
    dropdownActive: boolean;
    switchDropdownActive: () => void;
    cartItems: ProductType[];
}

export const CartContext = createContext(initialCartSettings as CartContextType);