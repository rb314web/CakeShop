import {createContext} from "react";
export const Context = createContext<string | number[]>([]);
export const UserContext = createContext<any>(null);