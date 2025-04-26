"use client"

import React, { createContext, ReactNode, useContext, useState } from "react";
import type { Student } from "@/components/types" 
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { authApi } from '@/api/auth.api';


interface AppContextType {
    categorie : string;
    setCategorie : React.Dispatch<React.SetStateAction<string>>;
    isSignUp : boolean;
    setIsSignUp : React.Dispatch<React.SetStateAction<boolean>>;

    user: Student | null;
    setUser: (user: Student) => void;
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
    const [status, setStatus] = useState<"error" | "success" | "pending">("pending");
    const [errorGettingStudent, setErrorGettingStudent] = useState<Error | null>(null);

    
    const logout = () => {
        setUser(null);
    };

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
                  setEmailToVerify
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