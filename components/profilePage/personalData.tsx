"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "../ui/button";
import { useAppContext } from "@/context/context";
import { useRouter } from "next/navigation";

const PersonalData = () => {
    
    const { user } = useAppContext();
    const router = useRouter();

    const handleChangePassword = () => {
        router.push('/changePassword');
    };

    return (
        <div className="w-full">
            <p className="text-xl font-semibold mb-10">Personal Information</p>
            <div className="flex flex-row gap-5">
                <Avatar className="w-25 h-25 mr-2">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>{user!.firstName[0]}{user!.lastName[0]}</AvatarFallback>
                </Avatar>
                <div className="w-full">
                    <p className="text-lg font-bold mb-2">{user!.firstName[0]}{user!.lastName[0]}</p>
                    <div className="flex gap-2">
                        <Button className="btn-secondary text-lg">Edit Profile</Button>
                        <Button 
                            variant="outline" 
                            className="text-lg border-[var(--addi-color-500)] text-[var(--addi-color-500)] hover:bg-[var(--color-100)]"
                            onClick={handleChangePassword}
                        >
                            Change Password
                        </Button>
                    </div>
                </div>
            </div>
            <div className="w-full px-20 py-10">
                <div className="grid grid-cols-2 gap-4 gap-x-10 justify-items-start items-start">
                    
                        
                            <div className="flex flex-col w-full">
                                <p className="font-bold mb-3">First Name</p>
                                <span className="w-full bg-gray-100 px-2 py-3 rounded-lg text-sm">{user!.firstName}</span>
                            </div>

                            <div className="flex flex-col w-full">
                                <p className="font-bold mb-3">Last Name</p>
                                <span className="w-full bg-gray-100 px-2 py-3 rounded-lg text-sm">{user!.lastName}</span>
                            </div>

                            <div className="flex flex-col w-full col-span-2">
                                <p className="font-bold mb-3">Email</p>
                                <span className="w-full bg-gray-100 px-2 py-3 rounded-lg text-sm">{user!.email}</span>
                            </div>
                        
                    
                </div>
            </div>
        </div>
    )
}

export default PersonalData;