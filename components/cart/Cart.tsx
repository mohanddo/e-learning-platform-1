"use client";

import { useAppContext } from "@/context/context";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useMutation, useQuery } from "@tanstack/react-query";
import { authApi } from "@/api/auth/studentAuth.api";
import CartLoading from "./CartLoading";
import CartError from "./CartError";
import { cartApi } from "@/api/cart.api";
import { useEffect, useRef } from "react";
import CartItem from "./CartItem";

const Cart = () => {
  const { student, setStudent } = useAppContext();
  const router = useRouter();

  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, []);

  const { status, refetch } = useQuery({
    queryKey: ["student"],
    queryFn: async () => {
      const data = await authApi.me();
      setStudent(data);
      return data;
    },
  });

  const purchaseCourseMutation = useMutation({
    mutationFn: async () => {
      const data = await cartApi.purchaseCart();
      return data;
    },
    onSuccess: (data) => {
      if (isMounted.current) {
        router.replace(data);
      }
    },
    onError: () => {
      if (isMounted.current) {
        alert("Error purchasing cart");
      }
    },
  });

  if (status === "pending" && !student) {
    return <CartLoading />;
  }

  if (status === "error" && !student) {
    return <CartError refetch={refetch} />;
  }

  return (
    <div className="w-full max-w-6xl mx-auto mt-30 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-12">Cart</h1>

      {student!.courses.filter((crs) => crs.inCart).length === 0 ? (
        <div className="w-full text-center py-16 bg-gray-50 rounded-lg">
          <p className="text-gray-600 text-lg font-medium">
            Your cart is empty
          </p>
          <p className="text-gray-500 mt-2">
            Add some courses to your cart to see them here!
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {student!.courses
            .filter((crs) => crs.inCart)
            .map((item) => {
              return (
                <CartItem
                  key={item.id}
                  item={item}
                  canRemove={purchaseCourseMutation.isPending}
                />
              );
            })}

          <div className="flex flex-row justify-between items-end gap-6 mt-6 mb-10 p-6 border-t border-gray-200 bg-[var(--addi-color-500)]/10 rounded-lg">
            <div className="flex items-center gap-6">
              <p className="text-xl text-gray-700">Total:</p>
              <p className="text-3xl font-bold text-gray-900">
                {student!.courses
                  .filter((crs) => crs.inCart)
                  .reduce((total, item) => total + item.price, 0)
                  .toFixed(2)}{" "}
                DA
              </p>
            </div>
            <Button
              className={`bg-[var(--addi-color-500)] text-white hover:bg-[var(--addi-color-400)] px-8 py-2 text-lg transition-all duration-200 
                            ${
                              purchaseCourseMutation.isPending
                                ? "opacity-50 cursor-not-allowed"
                                : ""
                            }`}
              onClick={() => purchaseCourseMutation.mutate()}
              disabled={purchaseCourseMutation.isPending}
            >
              {purchaseCourseMutation.isPending
                ? "Purchasing..."
                : "Proceed to Checkout"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
