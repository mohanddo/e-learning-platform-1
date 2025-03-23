
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