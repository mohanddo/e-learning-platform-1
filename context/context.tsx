"use client"

import React, { createContext, ReactNode, useContext, useState, useEffect } from "react";
import type { Student } from "@/components/types" 
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";


interface AppContextType {
    categorie : string;
    setCategorie : React.Dispatch<React.SetStateAction<string>>;
    isSignUp : boolean;
    setIsSignUp : React.Dispatch<React.SetStateAction<boolean>>;


    isLoged : boolean;
    user: Student | null;
    login: (user: Student) => void;
    logout: () => void;
}


const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({children} : {children : ReactNode}) => {
    const queryClient = new QueryClient()
    // defining functions and const that add theme to AppContextType interface;
    const [categorie, setCategorie] = useState<string>("All");
    const [isSignUp, setIsSignUp] = useState<boolean>(false);
    const [isLoged, setIsLoged] = useState<boolean> (true);

    const [user, setUser] = useState<Student | null>(null);

    useEffect(() => {
        const savedUser = localStorage.getItem("user");
        if (savedUser) {
          const parsedUser = JSON.parse(savedUser);
          setUser(parsedUser);
        }
      }, []);

    // Auth methods
    const login = (userData: Student) => {
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
        setIsLoged(true);
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        setIsLoged(false);
    };

    return(
            <QueryClientProvider client={queryClient}>
              <AppContext.Provider
                value={{
                  categorie,
                  setCategorie,
                  isSignUp,
                  setIsSignUp,
                  isLoged,
                  user,
                  login,
                  logout,
                }}
              >
                {children}
              </AppContext.Provider>
              <ReactQueryDevtools />
            </QueryClientProvider>
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