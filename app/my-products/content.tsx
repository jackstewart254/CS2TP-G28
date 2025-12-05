"use client";

import { PageLoader } from "@/components/page-loader";
import { useFetchCategories } from "@/lib/hooks/useFetchCategories";
import { useFetchProducts } from "@/lib/hooks/useFetchProducts";
import { cn } from "@/lib/utils";

const MyProducts = () => {
  const { products, loading } = useFetchProducts();
  const { categories, loading: catLoading } = useFetchCategories();

  if (loading || catLoading) {
    return <PageLoader text="Loading your products..." />;
  }
  return (
    <div
      className={cn(
        "flex w-full flex-1 items-center justify-center no-scrollbar",
        "h-[calc(100vh-53px)]"
      )}
    >
      <div className="w-full h-full max-w-7xl flex flex-col p-4 lg:p-10 overflow-auto no-scrollbar items-center justify-center">
        <h1 className="font-bold text-3xl">My products</h1>
      </div>
    </div>
  );
};

export default MyProducts;
