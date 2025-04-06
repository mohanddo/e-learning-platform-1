"use client"

import React, { createContext, ReactNode, useContext, useState } from "react";


interface AppContextType {
    categorie : string;
    setCategorie : React.Dispatch<React.SetStateAction<string>>;
    isSignUp : boolean;
    setIsSignUp : React.Dispatch<React.SetStateAction<boolean>>;
    isLoged : boolean;
    setIsLoged : React.Dispatch<React.SetStateAction<boolean>>;
}


const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({children} : {children : ReactNode}) => {
    // defining functions and const that add theme to AppContextType interface;
    const [categorie, setCategorie] = useState<string>("All");
    const [isSignUp, setIsSignUp] = useState<boolean>(false);
    const [isLoged, setIsLoged] = useState<boolean> (true);

    return(
        <AppContext.Provider value={{categorie, setCategorie, 
                                    isSignUp, setIsSignUp, 
                                    isLoged, setIsLoged}} >
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