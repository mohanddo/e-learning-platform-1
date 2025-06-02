import { useRouter } from "next/navigation";
import { Course } from "../types/types";
import { Button } from "../ui/button";
import Image from "next/image";
import { cartApi } from "@/api/cart.api";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { useAppContext } from "@/context/context";
import { useRemoveFromCartMutation } from "@/hooks/useRemoveFromCartMutation";

export default function CartItem({
  item,
  canRemove,
}: {
  item: Course;
  canRemove: boolean;
}) {
  const { student, setStudent } = useAppContext();

  const removeCourseFromCartMutation = useRemoveFromCartMutation({
    courseId: item.id,
    onSuccess: () => {
      setStudent({
        ...student!,
        courses: student!.courses.map((c) =>
          c.id === item.id ? { ...c, inCart: false } : c
        ),
      });
    },
  });

  const isMounted = useRef(false);

  const handleRemoveCourseFromCart = () => {
    if (student) {
      removeCourseFromCartMutation.mutate();
    }
  };

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  const router = useRouter();
  const goToPage = (id: number) => {
    router.replace(`/courseDetails/${id}`);
  };

  return (
    <div
      key={item.id}
      className="flex flex-row items-center p-6 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200"
      onClick={() => goToPage(item.id)}
    >
      <Image
        src={item.imageUrl || ""}
        alt={item.title}
        width={120}
        height={120}
        className="mr-6 rounded-lg object-cover"
      />

      <div className="flex-1">
        <p className="font-semibold text-lg mb-2 truncate" title={item.title}>
          {item.title}
        </p>
        <p className="text-gray-600">
          {item.teacher.firstName} {item.teacher.lastName}
        </p>
        <p className="text-sm text-gray-500 mt-1">
          {item.pricingModel.toLocaleString() === "SUBSCRIPTION"
            ? "Subscription-based"
            : item.pricingModel.toLocaleString() === "ONE_TIME_PURCHASE"
            ? "One-time purchase"
            : "Free course"}
        </p>
      </div>

      <div className="flex items-center gap-6">
        <p className="text-xl font-semibold text-gray-800">${item.price}</p>
        <Button
          variant="outline"
          className={`text-red-500 border-red-500 hover:bg-red-50 transition-colors duration-200 
                                    ${
                                      canRemove ||
                                      removeCourseFromCartMutation.isPending
                                        ? "opacity-50 cursor-not-allowed"
                                        : ""
                                    }`}
          disabled={canRemove || removeCourseFromCartMutation.isPending}
          onClick={(e) => {
            e.stopPropagation();
            handleRemoveCourseFromCart();
          }}
        >
          {removeCourseFromCartMutation.isPending ? "Removing..." : "Remove"}
        </Button>
      </div>
    </div>
  );
}
