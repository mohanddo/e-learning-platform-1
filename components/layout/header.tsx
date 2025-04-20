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

    const { setIsSignUp, isLoged } = useAppContext();


    return (
        <header className="z-[999] w-[90%] h-17 fixed left-[5%] flex flex-row top-5 border-1 border-solid border-gray-300 rounded-xl px-5 bg-[var(--color-100)]">
            <div className="flex-[1] flex items-center justify-start">
                {/* logo */}
                <img src="/logo-e-l.png" alt="Logo non disponible" className="h-17 w-17 object-contain hover:brightness-110 transition-all duration-300" />
            </div>

            <nav className="flex flex-row flex-2 items-center justify-center gap-24">
                <Link href="/" className="header-Links flex-[0.2]">Accueil</Link>
                <Link href="/" className="header-Links flex-[0.2]">Coures</Link>
                <Link href="/" className="header-Links flex-[0.2]">Blog</Link>
                <Link href="/" className="header-Links flex-[0.2]">contact</Link>
            </nav>

            <div className="flex-1 flex flex-row items-center justify-end gap-10">
                {!isLoged ? (
                    <>
                        <Link href="/Auth"
                            className="header-Links" onClick={() => setIsSignUp(false)}>
                            Sign in
                        </Link>
                        <Link href="/Auth" onClick={() => setIsSignUp(true)}>
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
                                <DropdownMenuTrigger className="flex flex-row hover:bg-[var(--color-300)] gap-1.5 items-center cursor-alias p-1 rounded-lg px-2">
                                    <p>user Name</p>
                                    <Avatar className="w-10 h-10">
                                        <AvatarImage src="https://github.com/shadcn.png" />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="mt-5 w-25">
                                    <DropdownMenuLabel className="font-bold">My Account</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    
                                    <DropdownMenuItem className="hover:bg-gray-200"> <Link href={"/Profile"} className="flex flex-row gap-2 w-full"> <User /> Profile</Link></DropdownMenuItem>
                                    <DropdownMenuItem className="hover:bg-gray-200"> <LogOut /> Signe out</DropdownMenuItem>
                                    <DropdownMenuItem className="hover:text-red-500"> <ChevronUp /></DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                    </div>

                )}
            </div>
        </header>
    )
}

export default Header;