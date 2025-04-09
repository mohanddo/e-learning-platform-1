"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "../ui/button";

const PersonalData = () => {
    const userData = [
        { label: 'UID', value: '928-203-1', id: 'uid' },
        { label: 'Nickname', value: '@martincooper', id: 'nickname' },
        { label: 'Phone number', value: '+7 (999) 493-23-94', id: 'phone' },
        { label: 'Email', value: 'martin.cooper@gmail.com', id: 'email' },
        { label: 'Name', value: 'Martin', id: 'name' },
        { label: 'Surname', value: 'Cooper', id: 'surname' },
        { label: 'Middle name', value: '-', id: 'middleName' },
        { label: 'Date of Birth', value: 'December 26, 1928', id: 'dob' }
    ];


    return (
        <div className="w-full">
            <p className="text-xl font-semibold mb-10">Personel Informations</p>
            <div className="flex flex-row gap-5">
                <Avatar className="w-25 h-25 mr-2">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="w-full">
                    <p className="text-lg font-bold mb-2">FirstName LastName</p>
                    <Button className="btn-secondary text-lg">Edit Profile</Button>
                </div>
            </div>
            <div className="w-full px-20 py-10">
                <div className="grid grid-cols-2 gap-4 gap-x-10 justify-items-start items-start">
                    {
                        userData.map((item) => (
                            <div key={item.id} className="flex flex-col w-full">
                                <p className="font-bold mb-3">{item.label}:</p>
                                <span className="w-full bg-gray-100 px-2 py-3 rounded-lg text-sm">{item.value}</span>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default PersonalData;