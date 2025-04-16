"use client"

import React, { createContext, ReactNode, useContext, useState } from "react";
import type { Student } from "@/components/types" 


interface AppContextType {
    categorie : string;
    setCategorie : React.Dispatch<React.SetStateAction<string>>;
    isSignUp : boolean;
    setIsSignUp : React.Dispatch<React.SetStateAction<boolean>>;


    isLoged : boolean;
    setIsLoged : React.Dispatch<React.SetStateAction<boolean>>;
    token: string | null;
    user: Student | null;
    login: (token: string, user: Student) => void;
    logout: () => void;
}


const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({children} : {children : ReactNode}) => {
    // defining functions and const that add theme to AppContextType interface;
    const [categorie, setCategorie] = useState<string>("All");
    const [isSignUp, setIsSignUp] = useState<boolean>(false);
    const [isLoged, setIsLoged] = useState<boolean> (true);

    const [token, setToken] = useState<string | null>(() => localStorage.getItem('token'));
    const [user, setUser] = useState<Student | null>(() => {
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    // Auth methods
    const login = (newToken: string, userData: Student) => {
        localStorage.setItem('token', newToken);
        localStorage.setItem('user', JSON.stringify(userData));
        setToken(newToken);
        setUser(userData);
        setIsLoged(true);
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setToken(null);
        setUser(null);
        setIsLoged(false);
    };

    return(
        <AppContext.Provider value={{categorie, setCategorie, 
                                    isSignUp, setIsSignUp, 
                                    isLoged, setIsLoged,
                                    token, user, login, logout}} >
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