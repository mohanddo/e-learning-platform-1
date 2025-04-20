"use client"

import Link from "next/link";
import { ShoppingCart,LogOut, User,ChevronUp } from "lucide-react";
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

const Header = () => {
    const { setIsSignUp, isLoged, isInitialized } = useAppContext();

    
    return (
        <header className="z-[999] w-[90%] h-17 fixed left-[5%] flex flex-row top-5 border border-gray-200 rounded-xl px-5 bg-[var(--color-100)] shadow-sm">
            <div className="flex-[1] flex items-center justify-start">
                {/* logo */}
                <img src="/logo-e-l.png" alt="Logo non disponible" className="h-12 w-12 object-contain hover:brightness-110 transition-all duration-300" />
            </div>

            <nav className="flex flex-row flex-2 items-center justify-center gap-8">
                <Link href="/" className="header-Links flex-[0.2] hover:text-[var(--color-500)] transition-colors duration-200">Accueil</Link>
                <Link href="/" className="header-Links flex-[0.2] hover:text-[var(--color-500)] transition-colors duration-200">Coures</Link>
                <Link href="/" className="header-Links flex-[0.2] hover:text-[var(--color-500)] transition-colors duration-200">Blog</Link>
                <Link href="/" className="header-Links flex-[0.2] hover:text-[var(--color-500)] transition-colors duration-200">contact</Link>
            </nav>

            <div className="flex-1 flex flex-row items-center justify-end gap-10">
                {!isInitialized ? (
                    <div className="flex items-center justify-start">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--addi-color-400)]"></div>
                    </div>
                ) : !isLoged ? (
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
                ) : (
                    <div className="flex flex-row gap-5 items-center ">
                        <div>
                            <button>
                                <ShoppingCart />
                            </button>
                        </div>
                        <DropdownMenu>
                            <DropdownMenuTrigger className="flex flex-row hover:bg-[var(--color-300)] gap-3 items-center cursor-alias p-2 rounded-lg">
                                <p className="font-medium">user Name</p>
                                <Avatar className="w-10 h-10">
                                    <AvatarImage src="https://github.com/shadcn.png" />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="mt-5 w-56" sideOffset={5} align="end">
                                <DropdownMenuLabel className="font-bold">My Account</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                
                                <DropdownMenuItem className="hover:bg-gray-100 cursor-pointer">
                                    <Link href={"/profile"} className="flex flex-row gap-2 w-full items-center">
                                        <User className="w-4 h-4" />
                                        <span>Profile</span>
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem className="hover:bg-gray-100 cursor-pointer flex flex-row gap-2 items-center">
                                    <LogOut className="w-4 h-4" />
                                    <span>Sign out</span>
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