import { useRouter } from "next/navigation";
import { CoursePreview } from "../types";
import { Button } from "../ui/button";
import Image from "next/image";
import { cartApi } from "@/api/cart.api";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { useAppContext } from "@/context/context";

export default function CartItem({ item, canRemove }: { item: CoursePreview, canRemove: boolean }) {

    const { user, setUser } = useAppContext();

    const addOrRemoveCourseFromCart = useMutation({
        mutationFn: async () => {
            const data = await cartApi.addOrRemoveCourseFromCart(item.id);
            return data;
        },
    });

    const isMounted = useRef(false);

    const handleRemoveCourseFromCart = () => {
        if(user) {
            setUser({...user, courses: user.courses.filter((course) => course.id !== item.id)});
            addOrRemoveCourseFromCart.mutate();
        }
    }

    useEffect(() => {
        isMounted.current = true;
        return () => { isMounted.current = false; } 
    }, []);

    const router = useRouter();
    const goToPage = (id : number) => {
        router.replace(`/courseDetails/${id}`)
    }
                            

                            
                        return (
                        <div key={item.id} className="flex flex-row items-center p-6 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200" onClick={() => goToPage(item.id)}>
                            <Image 
                                src={item.imageUrl || ''} 
                                alt={item.title} 
                                width={120} 
                                height={120}                         
                                className="mr-6 rounded-lg object-cover" 
                            />
    
                            <div className="flex-1">
                                <p className="font-semibold text-lg mb-2 truncate" title={item.title}>{item.title}</p>
                                <p className="text-gray-600">{item.teacher.firstName} {item.teacher.lastName}</p>
                                <p className="text-sm text-gray-500 mt-1">
                                    {item.pricingModel.toLocaleString() === 'SUBSCRIPTION' ? 'Subscription-based' :
                            item.pricingModel.toLocaleString() === 'ONE_TIME_PURCHASE' ? 'One-time purchase' :
                            'Free course'}
                                </p>
                            </div>

                            <div className="flex items-center gap-6">
                                <p className="text-xl font-semibold text-gray-800">${item.price}</p>
                                <Button 
                                    variant="outline" 
                                    className={`text-red-500 border-red-500 hover:bg-red-50 transition-colors duration-200 
                                    ${
                                        canRemove || addOrRemoveCourseFromCart.isPending ? 'opacity-50 cursor-not-allowed' : ''
                                    }`}
                                    disabled={canRemove || addOrRemoveCourseFromCart.isPending}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleRemoveCourseFromCart();
                                    }}
                                >
                                    {addOrRemoveCourseFromCart.isPending ? 'Removing...' : 'Remove'}
                                </Button>
                            </div>
                        </div>
                        );
}