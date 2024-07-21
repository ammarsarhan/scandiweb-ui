// Much more efficient and pragmatic method of passing data between components
// using React Context API instead of prop drilling

import { createContext } from "react";
export const DropdownContext = createContext({dropdownActive: false, switchDropdownActive: () => {}});