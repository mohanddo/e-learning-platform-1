"use client"

import Link from "next/link";
import { ShoppingCart,LogOut, User as UserIcon } from "lucide-react";
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAppContext } from "../../context/context";
import { useMutation } from "@tanstack/react-query";
import { authApi } from "@/api/auth.api";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

const Header = () => {
    const { setIsSignUp, logout, isLogged, user } = useAppContext();
    const router = useRouter();
    const isMounted = useRef(false);      

    const logoutMutation = useMutation({
        mutationFn: authApi.logout,
        onSuccess: () => {
            logout();
            if(isMounted.current) {
                router.push('/auth');
            }
        },
        onError: (error) => {
            console.log(error);
            if(isMounted.current) {
                alert("Error logging out");
            }
        }
    });

    useEffect(() => {

        isMounted.current = true;
        return () => {
            isMounted.current = false;
        }
    }, []);
    
    return (
        <header className="z-[999] w-[90%] h-17 fixed left-[5%] flex flex-row top-5 border border-gray-200 rounded-xl px-5 bg-[var(--color-100)] shadow-sm">
            <div className="flex-[1] flex items-center justify-start">
                <img src="/logo-e-l.png" alt="Logo non disponible" className="h-12 w-12 object-contain hover:brightness-110 transition-all duration-300" />
            </div>

            <nav className="flex flex-row flex-2 items-center justify-center gap-8">
                <Link href="/" className="header-Links flex-[0.2] hover:text-[var(--color-500)] transition-colors duration-200">Accueil</Link>
                <Link href="/" className="header-Links flex-[0.2] hover:text-[var(--color-500)] transition-colors duration-200">Courses</Link>
                <Link href="/" className="header-Links flex-[0.2] hover:text-[var(--color-500)] transition-colors duration-200">Contact</Link>
            </nav>

            <div className="flex-1 flex flex-row items-center justify-end gap-10">
                {isLogged == undefined ? null : !isLogged ? (
                    <>
                        <Link href="/auth"
                            className="header-Links" onClick={() => setIsSignUp(false)}>
                            Sign in
                        </Link>
                        <Link href="/auth" onClick={() => setIsSignUp(true)}>
                            <InteractiveHoverButton className="rounded-lg px-4 py-2 text-center border-1 border-solid border-gray-300 bg-white text-black">
                                Sign up
                            </InteractiveHoverButton>
                        </Link>
                    </>
                ) : ( user &&
                    <div className="flex flex-row gap-5 items-center ">
                        <div>
                            <button onClick={() => { router.replace("/cart") }}>
                                <ShoppingCart />
                            </button>
                        </div>
                        <DropdownMenu>
                            <DropdownMenuTrigger className="flex flex-row hover:bg-[var(--color-300)] gap-3 items-center cursor-alias p-2 rounded-lg">
                                <p className="font-medium">
                                    {user.firstName} {user.lastName}
                                    </p>
                                <Avatar className="w-10 h-10">
                                    <AvatarImage src="https://github.com/shadcn.png" />
                                    <AvatarFallback>
                                        {user.firstName[0]}{user.lastName[0]}
                                        </AvatarFallback>
                                </Avatar>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="mt-5 w-56" sideOffset={5} align="end">
                                <DropdownMenuLabel className="font-bold">My Account</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                
                                <DropdownMenuItem className="hover:bg-gray-100 cursor-pointer">
                                    <Link href={"/profile"} className="flex flex-row gap-2 w-full items-center">
                                        <UserIcon className="w-4 h-4" />
                                        <span>Profile</span>
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem 
                                    className="hover:bg-gray-100 cursor-pointer flex flex-row gap-2 items-center"
                                    onClick={() => logoutMutation.mutate()}
                                    disabled={logoutMutation.isPending}
                                >
                                    <LogOut className="w-4 h-4" />
                                    <span>{logoutMutation.isPending ? 'Signing out...' : 'Sign out'}</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                )} 
            </div>
        </header>
    )
}

export default Header;