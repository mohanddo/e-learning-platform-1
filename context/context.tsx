"use client"

import React, { createContext, ReactNode, useContext, useState } from "react";
import type { Student } from "@/components/types" 
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useEffect } from "react";
import Cookie from "js-cookie";


interface AppContextType {
    categorie : string;
    setCategorie : React.Dispatch<React.SetStateAction<string>>;
    isSignUp : boolean;
    setIsSignUp : React.Dispatch<React.SetStateAction<boolean>>;

    user: Student | null;
    setUser: (user: Student) => void;
    isLogged: boolean | undefined;
    logout: () => void;

    emailToVerify: string | null;
    setEmailToVerify: (emailToVerify: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);
const queryClient = new QueryClient()
export const AppProvider = ({children} : {children : ReactNode}) => {
    const [categorie, setCategorie] = useState<string>("All");
    const [isSignUp, setIsSignUp] = useState<boolean>(false);
    const [emailToVerify, setEmailToVerify] = useState<string | null>(null);
    const [user, setUser] = useState<Student | null>(null);
    const [isLogged, setIsLogged] = useState<boolean | undefined>(undefined);
    
    const logout = () => {
        setUser(null);
        setIsLogged(false);
    };

    useEffect(() => {
        const token = Cookie.get("isLogged");
        if(!token) {
            setIsLogged(false);
        } else {
            setIsLogged(true);
        }
    }, [user]);

    return(
            <QueryClientProvider client={queryClient}>
              <AppContext.Provider
                value={{
                  categorie,
                  setCategorie,
                  isSignUp,
                  setIsSignUp,
                  user,
                  setUser,
                  logout,
                  emailToVerify,
                  setEmailToVerify,
                  isLogged
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