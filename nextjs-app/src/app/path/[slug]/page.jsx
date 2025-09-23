"use client";
import MainContent from "@/components/PathPageMainContents";
import ReviewModal from "@/components/ReviewModal";
import { useParams } from "next/navigation";

export default function PathPage({ name }) {
  const { slug } = useParams();
  console.log(slug);
  return (
    <div>
      <MainContent />
    </div>
  );
}
