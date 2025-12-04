"use client";

import { useState } from "react";
import { useFetchProducts } from "@/lib/hooks/useFetchProducts";
import { useFetchCategories } from "@/lib/hooks/useFetchCategories";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ProductCard } from "../payment/components/ProductCard";
import { PageLoader } from "@/components/page-loader";

import { ChevronLeft, ChevronRight, UserRound } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Separator } from "@/components/ui/separator";
import { ButtonGroup } from "@/components/ui/button-group";
import { useFetchUser } from "@/lib/hooks/useFetchUser";

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const { products, loading } = useFetchProducts();
  const { categories, loading: catLoading } = useFetchCategories();
  const {
    user: { fname },
    loading: userLoading,
  } = useFetchUser();

  if (loading || catLoading) {
    return <PageLoader text="Loading our products..." />;
  }

  return (
    <div className="flex p-4 lg:p-10 w-full items-center justify-center">
      <div className="flex flex-col max-w-7xl w-full gap-6">
        <div className="">
          <h1 className="text-3xl font-bold md:text-4xl">
            Hey, {fname ? fname : "Stranger"}
          </h1>
        </div>
        <ButtonGroup className="w-full grid grid-cols-5">
          {categories.map((item, index) => {
            return (
              <Button
                variant="outline"
                key={item.id}
                onClick={() => {
                  setSelectedCategory(item.id);
                }}
              >
                {item.name}
              </Button>
            );
          })}
        </ButtonGroup>
        <Separator />
        <div className="grid grid-cols-5 gap-4">
          {products
            .filter((p) => p.category_id === selectedCategory)
            .map((item) => {
              return (
                <div key={item.id} className="w-full border rounded-xl p-4">
                  <p className="leading-relaxed whitespace-pre-line">
                    {item.description}
                  </p>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Products;
