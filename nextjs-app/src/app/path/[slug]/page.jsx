"use client";
import MainContent from "@/components/PathPageMainContents";
import ReviewModal from "@/components/ReviewModal";
import { useGetBikePathsQuery } from "@/services/bikePaths";
import { useParams } from "next/navigation";

export default function PathPage() {
  const { slug } = useParams();

  const {
    data: onePath,
    error: onePathsError,
    isLoading: onePathsisLoading,
    isError: onePathsisError,
  } = useGetBikePathsQuery(decodeURIComponent(slug));

  return (
    <div>
      <MainContent path={onePath} loading={onePathsisLoading} />
    </div>
  );
}
