"use client";
import PurchasedCourse from "@/components/purchasedCourse/PurchasedCourse";
import { useParams } from "next/navigation";

export default function CoursePage() {
  const { id } = useParams<{ id: string }>();

  return <PurchasedCourse id={Number(id)} role="student" />;
}
