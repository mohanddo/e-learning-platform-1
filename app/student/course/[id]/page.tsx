"use client";
import PurchasedCourse from "@/components/purchasedCourse/PurchasedCourse";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useAppContext } from "@/context/context";

export default function CoursePage() {
  const { id } = useParams<{ id: string }>();
  const { setShowHeader } = useAppContext();
  useEffect(() => {
    setShowHeader(false);
    return () => setShowHeader(true);
  }, []);

  return <PurchasedCourse id={Number(id)} />;
}
