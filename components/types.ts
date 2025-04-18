
export interface Course {
    id: number;
    title: string;
    category: string;
    teacher: string;
    pictureUrl: string;
    description: string;
    students: number;
    price: number;
    discount: boolean;
    rating: number; 
    type: "live" | "prerecorded";
}


export interface User {
    firstName: string;
    lastName: string;
    email: string;
    profilePicDownloadUrl: string | null
}

export type Student = User 

export interface Teacher extends User {
    numberOfStudents: number;
    numberOfCourses: number;
    facebookLink: string | null,
    youtubeLink: string | null,
    instagramLink: string | null,
    description: string | null,
    sasToken: string;
    baseUrl: string;
}

export interface  LoginCredentials {
    email: string;
    password: string;
}

export interface RegisterCredentials {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}
