"use client"

import { createContext, ReactNode, useContext, useState } from "react";


interface AppContextType {
    categorie : string;
    setCategorie : React.Dispatch<React.SetStateAction<string>>;
}


const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({children} : {children : ReactNode}) => {
    // defining functions and const that add theme to AppContextType interface;
    const [categorie, setCategorie] = useState<string>("All");

    return(
        <AppContext.Provider value={{categorie, setCategorie}} >
            {children}
        </AppContext.Provider>
    )
}

// context hook 

export const useAppContext = () => {
    const context = useContext(AppContext);
    if(!context) {
        throw new Error("useAppContext must be used within the app provider !");
    }

    return context;
}