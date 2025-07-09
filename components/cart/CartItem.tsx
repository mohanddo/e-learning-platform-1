import { useRouter } from "next/navigation";
import { Course } from "../../types/types";
import { Button } from "../ui/button";
import Image from "next/image";
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
      className="flex flex-row items-center p-6 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200 cursor-pointer"
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
        {/* Discount Info */}
        {item.discountPercentage && item.discountPercentage > 0 && (
          <div className="flex items-center gap-2 mt-2">
            <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded-full">
              -{item.discountPercentage}% OFF
            </span>
            {item.discountExpirationDate && (
              <span className="text-xs text-gray-500 ml-2">
                Expires on{" "}
                {new Date(item.discountExpirationDate).toLocaleDateString()}
              </span>
            )}
          </div>
        )}
      </div>

      <div className="flex items-center gap-6">
        {/* Price display with discount */}
        {item.discountPercentage && item.discountPercentage > 0 ? (
          <div className="flex flex-col items-end">
            <span className="text-green-600 text-xl font-bold">
              {(
                item.price -
                (item.price * item.discountPercentage) / 100
              ).toFixed(0)}{" "}
              DA
            </span>
            <span className="text-gray-400 text-sm font-semibold line-through">
              {item.price} DA
            </span>
          </div>
        ) : (
          <p className="text-xl font-semibold text-gray-800">{item.price} DA</p>
        )}
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
